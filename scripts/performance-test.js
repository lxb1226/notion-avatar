const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runPerformanceTest() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to simulate mobile device
  await page.setViewport({ width: 375, height: 667 });

  // Enable performance monitoring
  await page.setCacheEnabled(false);
  
  const results = {
    timestamp: new Date().toISOString(),
    metrics: {},
    lighthouse: {},
    resources: []
  };

  try {
    console.log('Starting performance test...');
    
    // Navigate to the page
    const response = await page.goto('http://localhost:3001', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('Page loaded, collecting metrics...');

    // Collect performance metrics
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const metrics = {};
        
        // Get navigation timing
        if (performance.timing) {
          const timing = performance.timing;
          metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
          metrics.loadComplete = timing.loadEventEnd - timing.navigationStart;
          metrics.ttfb = timing.responseStart - timing.navigationStart;
        }

        // Get paint metrics
        if (performance.getEntriesByType) {
          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            if (entry.name === 'first-paint') {
              metrics.fp = entry.startTime;
            }
          });
        }

        // Get LCP
        if (window.PerformanceObserver) {
          let lcpValue = 0;
          try {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              lcpValue = lastEntry.startTime;
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
            
            setTimeout(() => {
              metrics.lcp = lcpValue;
              resolve(metrics);
            }, 2000);
          } catch (e) {
            resolve(metrics);
          }
        } else {
          resolve(metrics);
        }
      });
    });

    results.metrics = performanceMetrics;

    // Get resource loading information
    const resourceMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: resource.initiatorType
      })).filter(resource => resource.duration > 0);
    });

    results.resources = resourceMetrics;

    // Calculate scores
    const scores = {
      fcp: performanceMetrics.fcp < 1800 ? 'GOOD' : performanceMetrics.fcp < 3000 ? 'NEEDS_IMPROVEMENT' : 'POOR',
      lcp: performanceMetrics.lcp < 2500 ? 'GOOD' : performanceMetrics.lcp < 4000 ? 'NEEDS_IMPROVEMENT' : 'POOR',
      ttfb: performanceMetrics.ttfb < 800 ? 'GOOD' : performanceMetrics.ttfb < 1800 ? 'NEEDS_IMPROVEMENT' : 'POOR'
    };

    results.scores = scores;

    // Log results
    console.log('\n=== Performance Test Results ===');
    console.log(`First Contentful Paint: ${performanceMetrics.fcp?.toFixed(2)}ms (${scores.fcp})`);
    console.log(`Largest Contentful Paint: ${performanceMetrics.lcp?.toFixed(2)}ms (${scores.lcp})`);
    console.log(`Time to First Byte: ${performanceMetrics.ttfb?.toFixed(2)}ms (${scores.ttfb})`);
    console.log(`DOM Content Loaded: ${performanceMetrics.domContentLoaded?.toFixed(2)}ms`);
    console.log(`Load Complete: ${performanceMetrics.loadComplete?.toFixed(2)}ms`);
    
    console.log('\n=== Resource Analysis ===');
    const slowResources = resourceMetrics.filter(r => r.duration > 1000);
    if (slowResources.length > 0) {
      console.log('Slow resources (>1s):');
      slowResources.forEach(resource => {
        console.log(`  ${resource.name}: ${resource.duration.toFixed(2)}ms`);
      });
    } else {
      console.log('No slow resources detected');
    }

    // Save results to file
    const resultsPath = path.join(__dirname, '../performance-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`\nResults saved to: ${resultsPath}`);

  } catch (error) {
    console.error('Performance test failed:', error);
    results.error = error.message;
  } finally {
    await browser.close();
  }

  return results;
}

// Run the test
if (require.main === module) {
  runPerformanceTest()
    .then(() => {
      console.log('\nPerformance test completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

module.exports = runPerformanceTest;
