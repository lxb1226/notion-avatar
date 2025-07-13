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
        <title>Privacy Policy - Avatify</title>
        <meta
          name="description"
          content="Privacy Policy for Avatify - Learn how we protect your data and privacy when using our avatar generation service."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Avatify. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and protect your information when you use our 
                avatar generation service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Information You Provide</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Avatar customization preferences</li>
                    <li>Generated avatar data (processed locally in your browser)</li>
                    <li>Feedback and support communications</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Usage analytics and website performance data</li>
                    <li>Browser type and version</li>
                    <li>Device information and screen resolution</li>
                    <li>IP address (anonymized)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and improve our avatar generation service</li>
                <li>To analyze usage patterns and optimize performance</li>
                <li>To respond to your inquiries and provide support</li>
                <li>To ensure the security and integrity of our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Processing</h2>
              <p className="text-gray-700 leading-relaxed">
                Avatify processes avatar generation entirely in your browser. We do not store or transmit your 
                avatar designs to our servers unless you explicitly choose to share them. All avatar customization 
                happens locally on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or share your personal information with third parties, except as described 
                in this privacy policy or with your explicit consent. We may share anonymized, aggregated data 
                for analytics purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use essential cookies to provide basic functionality and improve your experience. We may use 
                analytics tools to understand how our service is used, but all data is anonymized and aggregated.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Opt-out of non-essential data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us 
                through our contact page or via the social media links in our footer.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};