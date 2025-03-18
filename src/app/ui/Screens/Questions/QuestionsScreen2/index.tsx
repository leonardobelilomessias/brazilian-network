
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Plus, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Tip, TipsFull } from '@/app/types/TypesDB';
import { fetchTips } from '@/lib/supabase/queries/server/Tips';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AllQuestions } from './AllQuestions';
import { EmptyContainerGeneric } from '@/app/ui/components/Empty/EmptyContainerGeneric';
import { getQuestions } from '@/lib/supabase/queries/Questions';

export async function QuestionsScreen2() {
  const supabase = await createClient()
  // const respTips = await getQuestions()

  const {data:{user}}= await supabase.auth.getUser()

  // const questions = respTips as TipsFull[]

  return (
    <div className=" container mx-auto max-w-5xl py-8 px-2">
      <div className='flex justify-between'>
        <div className='mb-4'>
            <h1 className='text-2xl font-bold'>Dicas</h1>
            <p className='text-sm text-gray-500 '>Encontre e  crie dicas sobre paises que você imigrou ou pretende imigrar.</p>
        </div>
        <Link href={'/perguntas/criar-pergunta'} className='flex align-bottom gap-2 self-start md:self-end'>
          <Button size={'sm'} className='bg-blue-500 max-w-xs'><Plus size={14}/><p className='text-xs'>Criar Pergunta</p></Button>
        </Link>
      </div>
      
      <Separator className='h-2'/>
      {/* <SelectGroup /> */}
  
        <AllQuestions   />
      

    </div>

  );
  
    

};

