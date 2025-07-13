import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('legal'),
      links: [
        { name: t('privacyPolicy'), href: '/privacy', internal: true },
        { name: t('faq'), href: '/faq', internal: true },
        { name: t('contactUs'), href: '/contact', internal: true },
        // {
        //   name: 'CC0 License',
        //   href: 'https://creativecommons.org/publicdomain/zero/1.0/',
        //   internal: false,
        // },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t-3 border-black">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">{t('avatarMaker')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('footerDescription')}
              </p>
            </div>
            {/* <div className="flex space-x-3">
              <a
                href="https://x.com/phillzou"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="Twitter/X"
              >
                <Image src="/icon/x-logo.svg" width={20} height={20} alt="X" />
              </a>
              <a
                href="https://dribbble.com/phillzou"
                className="text-gray-400 hover:text-black transition-colors text-sm"
                aria-label="Dribbble"
              >
                Dribbble
              </a>
            </div> */}
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="font-bold text-black mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.internal ? (
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-black transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-black transition-colors text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 text-center md:text-left">
              <p>{t('copyrightText', { year: currentYear })}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{t('madeWithLove')}</span>
            </div>
          </div>
        </div>

        {/* Schema.org structured data hints */}
        <div className="hidden">
          <span itemScope itemType="https://schema.org/WebApplication">
            <span itemProp="name">Avatify</span>
            <span itemProp="description">
              Free online avatar generator for creating custom hand-drawn style
              profile pictures
            </span>
            <span itemProp="applicationCategory">Design Tool</span>
            <span itemProp="operatingSystem">Web Browser</span>
            <span itemProp="price">Free</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
