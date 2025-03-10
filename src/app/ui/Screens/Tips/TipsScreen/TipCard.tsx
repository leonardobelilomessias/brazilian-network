import React, { use } from 'react';
import Image from 'next/image';
import { formatDate } from '@/app/util/FormatDate';
import { Tip } from './types';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Calendar, Menu, EllipsisVertical, EllipsisIcon, Edit2, Trash } from "lucide-react";
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownCard } from './DropDownCard';
import AvatarDefault from '@/app/public/images/profile/default/avatar-default.jpg';
interface TipCardProps {
  tip: Tip;
  userId: string | undefined;
}

export function TipCard({ tip,userId }: TipCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-0 pb-2  flex flex-row justify-between ">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
        <Image 
          width={500} 
          height={500} 
          className='object-cover relative w-full h-full' 
          src={tip.created_by.avatar_url ? tip.created_by.avatar_url : AvatarDefault} 
          alt={tip.created_by.name} 
        />
      
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-xs">{tip.created_by.name}</span>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{formatDate(tip.created_at).extendTime}</span>
              </div>
            </div>
          </div>
              { userId === tip.created_by.id && 

          <div>
            <DropdownCard tipId={tip.id}  />
          </div>
          }
        </CardHeader>
        <Link href={`/dica/${tip.id}`}>

        <CardContent className="">
          {tip.image_url && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={tip.image_url}
                alt={tip.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <h3 className="text-md font-semibold">
            {tip.title}
          </h3>

          <p className="text-muted-foreground line-clamp-3">
          
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {tip.theme_id.name}
            </Badge>
            <Badge variant="secondary">
              {tip.country_id.name}
            </Badge>
          </div>
          <div className="flex items-center text-blue-500">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-sm">{tip.likes_count}</span>
          </div>
        </CardFooter>
    </Link>
      </Card>
  );
}


// export function DropdownCard() {
//   return (
//     <DropdownMenu  >
//       <DropdownMenuTrigger asChild >
//         <Button variant="outline" ><EllipsisVertical/></Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-44">

//         <DropdownMenuItem className='flex items-center gap-2'>
//           <Edit2 size={14}/>
//           <span>Editar</span>
//         </DropdownMenuItem>

//         <DropdownMenuItem className='flex items-center gap-2'>
//           <div className='flex items-center gap-2' >
//           <Trash size={14}/>
//           <span>Excluir</span>
//           </div>
//         </DropdownMenuItem>

//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

