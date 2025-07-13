import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Image from 'next/legacy/image';

export default function FAQSection() {
  const { t } = useTranslation('common');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      id: 'create-avatar',
      question: t('faq1Question'),
      answer: t('faq1Answer'),
    },
    {
      id: 'file-formats',
      question: t('faq2Question'),
      answer: t('faq2Answer'),
    },
    {
      id: 'is-free',
      question: t('faq3Question'),
      answer: t('faq3Answer'),
    },
    {
      id: 'commercial-use',
      question: t('faq4Question'),
      answer: t('faq4Answer'),
    },
    {
      id: 'customization-options',
      question: t('faq5Question'),
      answer: t('faq5Answer'),
    },
    {
      id: 'account-required',
      question: t('faq6Question'),
      answer: t('faq6Answer'),
    },
    {
      id: 'data-collection',
      question: t('faq7Question'),
      answer: t('faq7Answer'),
    },
    {
      id: 'mobile-support',
      question: t('faq8Question'),
      answer: t('faq8Answer'),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            {t('faqTitle')}
          </h2>
          <p className="text-xl text-gray-600">{t('faqDescription')}</p>
        </div>

        {/* FAQ items - matching original design */}
        <div className="space-y-4">
          {faqs.map((faq, faqIndex) => (
            <div
              key={faq.id}
              className="bg-white border-3 border-black rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-50 outline-none w-full px-6 py-4 text-left flex items-center justify-between transition-colors"
                onClick={() => toggleFAQ(faqIndex)}
              >
                <h3 className="text-lg font-bold text-black pr-4">
                  {faq.question}
                </h3>
                <div
                  className={`
                  w-6 h-6 flex items-center justify-center bg-white border-2 border-black rounded-full
                  transition-transform duration-200
                  ${openIndex === faqIndex ? 'rotate-45' : ''}
                `}
                >
                  <span className="text-black font-bold text-lg">
                    {openIndex === faqIndex ? '−' : '+'}
                  </span>
                </div>
              </button>

              {openIndex === faqIndex && (
                <div className="px-6 pb-4">
                  <div className="pt-2 pb-2 text-gray-600 leading-relaxed border-t-3 border-black">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional help section - matching original design */}
        <div className="mt-16 text-center">
          <div className="bg-white border-3 border-black rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              {t('stillHaveQuestions')}
            </h3>
            <p className="text-gray-600 mb-6">{t('contactUsDescription')}</p>
            <a
              href="mailto:support@example.com"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-50 outline-none inline-flex items-center justify-center px-6 py-3 bg-white border-3 border-black text-black font-bold rounded-full transition-colors"
            >
              <Image
                src="/icon/send.svg"
                alt="Contact"
                width={20}
                height={20}
                className="mr-2"
              />
              {t('contactUs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
