import { useTranslation } from 'next-i18next';
import Image from 'next/legacy/image';

type UserType = {
  title: string;
  description: string;
  icon: string;
  users: string[];
  backgroundColor: string;
};

export default function WhosUsing() {
  const { t } = useTranslation('common');

  const userTypes: UserType[] = [
    {
      title: 'Developers',
      description: 'Open source contributors and software engineers',
      icon: '/icon/code.svg',
      users: ['shadcn', 'ruanyf', 'Mayandev', 'vercel'],
      backgroundColor: 'bg-blue-50',
    },
    {
      title: 'Designers',
      description: 'UI/UX designers and creative professionals',
      icon: '/icon/palette.svg',
      users: ['figma', 'dribbble', 'adobe', 'sketch'],
      backgroundColor: 'bg-purple-50',
    },
    {
      title: 'Teams',
      description: 'Startups and companies building their brand',
      icon: '/icon/star.svg',
      users: ['notion', 'slack', 'discord', 'github'],
      backgroundColor: 'bg-green-50',
    },
    {
      title: 'Content Creators',
      description: 'Bloggers, influencers and social media managers',
      icon: '/icon/heart.svg',
      users: ['twitter', 'youtube', 'tiktok', 'instagram'],
      backgroundColor: 'bg-pink-50',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '200K+', label: 'Avatars Created' },
    { number: '100+', label: 'Countries' },
    { number: '10', label: 'Languages' },
  ];

  return (
    <section className="py-20 relative">
      {/* Decorative Element */}
      <div className="absolute left-4 top-8 hidden lg:block">
        <Image
          src="/image/scribble.png"
          width={80}
          height={80}
          alt="Scribble decoration"
          className="opacity-40"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            {t('whosUsing')}
            <span className="absolute -top-3 -right-8">
              <Image src="/icon/star.svg" width={24} height={24} alt="Star" />
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('whosUsingDescription')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bg-white border-3 border-black rounded-xl p-6 mb-4">
                <div className="text-2xl md:text-3xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* User Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((userType) => (
            <div
              key={userType.title}
              className={`${userType.backgroundColor} border-3 border-black rounded-xl p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer`}
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-4 relative">
                <Image
                  src={userType.icon}
                  width={48}
                  height={48}
                  alt={userType.title}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-black mb-2">
                {userType.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {userType.description}
              </p>

              {/* User Avatars */}
              <div className="flex -space-x-2">
                {userType.users.slice(0, 3).map((user, userIndex) => (
                  <div
                    key={user}
                    className="w-8 h-8 relative border-2 border-white rounded-full overflow-hidden"
                  >
                    <Image
                      src={`/image/avatar-${(userIndex % 6) + 1}.${
                        userIndex < 4 ? 'jpg' : 'png'
                      }`}
                      alt={user}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
                {userType.users.length > 3 && (
                  <div className="w-8 h-8 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">
                      +{userType.users.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white border-3 border-black rounded-xl p-8 inline-block">
            <h3 className="text-xl font-bold mb-4">Join the Community</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Create your unique avatar and join thousands of users worldwide
            </p>
            <button
              type="button"
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {t('startCreating')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
