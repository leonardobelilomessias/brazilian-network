import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from '@/app/util/FormatDate';
import { Comment } from '../types/comment';
import { DeleteCommentButton } from './DeleteCommentButton';

interface CommentListProps {
  comments: Comment[];
  currentUserId?: string;
}

export function CommentList({ comments, currentUserId }: CommentListProps) {
 console.log('currentUserId', currentUserId, comments)
    return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-blue-500 text-white">
                  {comment.users.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{comment.users.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(comment.created_at).extendTime}
                </span>
              </div>
            </div>
            <DeleteCommentButton 
              commentId={comment.id}
              userId={comment.users.id}
              currentUserId={currentUserId}
            />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 