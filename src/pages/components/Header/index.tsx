import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '简体中文', flag: '🇨🇳' },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === router.locale) || languages[0];

  const changeLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale });
    setIsLanguageDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative bg-white">
      {/* Main container with consistent padding and background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo and brand name section */}
          <Link
            href="/"
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200"
          >
            {/* Logo with consistent styling */}
            <div className="relative">
              <div className="w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center p-2 shadow-sm">
                <Image
                  src="/logo.gif"
                  alt="Avatify Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Brand text with consistent typography */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                {t('avatarMaker')}
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                {t('createCustomAvatars')}
              </p>
            </div>
          </Link>

          {/* Navigation/Action area */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/creative-avatar"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {t('creativeAvatar.title')}
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {t('blog')}
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {t('faq')}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {t('contactUs')}
              </Link>
            </nav>

            {/* Language switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center space-x-2 px-3 py-2 border-2 border-gray-200 rounded-lg hover:border-black transition-colors duration-200 text-sm"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline font-medium text-gray-700">
                  {currentLanguage.name}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isLanguageDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Language dropdown */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => changeLanguage(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          language.code === router.locale
                            ? 'bg-gray-100 font-medium text-black'
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                        {language.code === router.locale && (
                          <svg
                            className="w-4 h-4 text-black ml-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Start button */}
            <button
              type="button"
              onClick={() => {
                document.getElementById('avatar-editor')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white border-3 border-black rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm font-bold"
            >
              <Image
                src="/icon/dice.svg"
                alt="Create"
                width={18}
                height={18}
                className="filter brightness-0 invert"
              />
              <span className="hidden sm:inline">{t('startCreating')}</span>
              <span className="sm:hidden">{t('create')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative scribble element */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
        <Image
          src="/image/scribble.png"
          alt="Decorative scribbles"
          fill
          style={{ objectFit: 'contain' }}
          sizes="64px"
        />
      </div>
    </header>
  );
}
