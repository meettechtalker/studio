import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageCircle, MoreHorizontal, Repeat, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import type { Post } from '@/lib/definitions';
import { LikeDislikeBadge } from './like-dislike-badge';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Link href={`/profile/${post.user.username}`}>
          <Avatar>
            <AvatarImage src={post.user.avatar.imageUrl} alt={`@${post.user.username}`} data-ai-hint={post.user.avatar.imageHint} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <CardTitle className="text-base font-bold font-headline leading-none">
            <Link href={`/profile/${post.user.username}`} className="hover:underline">{post.user.name}</Link>
          </CardTitle>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Link href={`/profile/${post.user.username}`}>@{post.user.username}</Link>
            <span>&middot;</span>
            <time dateTime={post.createdAt}>{post.createdAt}</time>
          </div>
        </div>
        <LikeDislikeBadge sentiment={post.sentiment} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Follow @{post.user.username}</DropdownMenuItem>
            <DropdownMenuItem>View Post</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <div className="mt-4 rounded-lg border overflow-hidden aspect-video relative">
            <Image
              src={post.image.imageUrl}
              alt={post.image.description}
              data-ai-hint={post.image.imageHint}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline"># {tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex gap-4 text-muted-foreground">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-primary">
                <ThumbsUp className="w-4 h-4" /> <span>{post.likesCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-primary">
                <MessageCircle className="w-4 h-4" /> <span>{post.commentsCount}</span>
            </Button>
        </div>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary">
                <Repeat className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary">
                <Share2 className="w-4 h-4" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
