import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Footer from './components/Footer';
import Header from './components/Header';

export default function Privacy() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('privacyPageTitle')}</title>
        <meta name="description" content={t('privacyPageDescription')} />
        <meta name="keywords" content={t('privacyKeywords')} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={t('privacyPageTitle')} />
        <meta property="og:description" content={t('privacyPageDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/F5R0K03.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('privacyPageTitle')} />
        <meta
          name="twitter:description"
          content={t('privacyPageDescription')}
        />
        <meta name="twitter:image" content="https://i.imgur.com/F5R0K03.png" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {t('privacyHeading')}
            </h1>

            <p className="text-gray-600 mb-8">
              {t('privacyLastUpdated')} {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyIntroTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacyIntroText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyInfoCollectTitle')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('privacyInfoProvideTitle')}
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>{t('privacyInfoProvide1')}</li>
                    <li>{t('privacyInfoProvide2')}</li>
                    <li>{t('privacyInfoProvide3')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('privacyAutoCollectTitle')}
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>{t('privacyAutoCollect1')}</li>
                    <li>{t('privacyAutoCollect2')}</li>
                    <li>{t('privacyAutoCollect3')}</li>
                    <li>{t('privacyAutoCollect4')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyUseInfoTitle')}
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('privacyUseInfo1')}</li>
                <li>{t('privacyUseInfo2')}</li>
                <li>{t('privacyUseInfo3')}</li>
                <li>{t('privacyUseInfo4')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyDataProcessTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacyDataProcessText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyDataSharingTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacyDataSharingText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyCookiesTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacyCookiesText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyRightsTitle')}
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('privacyRights1')}</li>
                <li>{t('privacyRights2')}</li>
                <li>{t('privacyRights3')}</li>
                <li>{t('privacyRights4')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacySecurityTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacySecurityText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacyContactTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacyContactText')}
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
