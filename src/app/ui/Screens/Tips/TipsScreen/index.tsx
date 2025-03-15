
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Plus, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Tip, TipsFull } from '@/app/types/TypesDB';
import { fetchTips } from '@/lib/supabase/queries/server/Tips';
import { EmptyContainer } from '../EmptyTipsContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AllTips } from './AllTips';

export async function TipsScreen() {
  const supabase = await createClient()
  const respTips = await fetchTips()

  const {data:{user}}= await supabase.auth.getUser()

  const tips = respTips as TipsFull[]

  return (
    <div className=" container mx-auto max-w-5xl py-8 px-2">
      <div className='flex justify-between'>
        <div>
            <h1 className='text-2xl font-bold'>Dicas</h1>
            <p className='text-sm text-gray-500 '>Encontre e  crie dicas sobre paises que você imigrou ou pretende imigrar.</p>
        </div>
        <Link href={'dicas/criar-dica'} className='flex align-bottom gap-2 self-start md:self-end'>
          <Button size={'sm'} className='bg-blue-500 max-w-xs'><Plus size={14}/><p className='text-xs'>Criar dicar</p></Button>
        </Link>
      </div>
      
      <Separator className='h-2'/>
      {/* <SelectGroup /> */}
      {
        tips.length === 0 ? 
        <EmptyContainer title='Dicas em Destaque' iconTitle={Sparkles} />
        :
        <AllTips   />
      }

    </div>

  );
  
    

};

