import { BlogPost } from '../types/blog';

// 模拟博客数据 - 在真实项目中，这些数据可能来自CMS、markdown文件或API
const blogPosts: Record<string, BlogPost[]> = {
  en: [
    {
      id: '1',
      title: '10 Essential Tips for Creating Professional Avatar Designs',
      slug: 'professional-avatar-design-tips',
      excerpt:
        'Learn the fundamental principles of creating avatars that look professional and memorable for your brand or personal use.',
      content: `
        <h2>Why Professional Avatar Design Matters</h2>
        <p>Your avatar is often the first impression people have of you or your brand online. A well-designed avatar can convey professionalism, personality, and trustworthiness in seconds.</p>
        
        <h2>1. Keep It Simple and Clean</h2>
        <p>The best avatars are simple and easily recognizable at small sizes. Avoid cluttered designs with too many details that become unclear when scaled down.</p>
        
        <h2>2. Choose Appropriate Colors</h2>
        <p>Colors convey emotions and associations. For professional contexts, consider using:</p>
        <ul>
          <li>Blue: Trust, reliability, professionalism</li>
          <li>Gray: Sophistication, neutrality</li>
          <li>Green: Growth, harmony, freshness</li>
        </ul>
        
        <h2>3. Ensure Scalability</h2>
        <p>Your avatar should look good at all sizes, from tiny social media profile pictures to larger website headers. Test your design at different scales.</p>
        
        <h2>4. Consider Your Audience</h2>
        <p>Think about who will be seeing your avatar. A tech startup might opt for a modern, minimalist design, while a creative agency might choose something more artistic.</p>
        
        <h2>5. Use Consistent Typography</h2>
        <p>If your avatar includes text, use fonts that align with your brand identity and are readable at small sizes.</p>
        
        <h2>Conclusion</h2>
        <p>Creating a professional avatar takes thought and planning, but the investment is worth it. A great avatar can help you stand out and make a lasting impression.</p>
      `,
      author: {
        name: 'Alex Chen',
        avatar: '/images/authors/alex-chen.jpg',
        bio: 'UI/UX Designer with 8+ years of experience in brand identity',
      },
      publishedAt: '2025-01-10T10:00:00Z',
      updatedAt: '2025-01-10T10:00:00Z',
      readingTime: 5,
      tags: ['design', 'branding', 'tips'],
      category: 'design',
      featuredImage: '/images/blog/professional-avatar-tips.jpg',
      seo: {
        metaTitle:
          '10 Essential Tips for Creating Professional Avatar Designs | Avatify Blog',
        metaDescription:
          'Learn the fundamental principles of creating avatars that look professional and memorable. Essential tips for designers and brands.',
        keywords: [
          'avatar design',
          'professional design',
          'branding',
          'design tips',
        ],
        ogImage: '/images/blog/professional-avatar-tips-og.jpg',
      },
      featured: true,
      published: true,
    },
    {
      id: '2',
      title: 'The Psychology of Colors in Avatar Design',
      slug: 'psychology-of-colors-avatar-design',
      excerpt:
        'Discover how different colors affect perception and how to choose the right color palette for your avatar to convey the right message.',
      content: `
        <h2>Understanding Color Psychology</h2>
        <p>Colors have a profound psychological impact on how people perceive and interact with visual content. In avatar design, color choices can significantly influence first impressions.</p>
        
        <h2>Warm Colors: Energy and Warmth</h2>
        <p>Warm colors like red, orange, and yellow tend to evoke feelings of energy, enthusiasm, and approachability.</p>
        
        <h2>Cool Colors: Trust and Professionalism</h2>
        <p>Cool colors such as blue, green, and purple often convey trust, calmness, and professionalism.</p>
        
        <h2>Neutral Colors: Sophistication and Balance</h2>
        <p>Grays, blacks, and whites provide sophistication and can serve as excellent bases for other accent colors.</p>
        
        <h2>Cultural Considerations</h2>
        <p>Remember that color meanings can vary across cultures. What represents good luck in one culture might have negative connotations in another.</p>
      `,
      author: {
        name: 'Sarah Johnson',
        avatar: '/images/authors/sarah-johnson.jpg',
        bio: 'Color specialist and brand consultant',
      },
      publishedAt: '2025-01-08T14:00:00Z',
      updatedAt: '2025-01-08T14:00:00Z',
      readingTime: 6,
      tags: ['color', 'psychology', 'design'],
      category: 'design',
      featuredImage: '/images/blog/color-psychology.jpg',
      seo: {
        metaTitle: 'The Psychology of Colors in Avatar Design | Avatify Blog',
        metaDescription:
          'Learn how colors affect perception and choose the right palette for your avatar. Complete guide to color psychology in design.',
        keywords: [
          'color psychology',
          'avatar colors',
          'design psychology',
          'color theory',
        ],
        ogImage: '/images/blog/color-psychology-og.jpg',
      },
      featured: true,
      published: true,
    },
    {
      id: '3',
      title: "Avatar Trends 2025: What's Hot in Digital Identity",
      slug: 'avatar-trends-2025',
      excerpt:
        'Explore the latest trends in avatar design for 2025, from minimalist approaches to interactive elements that are shaping digital identity.',
      content: `
        <h2>The Evolution of Digital Identity</h2>
        <p>As we move through 2025, avatar design continues to evolve, reflecting changes in technology, social media, and digital communication.</p>
        
        <h2>Trend 1: Minimalist Hand-Drawn Style</h2>
        <p>Clean, simple designs that feel personal and approachable are dominating the avatar space.</p>
        
        <h2>Trend 2: Inclusive Design</h2>
        <p>Avatars that represent diverse backgrounds, abilities, and identities are becoming standard.</p>
        
        <h2>Trend 3: Adaptive Avatars</h2>
        <p>Avatars that change based on context or mood are gaining popularity in professional settings.</p>
      `,
      author: {
        name: 'Mike Rodriguez',
        avatar: '/images/authors/mike-rodriguez.jpg',
        bio: 'Digital trends analyst and design researcher',
      },
      publishedAt: '2025-01-05T09:00:00Z',
      updatedAt: '2025-01-05T09:00:00Z',
      readingTime: 4,
      tags: ['trends', '2025', 'digital-identity'],
      category: 'trends',
      featuredImage: '/images/blog/avatar-trends-2025.jpg',
      seo: {
        metaTitle:
          "Avatar Trends 2025: What's Hot in Digital Identity | Avatify Blog",
        metaDescription:
          "Discover the latest avatar design trends for 2025. From minimalist styles to inclusive design, see what's shaping digital identity.",
        keywords: [
          'avatar trends 2025',
          'digital identity trends',
          'avatar design trends',
          'design trends',
        ],
        ogImage: '/images/blog/avatar-trends-2025-og.jpg',
      },
      featured: false,
      published: true,
    },
  ],
  zh: [
    {
      id: '1',
      title: '创建专业头像设计的10个关键技巧',
      slug: 'professional-avatar-design-tips',
      excerpt: '学习创建专业且令人难忘的头像的基本原则，适用于品牌或个人使用。',
      content: `
        <h2>为什么专业头像设计很重要</h2>
        <p>您的头像往往是人们对您或您的品牌在线的第一印象。设计良好的头像能够在几秒钟内传达专业性、个性和可信度。</p>
        
        <h2>1. 保持简洁明了</h2>
        <p>最好的头像简洁且在小尺寸下易于识别。避免过于繁杂的设计，包含太多细节在缩小时会变得不清楚。</p>
        
        <h2>2. 选择合适的颜色</h2>
        <p>颜色传达情感和联想。对于专业场合，考虑使用：</p>
        <ul>
          <li>蓝色：信任、可靠、专业</li>
          <li>灰色：精致、中性</li>
          <li>绿色：成长、和谐、清新</li>
        </ul>
        
        <h2>3. 确保可扩展性</h2>
        <p>您的头像应该在所有尺寸下都看起来不错，从微小的社交媒体头像到较大的网站标题。在不同比例下测试您的设计。</p>
        
        <h2>4. 考虑您的受众</h2>
        <p>考虑谁会看到您的头像。科技初创公司可能选择现代简约的设计，而创意机构可能选择更具艺术性的东西。</p>
        
        <h2>5. 使用一致的字体</h2>
        <p>如果您的头像包含文本，请使用与您的品牌标识一致且在小尺寸下可读的字体。</p>
        
        <h2>结论</h2>
        <p>创建专业头像需要思考和规划，但这项投资是值得的。出色的头像可以帮助您脱颖而出并留下持久印象。</p>
      `,
      author: {
        name: '陈亚历',
        avatar: '/images/authors/alex-chen.jpg',
        bio: '拥有8年以上品牌标识经验的UI/UX设计师',
      },
      publishedAt: '2025-01-10T10:00:00Z',
      updatedAt: '2025-01-10T10:00:00Z',
      readingTime: 5,
      tags: ['设计', '品牌', '技巧'],
      category: '设计',
      featuredImage: '/images/blog/professional-avatar-tips.jpg',
      seo: {
        metaTitle: '创建专业头像设计的10个关键技巧 | Avatify博客',
        metaDescription:
          '学习创建专业且令人难忘的头像的基本原则。设计师和品牌的必备技巧。',
        keywords: ['头像设计', '专业设计', '品牌设计', '设计技巧'],
        ogImage: '/images/blog/professional-avatar-tips-og.jpg',
      },
      featured: true,
      published: true,
    },
  ],
};

export async function getBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
  const posts = blogPosts[locale] || blogPosts.en;
  return posts
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getFeaturedPosts(
  locale: string = 'en',
): Promise<BlogPost[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.featured);
}

export async function getBlogPost(
  slug: string,
  locale: string = 'en',
): Promise<BlogPost | null> {
  const posts = blogPosts[locale] || blogPosts.en;
  return posts.find((post) => post.slug === slug && post.published) || null;
}

export async function getRelatedPosts(
  currentPost: BlogPost,
  locale: string = 'en',
): Promise<BlogPost[]> {
  const posts = await getBlogPosts(locale);
  return posts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag))),
    )
    .slice(0, 2);
}

export async function getBlogCategories(
  locale: string = 'en',
): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  return [...new Set(posts.map((post) => post.category))];
}
