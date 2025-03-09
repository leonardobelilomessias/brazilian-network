import React from 'react';
import { getTipById } from '@/lib/supabase/queries/Tips';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { TipHeader } from './components/TipHeader';
import { TipContent } from './components/TipContent';
import { TipFooter } from './components/TipFooter';
import { CommentSection } from './components/CommentSection';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

interface TipScreenProps {
  tipId: string;
}

export async function TipScreen({ tipId }: TipScreenProps) {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()
  const currentUserId = data.user?.id
    console.log('currentUserId em TipScreen', currentUserId)
  const tip = await getTipById(tipId);

  if (!tip) return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="text-center p-8">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700">Ops! Dica não encontrada</h2>
          <p className="text-gray-500">Desculpe, não conseguimos encontrar a dica que você está procurando.</p>
          <div className="text-6xl">😕</div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <Card>
        <CardHeader className="space-y-0 pb-4">
          <TipHeader 
            userName={tip.users.name}
            createdAt={tip.created_at}
            countryName={tip.countries.name}
          />
        </CardHeader>

        <CardContent>
          <TipContent 
            imageUrl={tip.image_url}
            title={tip.title}
            content={tip.content}
            themeName={tip.themes.name}
            countryName={tip.countries.name}
          />
        </CardContent>

        <CardFooter>
          <TipFooter 
            likesCount={tip.likes_count}
            commentsCount={tip.comments?.length || 0}
          />
        </CardFooter>
      </Card>

      <CommentSection 
        currentUserId={currentUserId}
        comments={tip.comments || []} 
        tipId={tipId}
      />
    </div>
  );
}
