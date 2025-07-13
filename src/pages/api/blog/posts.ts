import { NextApiRequest, NextApiResponse } from 'next';
import { getOptimizedBlogPosts } from '../../../lib/blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const {
      locale = 'en',
      offset = '0',
      limit = '6',
      category,
    } = req.query;

    const offsetNum = parseInt(offset as string, 10);
    const limitNum = parseInt(limit as string, 10);

    // 获取所有文章
    const allPosts = await getOptimizedBlogPosts(locale as string);

    // 按分类过滤
    const filteredPosts =
      category && category !== 'all'
        ? allPosts.filter((post) => post.category === category)
        : allPosts;

    // 分页
    const paginatedPosts = filteredPosts
      .slice(offsetNum, offsetNum + limitNum)
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt:
          post.excerpt && post.excerpt.length > 150
            ? `${post.excerpt.substring(0, 150)}...`
            : post.excerpt,
        author: {
          name: post.author?.name,
          avatar: post.author?.avatar,
        },
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        category: post.category,
        featuredImage: post.featuredImage,
      }));

    res.status(200).json({
      posts: paginatedPosts,
      hasMore: offsetNum + limitNum < filteredPosts.length,
      total: filteredPosts.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}