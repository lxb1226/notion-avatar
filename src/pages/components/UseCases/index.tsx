import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import ChatDemo from './ChatDemo';
import SocialDemo from './SocialDemo';

type UseCase = {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
};

export default function UseCases() {
  const { t } = useTranslation('common');

  const useCases: UseCase[] = [
    {
      title: t('useCaseProfessional'),
      description: t('useCaseProfessionalDesc'),
      icon: '/icon/star.svg',
      color: 'bg-blue-50 border-blue-200',
      features: [
        t('linkedinProfiles'),
        t('businessCards'),
        t('emailSignatures'),
        t('companyDirectories'),
      ],
    },
    {
      title: t('useCaseSocial'),
      description: t('useCaseSocialDesc'),
      icon: '/icon/heart.svg',
      color: 'bg-pink-50 border-pink-200',
      features: [
        t('twitterAvatars'),
        t('instagramProfiles'),
        t('tiktokAccounts'),
        t('discordServers'),
      ],
    },
    {
      title: t('useCaseTeam'),
      description: t('useCaseTeamDesc'),
      icon: '/icon/chat.svg',
      color: 'bg-green-50 border-green-200',
      features: [
        t('teamDirectories'),
        t('slackProfiles'),
        t('projectManagement'),
        t('companyWebsites'),
      ],
    },
    {
      title: t('useCaseCreative'),
      description: t('useCaseCreativeDesc'),
      icon: '/icon/palette.svg',
      color: 'bg-purple-50 border-purple-200',
      features: [
        t('personalBlogs'),
        t('portfolioSites'),
        t('creativeProfiles'),
        t('artCommunities'),
      ],
    },
  ];

  return (
    <section className="py-20 relative bg-gray-50">
      {/* Decorative Elements */}
      <div className="absolute right-4 top-12 hidden lg:block">
        <Image
          src="/image/scribble.png"
          width={60}
          height={60}
          alt="Scribble decoration"
          className="opacity-30 transform rotate-45"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            {t('useCases')}
            <span className="absolute -top-2 -right-6">
              <Image
                src="/icon/star.svg"
                width={20}
                height={20}
                alt="Star"
                style={{ width: '20px', height: '20px' }}
              />
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('useCasesDescription')}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-white border-3 border-black rounded-xl p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer hover:-translate-y-1"
            >
              {/* Icon with colored background */}
              <div
                className={`w-16 h-16 ${useCase.color} rounded-xl flex items-center justify-center mb-4 border-2`}
              >
                <Image
                  src={useCase.icon}
                  width={32}
                  height={32}
                  alt={useCase.title}
                  className="group-hover:scale-110 transition-transform duration-200"
                  style={{ width: '32px', height: '32px' }}
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-black mb-3">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {useCase.description}
              </p>

              {/* Features List */}
              <div className="space-y-2">
                {useCase.features.slice(0, 3).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center text-xs text-gray-500"
                  >
                    <div className="w-1.5 h-1.5 bg-black rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
                {useCase.features.length > 3 && (
                  <div className="text-xs text-gray-400">
                    +{useCase.features.length - 3} {t('moreFeatures')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demos Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('seeItInAction')}
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t('seeItInActionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="bg-white border-3 border-black rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/icon/chat.svg"
                    width={24}
                    height={24}
                    alt="Chat"
                  />
                  <h4 className="font-bold">{t('teamCommunication')}</h4>
                </div>
                <ChatDemo />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-3 border-black rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/icon/x-logo.svg"
                    width={24}
                    height={24}
                    alt="Social"
                  />
                  <h4 className="font-bold">{t('socialMediaProfile')}</h4>
                </div>
                <SocialDemo />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border-3 border-black rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-6">
            {t('whyChooseCustomAvatars')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <Image
                  src="/icon/check.svg"
                  width={24}
                  height={24}
                  alt="Professional"
                />
              </div>
              <h4 className="font-bold">{t('professionalLook')}</h4>
              <p className="text-sm text-gray-600">
                {t('professionalLookDesc')}
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                <Image
                  src="/icon/heart.svg"
                  width={24}
                  height={24}
                  alt="Unique"
                />
              </div>
              <h4 className="font-bold">{t('uniquelyYours')}</h4>
              <p className="text-sm text-gray-600">{t('uniquelyYoursDesc')}</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <Image
                  src="/icon/download.svg"
                  width={24}
                  height={24}
                  alt="Ready"
                />
              </div>
              <h4 className="font-bold">{t('readyToUse')}</h4>
              <p className="text-sm text-gray-600">{t('readyToUseDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
