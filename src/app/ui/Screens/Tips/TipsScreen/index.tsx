
import React from 'react';
import { TipsSection } from './TipsSections';
import { createClient } from '@/utils/supabase/server';
import { Clock, Clock2, Lightbulb, Plus, Sparkles } from 'lucide-react';
import { SelectGroup } from './SelectTips';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Tip, TipsFull } from '@/app/types/TypesDB';
import { fetchTips } from '@/lib/supabase/queries/server/Tips';
import { EmptyContainer } from '../EmptyTipsContainer';
import GenericTipList from '@/app/ui/components/GenericListTips';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ListTipsWithPagination from '@/app/ui/components/ListTipsWithPagination';

export async function TipsScreen() {
  const supabase = await createClient()
  const respTips = await fetchTips()

  const {data:{user}}= await supabase.auth.getUser()

  const tips = respTips as TipsFull[]

  return (
    <div className=" container mx-auto max-w-5xl py-8 px-2">
      <div className='flex gap-8'>
        <div>
            <h1 className='text-2xl font-bold'>Dicas</h1>
            <p className='text-sm text-gray-500 '>Encontre e  crie dicas sobre paises que você imigrou ou pretende imigrar.</p>
        </div>
        <Link href={'dicas/criar-dica'} className='flex align-bottom gap-2 self-start md:self-end'>
          <Button size={'sm'} className='bg-blue-500 max-w-xs'><Plus size={14}/><p className='text-xs'>Criar dicar</p></Button>
        </Link>
      </div>
      
      <Separator className='h-2'/>
      <SelectGroup />
      {
        tips.length === 0 ? 
        <EmptyContainer title='Dicas em Destaque' iconTitle={Sparkles} />
        :
        <ListTipsWithPagination  items={{ icon:Lightbulb, linkButton:"/dicas", title:"Todas Dicas",tips:tips, userId:user?.id, hasButton:false }} />
      }

    </div>

  );
  
    

};

