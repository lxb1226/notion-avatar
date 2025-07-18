import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import {
  generateUglyAvatar,
  pointsToPath,
  pointsToSmoothPath,
  AvatarData,
  HAIR_COLORS,
} from '../../../utils/uglyAvatar';

interface UglyAvatarGeneratorProps {
  size?: number;
  className?: string;
}

export default function UglyAvatarGenerator({
  size = 400,
  className = '',
}: UglyAvatarGeneratorProps) {
  const { t } = useTranslation('common');
  const [avatarData, setAvatarData] = useState<AvatarData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // 生成新的创意头像
  const generateNewAvatar = useCallback(() => {
    setIsGenerating(true);
    // 添加短暂延迟以显示生成动画
    setTimeout(() => {
      const newAvatar = generateUglyAvatar();
      setAvatarData(newAvatar);
      setIsGenerating(false);
    }, 300);
  }, []);

  // 下载头像为 PNG
  const downloadAvatar = useCallback(() => {
    if (!svgRef.current || !avatarData) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = 'creative-avatar.png';
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [avatarData, size]);

  // 键盘快捷键
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        generateNewAvatar();
      } else if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        downloadAvatar();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [generateNewAvatar, downloadAvatar]);

  // 初始生成头像
  React.useEffect(() => {
    if (!avatarData) {
      generateNewAvatar();
    }
  }, [generateNewAvatar, avatarData]);

  if (!avatarData) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-xl ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('creativeAvatar.generating')}</p>
        </div>
      </div>
    );
  }

  // 生成彩虹渐变定义
  const rainbowGradient = (
    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#ff0000" />
      <stop offset="16.66%" stopColor="#ff8c00" />
      <stop offset="33.33%" stopColor="#ffd700" />
      <stop offset="50%" stopColor="#00ff00" />
      <stop offset="66.66%" stopColor="#00ffff" />
      <stop offset="83.33%" stopColor="#0000ff" />
      <stop offset="100%" stopColor="#8a2be2" />
    </linearGradient>
  );

  return (
    <div className={`relative ${className}`}>
      {/* SVG 头像 */}
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="-100 -100 200 200"
        className={`border-3 border-black rounded-xl transition-all duration-300 ${
          isGenerating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ backgroundColor: avatarData.backgroundColor }}
      >
        <defs>
          {/* 模糊滤镜 */}
          <filter id="fuzzy">
            <feTurbulence baseFrequency="0.02" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="1" />
          </filter>

          {/* 彩虹渐变 */}
          {avatarData.hasRainbowHair && rainbowGradient}
        </defs>

        {/* 脸部轮廓 */}
        <path
          d={pointsToSmoothPath(avatarData.faceShape) + ' Z'}
          fill="#ffdbac"
          stroke="#000000"
          strokeWidth="2"
          filter="url(#fuzzy)"
        />

        {/* 左眼 */}
        <path
          d={pointsToSmoothPath(avatarData.leftEye) + ' Z'}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* 右眼 */}
        <path
          d={pointsToSmoothPath(avatarData.rightEye) + ' Z'}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* 左瞳孔 */}
        <circle
          cx={avatarData.leftPupil.x}
          cy={avatarData.leftPupil.y}
          r="2"
          fill="#000000"
        />

        {/* 右瞳孔 */}
        <circle
          cx={avatarData.rightPupil.x}
          cy={avatarData.rightPupil.y}
          r="2"
          fill="#000000"
        />

        {/* 鼻子 */}
        {avatarData.noseType === 0 ? (
          // 点状鼻子
          <circle
            cx={avatarData.nosePoints[0].x}
            cy={avatarData.nosePoints[0].y}
            r="1.5"
            fill="#000000"
          />
        ) : (
          // 线状鼻子
          <path
            d={pointsToPath(avatarData.nosePoints)}
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* 嘴巴 */}
        <path
          d={
            avatarData.mouthType === 2
              ? pointsToSmoothPath(avatarData.mouthShape) + ' Z'
              : pointsToSmoothPath(avatarData.mouthShape)
          }
          fill={avatarData.mouthType === 2 ? '#ff6b6b' : 'none'}
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 头发 */}
        {avatarData.hairLines.map((hairLine, index) => (
          <path
            key={index}
            d={pointsToSmoothPath(hairLine)}
            stroke={avatarData.hasRainbowHair ? 'url(#rainbow)' : avatarData.hairColor}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {/* 生成动画覆盖层 */}
        {isGenerating && (
          <rect
            x="-100"
            y="-100"
            width="200"
            height="200"
            fill="rgba(255, 255, 255, 0.7)"
          />
        )}
      </svg>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          type="button"
          onClick={generateNewAvatar}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-black text-white border-3 border-black rounded-full hover:bg-gray-800 transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image
            src="/icon/dice.svg"
            alt="Generate"
            width={18}
            height={18}
            className="filter brightness-0 invert"
          />
          <span>{t('creativeAvatar.generate')}</span>
        </button>

        <button
          type="button"
          onClick={downloadAvatar}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-6 py-3 bg-white text-black border-3 border-black rounded-full hover:bg-gray-100 transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image
            src="/icon/download.svg"
            alt="Download"
            width={18}
            height={18}
          />
          <span>{t('creativeAvatar.download')}</span>
        </button>
      </div>

      {/* 快捷键提示 */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          {t('creativeAvatar.shortcutGenerate')}: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd>
        </p>
        <p>
          {t('creativeAvatar.shortcutSave')}: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl/Cmd + S</kbd>
        </p>
      </div>

      {/* 头像信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">{t('creativeAvatar.avatarInfo')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">{t('creativeAvatar.hairType')}:</span> {avatarData.hairType}
          </div>
          <div>
            <span className="font-medium">{t('creativeAvatar.mouthType')}:</span> {avatarData.mouthType}
          </div>
          <div>
            <span className="font-medium">{t('creativeAvatar.noseType')}:</span> {avatarData.noseType}
          </div>
          <div>
            <span className="font-medium">{t('creativeAvatar.specialHair')}:</span>{' '}
            {avatarData.hasRainbowHair ? t('creativeAvatar.rainbow') : t('creativeAvatar.normal')}
          </div>
        </div>
      </div>
    </div>
  );
}