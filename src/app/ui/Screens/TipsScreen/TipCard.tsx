import React from 'react';
import Image from 'next/image';
import { formatDate } from '@/app/util/FormatDate';
import { Tip } from './types';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Calendar } from "lucide-react";
import Link from 'next/link';

interface TipCardProps {
  tip: Tip;
}

export function TipCard({ tip }: TipCardProps) {
  return (
    <Link href={`/dica/${tip.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-blue-500 text-white">
                {tip.created_by.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{tip.created_by.name}</span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{formatDate(tip.created_at).extendTime}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
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

          <h3 className="text-xl font-semibold">
            {tip.title}
          </h3>

          <p className="text-muted-foreground line-clamp-3">
            {tip.content}
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
      </Card>
    </Link>
  );
}