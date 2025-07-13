/* eslint-disable import/extensions, import/no-unresolved, react/no-danger */
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { BlogPost } from '../../types/blog';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '../../lib/blog';

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({
  post,
  relatedPosts,
}: BlogPostPageProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // 文章结构化数据
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo.metaTitle,
    description: post.seo.metaDescription,
    image: post.seo.ogImage,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avatify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://notion-avatar.app/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://notion-avatar.app/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.seo.keywords.join(', '),
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <>
      <Head>
        <title>{post.seo.metaTitle}</title>
        <meta name="description" content={post.seo.metaDescription} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={post.author.name} />
        <meta name="article:published_time" content={post.publishedAt} />
        <meta name="article:modified_time" content={post.updatedAt} />
        <meta name="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} name="article:tag" content={tag} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content={post.seo.metaTitle} />
        <meta property="og:description" content={post.seo.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.seo.ogImage} />
        <meta
          property="og:url"
          content={`https://notion-avatar.app/blog/${post.slug}`}
        />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:section" content={post.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo.metaTitle} />
        <meta name="twitter:description" content={post.seo.metaDescription} />
        <meta name="twitter:image" content={post.seo.ogImage} />

        {/* 文章结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  {t('home')}
                </Link>
              </li>
              <li>→</li>
              <li>
                <Link href="/blog" className="hover:text-gray-900">
                  {t('blog')}
                </Link>
              </li>
              <li>→</li>
              <li className="text-gray-900">{post.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">
                {t('readingTime', { minutes: post.readingTime })}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-600">{post.author.bio}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {t('publishedOn')}{' '}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                {post.updatedAt !== post.publishedAt && (
                  <p className="text-sm text-gray-500">
                    {t('updatedOn')}{' '}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 mb-12 rounded-xl overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-content"
            />
          </article>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('shareArticle')}
            </h3>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://notion-avatar.app/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span>Twitter</span>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://notion-avatar.app/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                {t('relatedArticles')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-gray-600 transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {t('readingTime', {
                            minutes: relatedPost.readingTime,
                          })}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(
                            relatedPost.publishedAt,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<{ params: { slug: string }; locale: string }> = [];

  const supportedLocales = locales || ['en'];
  const posts = await getBlogPosts(supportedLocales[0]);

  const allPaths = posts.flatMap((post) =>
    supportedLocales.map((locale) => ({
      params: { slug: post.slug },
      locale,
    })),
  );

  paths.push(...allPaths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;

  try {
    const post = await getBlogPost(slug, locale || 'en');
    const relatedPosts = await getRelatedPosts(post, locale || 'en');

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        post,
        relatedPosts,
      },
      revalidate: 3600,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
