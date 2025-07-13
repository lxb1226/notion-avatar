import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { glob } from 'glob';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: MDXRemoteSerializeResult;
  rawContent?: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  tags: string[];
  category: string;
  featuredImage: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  featured: boolean;
  published: boolean;
}

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  featuredImage: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  featured?: boolean;
  published?: boolean;
}

const CONTENT_PATH = path.join(process.cwd(), 'content/blog');

// 计算阅读时间（基于平均阅读速度 200 词/分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// 生成唯一ID（基于文件名和时间戳）
function generateId(slug: string, publishedAt: string): string {
  const timestamp = new Date(publishedAt).getTime();
  return `${slug}-${timestamp}`;
}

// 获取指定语言的所有博客文章文件路径
async function getBlogFilePaths(locale: string = 'en'): Promise<string[]> {
  const contentDir = path.join(CONTENT_PATH, locale);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  try {
    const pattern = path.join(contentDir, '**/*.{md,mdx}');
    const files = await glob(pattern);
    return files.sort((a, b) => b.localeCompare(a)); // 按文件名倒序排列
  } catch (error) {
    console.error(`Error reading blog files for locale ${locale}:`, error);
    return [];
  }
}

// 从文件路径生成 slug
function getSlugFromFilePath(filePath: string, locale: string): string {
  const contentDir = path.join(CONTENT_PATH, locale);
  const relativePath = path.relative(contentDir, filePath);
  const slug = relativePath.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/'); // 处理 Windows 路径
  return slug;
}

// 读取并解析 MDX 文件
async function readMDXFile(filePath: string): Promise<{
  frontmatter: BlogPostFrontmatter;
  content: string;
  slug: string;
  locale: string;
} | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // 从文件路径推断语言和 slug
    const pathParts = filePath.split(path.sep);
    const localeIndex = pathParts.findIndex((part) => part === 'blog') + 1;
    const locale = pathParts[localeIndex] || 'en';
    const slug = getSlugFromFilePath(filePath, locale);

    // 验证必需的前置元数据
    if (!data.title || !data.excerpt || !data.author || !data.publishedAt) {
      console.warn(`Missing required frontmatter in ${filePath}`);
      return null;
    }

    return {
      frontmatter: data as BlogPostFrontmatter,
      content,
      slug,
      locale,
    };
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
    return null;
  }
}

// 将 MDX 数据转换为 BlogPost 对象
async function mdxToBlogPost(
  mdxData: {
    frontmatter: BlogPostFrontmatter;
    content: string;
    slug: string;
    locale: string;
  },
  includeContent: boolean = false,
): Promise<BlogPost> {
  const { frontmatter, content, slug } = mdxData;

  const post: BlogPost = {
    id: generateId(slug, frontmatter.publishedAt),
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    rawContent: content,
    author: frontmatter.author,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt || frontmatter.publishedAt,
    readingTime: calculateReadingTime(content),
    tags: frontmatter.tags || [],
    category: frontmatter.category,
    featuredImage: frontmatter.featuredImage,
    seo: frontmatter.seo,
    featured: frontmatter.featured || false,
    published: frontmatter.published !== false, // 默认为已发布
  };

  // 如果需要包含内容，则序列化 MDX
  if (includeContent) {
    try {
      post.content = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      });
    } catch (error) {
      console.error(`Error serializing MDX for ${slug}:`, error);
      post.content = await serialize('Error loading content');
    }
  }

  return post;
}

// 获取所有博客文章（用于列表页面）- 优化版本，只返回必要字段
export async function getBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
  try {
    const filePaths = await getBlogFilePaths(locale);
    const posts: BlogPost[] = [];

    for (const filePath of filePaths) {
      const mdxData = await readMDXFile(filePath);
      if (mdxData && mdxData.frontmatter.published !== false) {
        const post = await mdxToBlogPost(mdxData, false); // 不包含内容以提高性能
        posts.push(post);
      }
    }

    // 按发布时间排序
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch (error) {
    console.error(`Error getting blog posts for locale ${locale}:`, error);
    return [];
  }
}

// 获取优化的博客文章列表（用于列表页面，减少数据量）
export async function getOptimizedBlogPosts(
  locale: string = 'en',
): Promise<Partial<BlogPost>[]> {
  try {
    const filePaths = await getBlogFilePaths(locale);
    const posts: Partial<BlogPost>[] = [];

    for (const filePath of filePaths) {
      const mdxData = await readMDXFile(filePath);
      if (mdxData && mdxData.frontmatter.published !== false) {
        const { frontmatter, content, slug } = mdxData;

        // 只返回列表页面需要的字段
        const optimizedPost: Partial<BlogPost> = {
          id: generateId(slug, frontmatter.publishedAt),
          slug,
          title: frontmatter.title,
          excerpt: frontmatter.excerpt,
          author: {
            name: frontmatter.author.name,
            avatar: frontmatter.author.avatar,
            bio: frontmatter.author.bio,
          },
          publishedAt: frontmatter.publishedAt,
          readingTime: calculateReadingTime(content),
          category: frontmatter.category,
          featuredImage: frontmatter.featuredImage,
          featured: frontmatter.featured || false,
        };

        posts.push(optimizedPost);
      }
    }

    // 按发布时间排序
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime(),
    );
  } catch (error) {
    console.error(
      `Error getting optimized blog posts for locale ${locale}:`,
      error,
    );
    return [];
  }
}

// 获取精选文章
export async function getFeaturedPosts(
  locale: string = 'en',
): Promise<BlogPost[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.featured);
}

// 获取单篇博客文章（包含内容）
export async function getBlogPost(
  slug: string,
  locale: string = 'en',
): Promise<BlogPost | null> {
  try {
    const filePaths = await getBlogFilePaths(locale);

    for (const filePath of filePaths) {
      const fileSlug = getSlugFromFilePath(filePath, locale);
      if (fileSlug === slug) {
        const mdxData = await readMDXFile(filePath);
        if (mdxData && mdxData.frontmatter.published !== false) {
          return await mdxToBlogPost(mdxData, true); // 包含内容
        }
      }
    }

    return null;
  } catch (error) {
    console.error(
      `Error getting blog post ${slug} for locale ${locale}:`,
      error,
    );
    return null;
  }
}

// 获取相关文章
export async function getRelatedPosts(
  currentPost: BlogPost,
  locale: string = 'en',
): Promise<BlogPost[]> {
  const posts = await getBlogPosts(locale);
  return posts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag))),
    )
    .slice(0, 2);
}

// 获取博客分类
export async function getBlogCategories(
  locale: string = 'en',
): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  return [...new Set(posts.map((post) => post.category))];
}

// 获取所有可用的 slug（用于静态生成）
export async function getAllBlogSlugs(): Promise<
  Array<{ params: { slug: string }; locale: string }>
> {
  const slugs: Array<{ params: { slug: string }; locale: string }> = [];

  // 支持的语言
  const locales = ['en', 'zh'];

  for (const locale of locales) {
    const filePaths = await getBlogFilePaths(locale);

    for (const filePath of filePaths) {
      const mdxData = await readMDXFile(filePath);
      if (mdxData && mdxData.frontmatter.published !== false) {
        slugs.push({
          params: { slug: mdxData.slug },
          locale,
        });
      }
    }
  }

  return slugs;
}
