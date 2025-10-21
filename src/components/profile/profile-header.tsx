import type { User } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/data";

type ProfileHeaderProps = {
    user: User;
}

export async function ProfileHeader({ user }: ProfileHeaderProps) {
    const currentUser = await getCurrentUser();
    const isCurrentUser = currentUser.id === user.id;

    const stats = [
        { name: 'Posts', value: user.postsCount },
        { name: 'Followers', value: user.followersCount },
        { name: 'Following', value: user.followingCount },
    ]

    return (
        <div className="w-full">
            <div className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <Avatar className="w-24 h-24 text-3xl border-4 border-background ring-2 ring-primary">
                        <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
                                <p className="text-muted-foreground">@{user.username}</p>
                            </div>
                            {isCurrentUser ? (
                                <Button variant="outline" className="mt-4 sm:mt-0">Edit Profile</Button>
                            ) : (
                                <Button className="mt-4 sm:mt-0">Follow</Button>
                            )}
                        </div>
                        <p className="mt-4 text-center sm:text-left max-w-lg">{user.bio}</p>
                        <div className="mt-6 flex justify-center sm:justify-start gap-6 text-sm">
                            {stats.map(stat => (
                                <div key={stat.name} className="text-center">
                                    <p className="font-bold text-lg">{stat.value}</p>
                                    <p className="text-muted-foreground">{stat.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
