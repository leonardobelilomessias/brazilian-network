"use client";

import { Separator } from "@/components/ui/separator";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Comment } from '../types/comment';

interface CommentSectionProps {
  comments: Comment[];
  tipId: string;
  currentUserId?: string;
}

export function CommentSection({ comments, tipId, currentUserId }: CommentSectionProps) {

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comentários</h2>
      <Separator />
      <CommentForm tipId={tipId} />
      <CommentList comments={comments} currentUserId={currentUserId} />
    </div>
  );
}