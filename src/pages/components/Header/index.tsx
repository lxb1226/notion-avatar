import Image from 'next/legacy/image';
import { useTranslation } from 'next-i18next';

export default function Header() {
  const { t } = useTranslation('common');

  return (
    <header className="relative bg-white">
      {/* Main container with consistent padding and background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo and brand name section */}
          <div className="flex items-center space-x-4">
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
                Create Custom Avatars
              </p>
            </div>
          </div>

          {/* Navigation/Action area */}
          <div className="flex items-center space-x-4">
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
              <span className="hidden sm:inline">Start Creating</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative scribble element */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
        <Image
          src="/image/scribble.png"
          alt="Decorative scribbles"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </header>
  );
}
