import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { formatDate } from '@/app/util/FormatDate';

interface TipHeaderProps {
  userName: string;
  createdAt: string;
  countryName: string;
}

export function TipHeader({ userName, createdAt, countryName }: TipHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarFallback className="bg-blue-500 text-white">
            {userName[0].toUpperCase()}
          </AvatarFallback>
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