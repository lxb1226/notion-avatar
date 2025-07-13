// 统一的日期格式化函数，避免 hydration 错误
export function formatDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString);

  if (locale === 'zh' || locale === 'zh-TW') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// 计算阅读时间的函数
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// 生成唯一ID的函数
export function generateId(slug: string, publishedAt: string): string {
  const timestamp = new Date(publishedAt).getTime();
  return `${slug}-${timestamp}`;
}
