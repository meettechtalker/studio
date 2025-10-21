import { getPostsByUsername, getUserByUsername } from "@/lib/data";
import { ProfileHeader } from "@/components/profile/profile-header";
import { PostCard } from "@/components/feed/post-card";
import { notFound } from "next/navigation";

type ProfilePageProps = {
    params: {
        username: string;
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const [user, posts] = await Promise.all([
        getUserByUsername(params.username),
        getPostsByUsername(params.username)
    ]);
    
    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto w-full space-y-8">
            <ProfileHeader user={user} />
            <div className="space-y-4">
                <h2 className="text-2xl font-headline font-bold">Posts</h2>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
                {posts.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">No posts yet.</p>
                        <p className="text-sm text-muted-foreground">{user.name} hasn't shared any preferences.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
