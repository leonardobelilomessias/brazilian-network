import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { TipContent } from './components/TipContent';
import { QuestionFooter } from './components/QuestionFooter';
import { CommentSection } from './components/CommentSection';
import { createClient } from '@/utils/supabase/server';
import { getQuestionById } from '@/lib/supabase/queries/server/questions/getQuestionById';
import { QuestionHeader } from './components/QuestionHeader';

interface TipScreenProps {
  questionId: string;
}

export async function QuestionScreen({ questionId }: TipScreenProps) {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()
  const currentUserId = data.user?.id
  console.log('currentUserId em TipScreen', currentUserId)
  
  const question = await getQuestionById(questionId);

  if (!question) return (
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
          <QuestionHeader 
            avatarUrl={question.profile.avatar_url}
            userName={question.profile.full_name}
            createdAt={question.created_at}
            countryName={question.country.name}
          />
        </CardHeader>

        <CardContent>
          <TipContent 
            imageUrl={question.image_url}
            title={question.title}
            content={question.content}
            themeName={question.theme.name}
            countryName={question.country.name}
          />
        </CardContent>

        <CardFooter>
          <QuestionFooter 
            questionId={questionId }
            currentUserId={currentUserId}
            likesCount={question.likes_count}
            commentsCount={question.comments.length || 0}
          />
        </CardFooter>
      </Card>

      <CommentSection 
        currentUserId={currentUserId}
        comments={question.comments} 
        questionId={questionId}
        commentsCount={question.comments.length || 0}
      />
    </div>
  );
}
