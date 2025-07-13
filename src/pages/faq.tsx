import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function FAQ() {
  const { t } = useTranslation('common');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqItems = [
    {
      id: 'what-is-avatify',
      question: t('faqItem1Question'),
      answer: t('faqItem1Answer'),
    },
    {
      id: 'is-free',
      question: t('faqItem2Question'),
      answer: t('faqItem2Answer'),
    },
    {
      id: 'no-account',
      question: t('faqItem3Question'),
      answer: t('faqItem3Answer'),
    },
    {
      id: 'file-formats',
      question: t('faqItem4Question'),
      answer: t('faqItem4Answer'),
    },
    {
      id: 'commercial-use',
      question: t('faqItem5Question'),
      answer: t('faqItem5Answer'),
    },
    {
      id: 'how-generated',
      question: t('faqItem6Question'),
      answer: t('faqItem6Answer'),
    },
    {
      id: 'customization',
      question: t('faqItem7Question'),
      answer: t('faqItem7Answer'),
    },
    {
      id: 'privacy',
      question: t('faqItem8Question'),
      answer: t('faqItem8Answer'),
    },
    {
      id: 'browser-support',
      question: t('faqItem9Question'),
      answer: t('faqItem9Answer'),
    },
    {
      id: 'team-use',
      question: t('faqItem10Question'),
      answer: t('faqItem10Answer'),
    },
    {
      id: 'feedback',
      question: t('faqItem11Question'),
      answer: t('faqItem11Answer'),
    },
    {
      id: 'credits',
      question: t('faqItem12Question'),
      answer: t('faqItem12Answer'),
    },
  ];

  return (
    <>
      <Head>
        <title>{t('faqPageTitle')}</title>
        <meta name="description" content={t('faqPageDescription')} />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('faqHeading')}
            </h1>
            <p className="text-xl text-gray-600">{t('faqSubheading')}</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <span className="text-2xl text-gray-500">
                    {openItems.includes(index) ? '−' : '+'}
                  </span>
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-white">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('faqStillHaveQuestions')}
            </h2>
            <p className="text-gray-600 mb-6">{t('faqContactDescription')}</p>
            <Link
              href="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              {t('faqContactButton')}
            </Link>
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
