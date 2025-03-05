import React from 'react';
import { fetchTips } from './queries/queriesTips';
import { TipCard } from './TipCard';
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tip } from './types';

interface TipsSectionProps {
  data: Tip[];
}

export const TipsSection: React.FC<TipsSectionProps> = ({ data }) => {
  const tips = data as Tip[]

  return (
    <section className="container max-w-4xl mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={40} className=" text-blue-500" />
          <h2 className="text-2xl font-bold text-blue-500">
            Dicas em Destaque
          </h2>
        </div>
        
        <Button variant="default" className='bg-blue-500' size="sm">
          Criar nova Dica
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6">
        {tips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </section>
  );
};

