import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface TipFooterProps {
  likesCount: number;
  commentsCount: number;
}

export function TipFooter({ likesCount, commentsCount }: TipFooterProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="flex items-center gap-2">
        <ThumbsUp className="h-4 w-4" />
        <span>{likesCount}</span>
      </Button>
      <Button variant="ghost" className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        <span>{commentsCount}</span>
      </Button>
    </div>
  );
} 