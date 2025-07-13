import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqItems = [
    {
      id: 'what-is-avatify',
      question: 'What is Avatify?',
      answer:
        'Avatify is a free online avatar generator that creates unique, hand-drawn style avatars for your social media profiles, team directories, and personal branding. No registration required.',
    },
    {
      id: 'is-free',
      question: 'Is Avatify really free?',
      answer:
        'Yes! Avatify is completely free to use. You can create and download as many avatars as you want without any cost or registration.',
    },
    {
      id: 'no-account',
      question: 'Do I need to create an account?',
      answer:
        'No account required! You can start creating avatars immediately without signing up or providing any personal information.',
    },
    {
      id: 'file-formats',
      question: 'What file formats can I download?',
      answer:
        'You can download your avatars in high-quality PNG and SVG formats, perfect for use across different platforms and applications.',
    },
    {
      id: 'commercial-use',
      question: 'Can I use these avatars commercially?',
      answer:
        'Yes! All avatars created with Avatify are released under CC0 license, which means you can use them for personal or commercial purposes without attribution required.',
    },
    {
      id: 'how-generated',
      question: 'How are avatars generated?',
      answer:
        "Avatars are generated entirely in your browser using our customization tools. We don't store your avatar data on our servers - everything happens locally on your device.",
    },
    {
      id: 'customization',
      question: 'Can I customize the avatars?',
      answer:
        'Absolutely! You can customize various aspects including hair, facial features, accessories, colors, and more to create a unique avatar that represents you.',
    },
    {
      id: 'privacy',
      question: 'Are my avatars private?',
      answer:
        "Yes, your avatar creation process is completely private. All customization happens in your browser, and we don't store or access your avatar designs unless you choose to share them.",
    },
    {
      id: 'browser-support',
      question: 'What browsers are supported?',
      answer:
        'Avatify works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.',
    },
    {
      id: 'team-use',
      question: 'Can I use avatars for my team?',
      answer:
        'Yes! Avatify is perfect for creating consistent avatar styles for team directories, company profiles, or group projects.',
    },
    {
      id: 'feedback',
      question: 'How do I report a bug or request a feature?',
      answer:
        'You can reach out to us through our contact page or social media links in the footer. We appreciate feedback and feature suggestions!',
    },
    {
      id: 'credits',
      question: 'Who created the illustrations?',
      answer:
        'The beautiful hand-drawn illustrations were designed by Felix Wong and are available under CC0 license, making them free for everyone to use.',
    },
  ];

  return (
    <>
      <Head>
        <title>FAQ - Avatify</title>
        <meta
          name="description"
          content="Frequently Asked Questions about Avatify - Find answers to common questions about our free avatar generator service."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about Avatify
            </p>
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
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Feel free to
              reach out to us.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Contact Us
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
