import React from 'react';
import Image from 'next/image';
import { fetchTips } from './queries/queriesTips';
import { formatDate } from '@/app/util/FormatDate';
import { TipsSection } from './TipsSections';
import { createClient } from '@/utils/supabase/server';
import { Tip } from './types';
import { Clock, Clock2, Sparkles } from 'lucide-react';
import { SelectGroup } from './SelectTips';
import { Separator } from '@radix-ui/react-dropdown-menu';

export async function TipsScreen() {
  const supabase = await createClient()
  const data = await fetchTips()

  const user = await supabase.auth.getUser()
  const tips = data as Tip[]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className='text-2xl font-bold'>Dicas</h1>
      <p className='text-sm text-gray-500 '>Encontre e  crie dicas sobre paises que você imigrou ou pretende imigrar.</p>
      <Separator className='h-2'/>
      <SelectGroup />
      <TipsSection data={{tips:tips, userId:user.data.user?.id}} title='Dicas em Destaque' iconTitle={Sparkles} />
      <TipsSection data={{tips:tips, userId:user.data.user?.id}} title='Últimas dicas' iconTitle={Clock2} />
    </div>
  );
};

