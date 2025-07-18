import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function CTASection() {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorations - simplified to match original style */}
      <div className="absolute inset-0">
        <Image
          src="/image/scribble.png"
          alt="Decorative scribbles"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-10"
          sizes="100vw"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
          {t('ctaTitle')}
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('ctaDescription')}
        </p>

        {/* Stats - with consistent black borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border-3 border-black rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-black mb-2">200+</div>
            <div className="text-gray-600 text-sm">{t('customOptions')}</div>
          </div>
          <div className="bg-white border-3 border-black rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-black mb-2">10+</div>
            <div className="text-gray-600 text-sm">{t('languages')}</div>
          </div>
          <div className="bg-white border-3 border-black rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-black mb-2">100K+</div>
            <div className="text-gray-600 text-sm">{t('usersServed')}</div>
          </div>
          <div className="bg-white border-3 border-black rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-black mb-2">0$</div>
            <div className="text-gray-600 text-sm">{t('completelyFree')}</div>
          </div>
        </div>

        {/* CTA Buttons - matching original design */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('avatar-editor')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-50 outline-none inline-flex items-center justify-center px-8 py-4 bg-white border-3 border-black text-black font-bold rounded-full transition-all duration-200"
          >
            <Image
              src="/icon/star.svg"
              alt="Start"
              width={24}
              height={24}
              className="mr-3"
            />
            {t('startNow')}
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-8 text-gray-600 text-sm">
          {t('noSignupRequired')} • {t('openSource')} • {t('privacy')}
        </div>
      </div>
    </section>
  );
}
