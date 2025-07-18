/* eslint-disable import/extensions, import/no-unresolved */
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import UglyAvatarGenerator from './components/UglyAvatarGenerator';

export default function CreativeAvatarPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('creativeAvatar.pageTitle')}</title>
        <meta name="description" content={t('creativeAvatar.pageDescription')} />
        <meta name="keywords" content={t('creativeAvatar.keywords')} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={t('creativeAvatar.pageTitle')} />
        <meta property="og:description" content={t('creativeAvatar.pageDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://avatify.online/images/creative-avatar-og.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('creativeAvatar.pageTitle')} />
        <meta name="twitter:description" content={t('creativeAvatar.pageDescription')} />
        <meta name="twitter:image" content="https://avatify.online/images/creative-avatar-og.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: t('creativeAvatar.pageTitle'),
              description: t('creativeAvatar.pageDescription'),
              url: 'https://avatify.online/creative-avatar',
              applicationCategory: 'DesignApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  {t('home')}
                </Link>
              </li>
              <li>→</li>
              <li className="text-gray-900">{t('creativeAvatar.title')}</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('creativeAvatar.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('creativeAvatar.subtitle')}
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                ✨ {t('creativeAvatar.feature.unique')}
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                🎨 {t('creativeAvatar.feature.artistic')}
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                🚀 {t('creativeAvatar.feature.instant')}
              </span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                🎲 {t('creativeAvatar.feature.random')}
              </span>
            </div>
          </div>

          {/* Main Generator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Generator */}
            <div className="order-2 lg:order-1">
              <UglyAvatarGenerator size={400} className="mx-auto" />
            </div>

            {/* Information Panel */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* What is Creative Avatar */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('creativeAvatar.what.title')}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t('creativeAvatar.what.description')}
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>{t('creativeAvatar.what.point1')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>{t('creativeAvatar.what.point2')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-purple-500">•</span>
                    <span>{t('creativeAvatar.what.point3')}</span>
                  </li>
                </ul>
              </div>

              {/* How to Use */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('creativeAvatar.howTo.title')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.howTo.step1.title')}</h3>
                      <p className="text-gray-600">{t('creativeAvatar.howTo.step1.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.howTo.step2.title')}</h3>
                      <p className="text-gray-600">{t('creativeAvatar.howTo.step2.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.howTo.step3.title')}</h3>
                      <p className="text-gray-600">{t('creativeAvatar.howTo.step3.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('creativeAvatar.features.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🎨</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.features.artistic.title')}</h3>
                      <p className="text-sm text-gray-600">{t('creativeAvatar.features.artistic.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🎲</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.features.random.title')}</h3>
                      <p className="text-sm text-gray-600">{t('creativeAvatar.features.random.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌈</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.features.colorful.title')}</h3>
                      <p className="text-sm text-gray-600">{t('creativeAvatar.features.colorful.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('creativeAvatar.features.fast.title')}</h3>
                      <p className="text-sm text-gray-600">{t('creativeAvatar.features.fast.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Examples Section */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('creativeAvatar.examples.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('creativeAvatar.examples.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border-3 border-black rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🎮</div>
                  <h3 className="text-lg font-bold text-gray-900">{t('creativeAvatar.examples.gaming.title')}</h3>
                </div>
                <p className="text-gray-600">{t('creativeAvatar.examples.gaming.description')}</p>
              </div>

              <div className="bg-white border-3 border-black rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🎭</div>
                  <h3 className="text-lg font-bold text-gray-900">{t('creativeAvatar.examples.social.title')}</h3>
                </div>
                <p className="text-gray-600">{t('creativeAvatar.examples.social.description')}</p>
              </div>

              <div className="bg-white border-3 border-black rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🎨</div>
                  <h3 className="text-lg font-bold text-gray-900">{t('creativeAvatar.examples.art.title')}</h3>
                </div>
                <p className="text-gray-600">{t('creativeAvatar.examples.art.description')}</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-3 border-purple-300 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('creativeAvatar.cta.title')}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('creativeAvatar.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/"
                  className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <Image
                    src="/icon/palette.svg"
                    alt="Professional Avatar"
                    width={18}
                    height={18}
                    className="filter brightness-0 invert"
                  />
                  <span>{t('creativeAvatar.cta.professional')}</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center space-x-2 bg-white text-black border-2 border-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  <Image
                    src="/icon/chat.svg"
                    alt="Blog"
                    width={18}
                    height={18}
                  />
                  <span>{t('creativeAvatar.cta.blog')}</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};