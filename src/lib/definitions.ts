import type { ImagePlaceholder } from './placeholder-images';

export type User = {
  id: string;
  username: string;
  name: string;
  avatar: ImagePlaceholder;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

export type Post = {
  id: string;
  userId: string;
  sentiment: 'like' | 'dislike';
  content: string;
  image?: ImagePlaceholder;
  category: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  user: User;
};

export type Follow = {
  followerId: string;
  followingId: string;
};
