import { useEffect } from 'react';

// Task scheduler to break up long tasks
class TaskScheduler {
  private tasks: (() => void)[] = [];
  private isRunning = false;
  private readonly maxTaskTime = 5; // 5ms max per task

  // Add a task to the queue
  addTask(task: () => void) {
    this.tasks.push(task);
    if (!this.isRunning) {
      this.runTasks();
    }
  }

  // Run tasks with time slicing
  private async runTasks() {
    this.isRunning = true;
    
    while (this.tasks.length > 0) {
      const startTime = performance.now();
      
      // Run tasks until we hit the time limit
      while (this.tasks.length > 0 && (performance.now() - startTime) < this.maxTaskTime) {
        const task = this.tasks.shift();
        if (task) {
          try {
            task();
          } catch (error) {
            console.error('Task execution error:', error);
          }
        }
      }
      
      // Yield control back to the browser
      if (this.tasks.length > 0) {
        await this.yieldToMain();
      }
    }
    
    this.isRunning = false;
  }

  // Yield control to the main thread
  private yieldToMain(): Promise<void> {
    return new Promise(resolve => {
      // Use scheduler.postTask if available, otherwise fallback to setTimeout
      if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
        (window as any).scheduler.postTask(resolve, { priority: 'user-blocking' });
      } else {
        setTimeout(resolve, 0);
      }
    });
  }

  // Break up a large task into smaller chunks
  breakUpTask<T>(items: T[], processor: (item: T) => void, chunkSize = 10) {
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      this.addTask(() => {
        chunk.forEach(processor);
      });
    }
  }
}

// Global task scheduler instance
const taskScheduler = new TaskScheduler();

export default function TaskSchedulerComponent() {
  useEffect(() => {
    // Optimize existing long tasks
    const optimizeLongTasks = () => {
      // Override setTimeout to use task scheduling for long delays
      const originalSetTimeout = window.setTimeout;
      const customSetTimeout = (callback: TimerHandler, delay?: number, ...args: any[]): number => {
        if (delay && delay > 100) {
          // For long delays, use task scheduler
          return originalSetTimeout(() => {
            if (typeof callback === 'function') {
              taskScheduler.addTask(callback as () => void);
            }
          }, delay);
        }
        return originalSetTimeout(callback, delay, ...args);
      };

      (window as any).setTimeout = customSetTimeout;

      // Override requestAnimationFrame to prevent long frame tasks
      const originalRAF = window.requestAnimationFrame;
      const customRAF = (callback: FrameRequestCallback): number => {
        return originalRAF((timestamp) => {
          const startTime = performance.now();
          callback(timestamp);
          const duration = performance.now() - startTime;

          if (duration > 16) { // Longer than one frame
            console.warn(`Long frame task detected: ${duration}ms`);
          }
        });
      };

      (window as any).requestAnimationFrame = customRAF;
    };

    optimizeLongTasks();

    // Monitor for long tasks
    const observeLongTasks = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.duration > 50) {
                console.warn(`Long task detected: ${entry.name} took ${entry.duration}ms`);
                
                // Report to analytics if available
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'long_task', {
                    event_category: 'Performance',
                    value: Math.round(entry.duration),
                    custom_parameter_1: entry.name,
                  });
                }
              }
            });
          });
          
          observer.observe({ entryTypes: ['longtask'] });
          
          return () => observer.disconnect();
        } catch (error) {
          console.warn('Long task observer not supported');
        }
      }
    };

    const cleanup = observeLongTasks();
    return cleanup;
  }, []);

  useEffect(() => {
    // Optimize DOM operations
    const optimizeDOMOperations = () => {
      // Batch DOM reads and writes
      let readTasks: (() => void)[] = [];
      let writeTasks: (() => void)[] = [];
      let isScheduled = false;

      const flushTasks = () => {
        // Batch all reads first
        readTasks.forEach(task => task());
        readTasks = [];
        
        // Then batch all writes
        writeTasks.forEach(task => task());
        writeTasks = [];
        
        isScheduled = false;
      };

      // Expose batching functions globally
      (window as any).batchDOMRead = (task: () => void) => {
        readTasks.push(task);
        if (!isScheduled) {
          isScheduled = true;
          requestAnimationFrame(flushTasks);
        }
      };

      (window as any).batchDOMWrite = (task: () => void) => {
        writeTasks.push(task);
        if (!isScheduled) {
          isScheduled = true;
          requestAnimationFrame(flushTasks);
        }
      };
    };

    optimizeDOMOperations();
  }, []);

  useEffect(() => {
    // Optimize image loading to prevent layout thrashing
    const optimizeImageLoading = () => {
      const images = document.querySelectorAll('img[data-optimize="true"]');
      
      // Process images in batches to avoid blocking
      const imageArray = Array.from(images);
      taskScheduler.breakUpTask(imageArray, (img: Element) => {
        const imageEl = img as HTMLImageElement;
        
        // Preload image to get dimensions
        const preloadImg = new Image();
        preloadImg.onload = () => {
          // Set dimensions to prevent layout shift
          if (!imageEl.width && !imageEl.height) {
            const aspectRatio = preloadImg.naturalHeight / preloadImg.naturalWidth;
            const containerWidth = imageEl.parentElement?.clientWidth || 300;
            
            imageEl.style.width = `${containerWidth}px`;
            imageEl.style.height = `${containerWidth * aspectRatio}px`;
          }
        };
        preloadImg.src = imageEl.src;
      }, 5); // Process 5 images at a time
    };

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImageLoading);
    } else {
      optimizeImageLoading();
    }
  }, []);

  return null;
}

// Export the task scheduler for use in other components
export { taskScheduler };
