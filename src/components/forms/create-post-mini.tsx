import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PenSquare } from 'lucide-react';

export function CreatePostMini() {
  const avatar = PlaceHolderImages.find(img => img.id === 'current-user-avatar');

  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar className="hidden h-10 w-10 sm:flex">
          <AvatarImage src={avatar?.imageUrl} alt="@you" data-ai-hint={avatar?.imageHint} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Link href="/create" className="flex-1">
          <div className="w-full text-left p-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer text-muted-foreground">
            What's on your mind?
          </div>
        </Link>
        <Link href="/create" passHref>
          <Button size="icon" variant="ghost">
            <PenSquare className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
