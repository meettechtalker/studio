import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Post } from '@/lib/definitions';

export function LikeDislikeBadge({ sentiment, className }: { sentiment: Post['sentiment'], className?: string }) {
  if (sentiment === 'like') {
    return (
      <Badge className={cn("border-transparent bg-success text-success-foreground hover:bg-success/80", className)}>
        <ThumbsUp className="h-3 w-3 mr-1" />
        Like
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className={cn(className)}>
      <ThumbsDown className="h-3 w-3 mr-1" />
      Dislike
    </Badge>
  );
}
