import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle, SquarePlus } from "lucide-react";
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { QuestionCard } from './QuestionCard';
import { IQuestion } from '@/app/types/TypesDB';

interface QuestionsSectionProps {
  questions: IQuestion[];
  isLoading: boolean;
}

export const QuestionsSection: FC<QuestionsSectionProps> = ({ questions, isLoading }) => {
  if (isLoading) {
    return <div>Carregando perguntas...</div>;
  }

  return (
    <section className="container max-w-4xl mx-auto py-8 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HelpCircle size={24} className="text-blue-500" />
          <h2 className="text-2xl font-bold">Perguntas da Comunidade</h2>
        </div>
        <Link href="/perguntas/criar">
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            Fazer Pergunta
            <SquarePlus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />

      {!questions ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhuma pergunta encontrada</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {questions?.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </section>
  );
}; 