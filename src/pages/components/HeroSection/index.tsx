import Image from 'next/legacy/image';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

export default function HeroSection() {
  const { t } = useTranslation('common');
  const [isPressed, setIsPressed] = useState(false);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Background decoration - using existing scribble pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/image/scribble.png"
          alt="Decorative scribbles"
          layout="fill"
          objectFit="cover"
          className="opacity-5"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main heading - H1 for SEO - updated to be more generic */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            <span className="block">Create Your Perfect</span>
            <span className="block text-black">Custom Avatar</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-600 mt-2">
              in Seconds
            </span>
          </h1>

          {/* Value proposition - important for SEO */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>

          {/* Key benefits list - consistent with original design */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm sm:text-base">
            <span className="bg-white px-4 py-2 rounded-full border-3 border-black font-bold">
              ✨ {t('benefit1')}
            </span>
            <span className="bg-white px-4 py-2 rounded-full border-3 border-black font-bold">
              🎨 {t('benefit2')}
            </span>
            <span className="bg-white px-4 py-2 rounded-full border-3 border-black font-bold">
              📱 {t('benefit3')}
            </span>
            <span className="bg-white px-4 py-2 rounded-full border-3 border-black font-bold">
              🚀 {t('benefit4')}
            </span>
          </div>

          {/* CTA Button - matching original button style */}
          <div className="mb-16">
            <button
              type="button"
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              onClick={() => {
                document.getElementById('avatar-editor')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className={`
                focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-50 outline-none 
                inline-flex items-center justify-center px-8 py-4 text-lg 
                bg-white border-3 border-black text-black font-bold rounded-full 
                transition-all duration-200
                ${isPressed ? 'transform scale-95' : ''}
              `}
            >
              <Image
                src="/icon/dice.svg"
                alt="Create Avatar"
                width={24}
                height={24}
                className="mr-3"
              />
              {t('startCreating')}
            </button>
          </div>

          {/* Social proof */}
          <div className="text-center">
            <p className="text-gray-500 mb-4">{t('socialProof')}</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <Image
                src="/icon/github.svg"
                alt="GitHub"
                width={32}
                height={32}
              />
              <Image
                src="/icon/x-logo.svg"
                alt="Twitter/X"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold">LinkedIn</span>
              <Image
                src="/icon/ins-logo.svg"
                alt="Instagram"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
