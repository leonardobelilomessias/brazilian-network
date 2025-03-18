'use client'
import { TipsFull } from '@/app/types/TypesDB';
import { fetchTipsPagination, fetchTipsPaginationWithSelect } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Loader2, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useUserData } from '@/context/ContextUserAccont';
import SectionContainer from '@/app/ui/components/Containers/SectionContainer';
import CardTipsContainer from '@/app/ui/components/Containers/CardsTipsContainer';
import { TipCard } from '@/app/ui/components/TipCard';
import { GenericPagination } from '@/app/ui/components/Pagination/GenericPagination';
import { SelectGroupTips } from './SelectTips';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import useSWR, { mutate } from 'swr';
import { useSelectStoreContryTips, useSelectStoreThemeTips } from './stores/selectStore';
import { EmptyTips } from '@/app/ui/components/Tips/EmptyTyps';

const fetcherTips = async ([page, limit, selectedValueThemeTips, selectedValueCountryTips]: [number, number, string, string]) => {
  console.log('buscando dicas ....')
  const result = await fetchTipsPaginationWithSelect(page, limit, selectedValueThemeTips, selectedValueCountryTips,);
  console.log(result)
  return result;
};

export function AllTips() {
  const { selectedValueThemeTips, setSelectedValueThemeTips } = useSelectStoreThemeTips();
  const { selectedValueCountryTips } = useSelectStoreContryTips();


  const [user, setUser] = useState<User | null>()
  const { dataUser } = useUserData();
  const [currentPageTips, setCurrentPage] = useState(1);
  const limitTips = 5;
  function onDeleteTip() {
    mutate([currentPageTips, limitTips, selectedValueThemeTips, selectedValueCountryTips])
  }
  // Configuração do SWR
  const { data, error, isLoading } = useSWR(
    [currentPageTips, limitTips, selectedValueThemeTips, selectedValueCountryTips],
    fetcherTips,
    {
      revalidateOnFocus: true,
      // keepPreviousData: true,
    }
  );
  async function getDatauser() {

    const { data: { user } } = await supabaseClient().auth.getUser()
    setUser(user)
  }

  // Função para carregar as dicas


  // Carrega as dicas ao mudar a página
  useEffect(() => {
    getDatauser()
  }, [currentPageTips]);



  return (
    <SectionContainer IconTitle={Timer} title='Últimas Dicas' className=''>
      <SelectGroupTips />

      <CardTipsContainer>
        {

          isLoading ?
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div> :
            data?.tips?.map((tipFull) => (
              <TipCard onDelete={onDeleteTip} currentUser={user?.id || ''} key={tipFull.id} tipFull={tipFull} />
            ))
        }
        {
          (!data?.tips?.length && !isLoading) && <EmptyTips />
        }
      </CardTipsContainer>
      <GenericPagination
        currentPage={currentPageTips}
        totalPages={data?.totalPages as number}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </SectionContainer>
  );
}




