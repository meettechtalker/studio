import { PostCard } from '@/components/feed/post-card';
import { CreatePostMini } from '@/components/forms/create-post-mini';
import { getFeedPosts } from '@/lib/data';

export default async function HomePage() {
  const posts = await getFeedPosts();

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <header className="flex items-center justify-between">
         <h1 className="text-3xl font-headline font-bold">Home</h1>
      </header>
      <CreatePostMini />
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Your feed is empty.</p>
                <p className="text-sm text-muted-foreground">Follow some people to see their posts here!</p>
            </div>
        )}
      </div>
    </div>
  );
}
