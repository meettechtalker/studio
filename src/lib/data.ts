import { Post, User } from './definitions';
import { PlaceHolderImages } from './placeholder-images';
import { formatDistanceToNow } from 'date-fns';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id ${id} not found.`);
  }
  return image;
};

const users: User[] = [
  {
    id: '1',
    username: 'alexdoe',
    name: 'Alex Doe',
    avatar: findImage('user-avatar-1'),
    bio: 'Lover of sunsets and good food. Tech enthusiast. Sharing my takes on life.',
    postsCount: 2,
    followersCount: 120,
    followingCount: 75,
  },
  {
    id: '2',
    username: 'janesmith',
    name: 'Jane Smith',
    avatar: findImage('user-avatar-2'),
    bio: 'Pizza connoisseur and architect. Sometimes I build things.',
    postsCount: 1,
    followersCount: 250,
    followingCount: 100,
  },
  {
    id: '3',
    username: 'samwilson',
    name: 'Sam Wilson',
    avatar: findImage('user-avatar-3'),
    bio: 'Just a guy with opinions on movies and a soft spot for cats.',
    postsCount: 1,
    followersCount: 500,
    followingCount: 50,
  },
  {
    id: '4',
    username: 'caseylee',
    name: 'Casey Lee',
    avatar: findImage('user-avatar-4'),
    bio: 'Exploring the world one hike at a time.',
    postsCount: 0,
    followersCount: 300,
    followingCount: 150,
  },
];

const posts: Omit<Post, 'user'>[] = [
  {
    id: 'p1',
    userId: '1',
    sentiment: 'like',
    content: 'There is nothing quite like a sunset over the ocean. The colors are always so breathtaking. It reminds you to appreciate the small moments of beauty in life.',
    image: findImage('post-image-1'),
    category: 'Nature',
    tags: ['sunset', 'ocean', 'travel', 'beauty'],
    likesCount: 15,
    commentsCount: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'p2',
    userId: '2',
    sentiment: 'like',
    content: 'I could eat pizza every day. This one with fresh basil and mozzarella was just *chef\'s kiss*. The crust was perfectly crispy.',
    image: findImage('post-image-2'),
    category: 'Food',
    tags: ['pizza', 'italian', 'foodie'],
    likesCount: 42,
    commentsCount: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'p3',
    userId: '1',
    sentiment: 'dislike',
    content: 'Hot take: modern architecture is often cold and soulless. Give me a classic design with character any day over these glass boxes.',
    image: findImage('post-image-3'),
    category: 'Architecture',
    tags: ['opinion', 'design', 'rant'],
    likesCount: 5,
    commentsCount: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'p4',
    userId: '3',
    sentiment: 'like',
    content: 'My cat has the right idea. Nap all day, worry about nothing. We should all be more like cats.',
    image: findImage('post-image-4'),
    category: 'Life',
    tags: ['cats', 'humor', 'relax'],
    likesCount: 112,
    commentsCount: 23,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

// In a real app, this would be the logged-in user's ID
const CURRENT_USER_ID = '0'; 

const currentUser: User = {
    id: CURRENT_USER_ID,
    username: 'you',
    name: 'Your Name',
    avatar: findImage('current-user-avatar'),
    bio: 'This is your profile! Tell everyone a bit about yourself.',
    postsCount: 0,
    followersCount: 0,
    followingCount: 4,
};


const follows = [
    { followerId: CURRENT_USER_ID, followingId: '1' },
    { followerId: CURRENT_USER_ID, followingId: '2' },
    { followerId: CURRENT_USER_ID, followingId: '3' },
    { followerId: CURRENT_USER_ID, followingId: '4' },
];

const hydratePost = (post: Omit<Post, 'user'>): Post => {
  const user = users.find((u) => u.id === post.userId);
  if (!user) throw new Error(`User with id ${post.userId} not found for post ${post.id}`);
  return {
    ...post,
    createdAt: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    user,
  };
};

export async function getCurrentUser(): Promise<User> {
  await new Promise(res => setTimeout(res, 50));
  return currentUser;
}

export async function getFeedPosts(): Promise<Post[]> {
  await new Promise(res => setTimeout(res, 200));
  const followedUserIds = follows.filter(f => f.followerId === currentUser.id).map(f => f.followingId);
  return posts
    .filter(p => followedUserIds.includes(p.userId))
    .map(hydratePost)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPostsByUsername(username: string): Promise<Post[]> {
    await new Promise(res => setTimeout(res, 200));
    const user = users.find(u => u.username === username);
    if (!user) return [];
    return posts
      .filter(p => p.userId === user.id)
      .map(hydratePost)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
    await new Promise(res => setTimeout(res, 50));
    if (username === currentUser.username) return currentUser;
    return users.find(u => u.username === username);
}

export async function searchUsers(query: string): Promise<User[]> {
    await new Promise(res => setTimeout(res, 150));
    if (!query) return users.filter(u => u.id !== currentUser.id);
    return users.filter(u => u.id !== currentUser.id && (u.name.toLowerCase().includes(query.toLowerCase()) || u.username.toLowerCase().includes(query.toLowerCase())));
}
