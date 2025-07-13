import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: MDXRemoteSerializeResult;
  rawContent?: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: number; // in minutes
  tags: string[];
  category: string;
  featuredImage: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  featured: boolean;
  published: boolean;
}

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  featuredImage: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  featured?: boolean;
  published?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  count: number;
}