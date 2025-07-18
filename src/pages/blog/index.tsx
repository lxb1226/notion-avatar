/* eslint-disable import/extensions, import/no-unresolved, react/no-danger */
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getOptimizedBlogPosts } from '../../lib/blog';
import { formatDate } from '../../utils/blog';

interface OptimizedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
  category: string;
  featuredImage: string;
}

interface BlogPageProps {
  posts: OptimizedBlogPost[];
  featuredPosts: OptimizedBlogPost[];
  categories: string[];
  totalPosts: number;
}

export default function Blog({
  posts: initialPosts,
  featuredPosts,
  categories,
  totalPosts,
}: BlogPageProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [posts, setPosts] = useState<OptimizedBlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/blog/posts?locale=${
          router.locale || 'en'
        }&offset=${posts.length}&limit=6&category=${selectedCategory}`,
      );
      const data = await response.json();

      if (data.posts.length > 0) {
        setPosts((prev) => [...prev, ...data.posts]);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // 重置分类时重新加载文章
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setPosts(initialPosts);
      setHasMore(totalPosts > initialPosts.length);
    } else {
      // 过滤现有文章
      const filtered = posts.filter((post) => post.category === category);
      setPosts(filtered);
      setHasMore(false); // 简化处理，分类筛选时不支持加载更多
    }
  };

  // 博客页面结构化数据
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('blogTitle'),
    description: t('blogDescription'),
    url: 'https://notion-avatar.app/blog',
    author: {
      '@type': 'Organization',
      name: 'Avatify',
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://notion-avatar.app/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt, // Use publishedAt as fallback since updatedAt is not available in OptimizedBlogPost
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
      image: post.featuredImage,
    })),
  };

  return (
    <>
      <Head>
        <title>{t('blogPageTitle')}</title>
        <meta name="description" content={t('blogPageDescription')} />
        <meta name="keywords" content={t('blogKeywords')} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={t('blogPageTitle')} />
        <meta property="og:description" content={t('blogPageDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/F5R0K03.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('blogPageTitle')} />
        <meta name="twitter:description" content={t('blogPageDescription')} />
        <meta name="twitter:image" content="https://i.imgur.com/F5R0K03.png" />

        {/* 博客结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('blogHeading')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('blogSubheading')}
            </p>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t('featuredPosts')}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border-3 border-black rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="relative h-64">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={featuredPosts.indexOf(post) === 0} // 第一个精选文章使用优先级
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {t('readingTime', { minutes: post.readingTime })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-gray-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="text-sm text-gray-700">
                            {post.author.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(post.publishedAt, router.locale)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Category Filter */}
          <section className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`px-6 py-2 rounded-full border-2 font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {t('allCategories')}
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2 rounded-full border-2 font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {t(
                    `blogCategory${category.charAt(0).toUpperCase() + category.slice(1)}`,
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {t('readingTime', { minutes: post.readingTime })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-gray-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-700">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(post.publishedAt, router.locale)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && selectedCategory === 'all' && (
              <div className="text-center mt-12">
                <button
                  type="button"
                  onClick={loadMorePosts}
                  disabled={loading}
                  className="inline-block bg-gray-100 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('loading') : t('loadMore')}
                </button>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('blogCtaTitle')}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('blogCtaDescription')}
              </p>
              <Link
                href="/"
                className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                {t('startCreating')}
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // 使用优化函数获取数据，减少传输的数据量
  const allPosts = await getOptimizedBlogPosts(locale || 'en');
  const featuredPosts = allPosts.filter((post) => post.featured);
  const categories = [
    ...new Set(allPosts.map((post) => post.category).filter(Boolean)),
  ];

  // 初始只返回前12篇文章，减少数据量
  const posts = allPosts.slice(0, 12).map((post) => ({
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

  const optimizedFeaturedPosts = featuredPosts.slice(0, 2).map((post) => ({
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

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
      posts,
      featuredPosts: optimizedFeaturedPosts,
      categories,
      totalPosts: allPosts.length,
    },
    revalidate: 3600, // 重新生成页面间隔（秒）
  };
};
