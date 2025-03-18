import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { formatDate } from '@/app/util/FormatDate';
import ImageDefault from '@/app/public/images/profile/default/avatar-default.jpg' 
import Image from 'next/image';
interface TipHeaderProps {
  userName: string;
  createdAt: string;
  countryName: string;
  avatarUrl: string;
}

export function QuestionHeader({ userName, createdAt, countryName, avatarUrl }: TipHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
      <Avatar className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image width={40} height={10} className="rounded-full"  style={{objectFit:"cover"}} src={avatarUrl || ImageDefault} alt={`${userName}'s avatar`} /> 
      
         
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="font-medium text-base text-foreground">{userName}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{formatDate(createdAt).extendTime}</span>
          </div>
        </div>
      </div>
      <div className="rounded border border-blue-500 px-3 py-1">
        <span className="text-blue-500 text-sm">{countryName}</span>
      </div>
    </div>
  );
} 