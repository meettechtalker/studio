import Link from "next/link";
import type { User } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type UserCardProps = {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    return (
        <Card className="text-center">
            <CardHeader className="p-4">
                <Link href={`/profile/${user.username}`} className="mx-auto">
                    <Avatar className="w-20 h-20 text-2xl mx-auto">
                        <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <Link href={`/profile/${user.username}`}>
                    <h3 className="font-bold font-headline hover:underline">{user.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full">Follow</Button>
            </CardFooter>
        </Card>
    );
}
