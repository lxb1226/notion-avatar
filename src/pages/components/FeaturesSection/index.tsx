import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function FeaturesSection() {
  const { t } = useTranslation('common');

  const features = [
    {
      id: 'customization',
      icon: '/icon/palette.svg',
      title: t('feature1Title'),
      description: t('feature1Description'),
      count: '200+',
      label: t('customOptions'),
    },
    {
      id: 'formats',
      icon: '/icon/download.svg',
      title: t('feature2Title'),
      description: t('feature2Description'),
      count: '2',
      label: t('formats'),
    },
    {
      id: 'free',
      icon: '/icon/heart.svg',
      title: t('feature3Title'),
      description: t('feature3Description'),
      count: '100%',
      label: t('free'),
    },
    {
      id: 'accessibility',
      icon: '/icon/star.svg',
      title: t('feature4Title'),
      description: t('feature4Description'),
      count: '10+',
      label: t('languages'),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featuresDescription')}
          </p>
        </div>

        {/* Features grid - matching original design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group p-8 bg-white border-3 border-black rounded-2xl hover:bg-gray-50 transition-all duration-200"
            >
              {/* Icon and count */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-black">
                    {feature.count}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                    {feature.label}
                  </div>
                </div>
              </div>

              {/* Feature content */}
              <h3 className="text-xl font-bold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional features list - simplified design */}
        <div className="mt-16 bg-white border-3 border-black rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-black mb-8">
            {t('additionalFeaturesTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'minimalist-design', text: t('feature5') },
              { id: 'real-time-preview', text: t('feature6') },
              { id: 'mobile-friendly', text: t('feature7') },
              { id: 'instant-download', text: t('feature8') },
              { id: 'works-offline', text: t('feature9') },
              { id: 'privacy-focused', text: t('feature10') },
            ].map((feature) => (
              <div key={feature.id} className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-black rounded-full" />
                <span className="text-gray-700 font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
