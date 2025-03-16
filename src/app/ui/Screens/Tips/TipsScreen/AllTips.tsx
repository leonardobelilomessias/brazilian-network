'use client'
import { TipsFull } from '@/app/types/TypesDB';
import { fetchTipsPagination, fetchTipsPaginationWithSelect } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useUserData } from '@/context/ContextUserAccont';
import SectionContainer from '@/app/ui/components/Containers/SectionContainer';
import CardTipsContainer from '@/app/ui/components/Containers/CardsTipsContainer';
import { TipCard } from '@/app/ui/components/TipCard';
import { GenericPagination } from '@/app/ui/components/Pagination/GenericPagination';
import { SelectGroup } from './SelectTips';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import useSWR, {mutate} from 'swr';
import { useSelectStoreContry, useSelectStoreTheme } from './stores/selectStore';

const fetcher = async ([page, limit,selectedValueTheme,selectedValueCountry]: [number, number,string,string]) => {
    console.log('buscando ....')
  const result = await fetchTipsPaginationWithSelect(page, limit,selectedValueTheme,selectedValueCountry,);
  console.log(result)
  return result;
};

export function AllTips() {
  const { selectedValueTheme, setSelectedValueTheme } = useSelectStoreTheme();
  const { selectedValueCountry } = useSelectStoreContry();


    const [user,setUser] = useState<User|null>()
    const { dataUser } = useUserData();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    function onDeleteTip(){
      mutate([currentPage, limit, selectedValueTheme,selectedValueCountry])
    }
    // Configuração do SWR
    const { data, error, isLoading } = useSWR(
      [currentPage, limit,selectedValueTheme,selectedValueCountry],
      fetcher,
      {
        revalidateOnFocus: true,
        keepPreviousData: true,
      }
    );
    async function getDatauser(){

        const {data:{user}} = await supabaseClient().auth.getUser()
        setUser(user)
    }

    // Função para carregar as dicas


    // Carrega as dicas ao mudar a página
    useEffect(() => {
        getDatauser()
    }, [currentPage]);



    return (
        <SectionContainer IconTitle={Timer} title='Últimas Dicas' className=''>
            <SelectGroup />
            
            <CardTipsContainer>
                {

                    isLoading ? 'carregando..' :
                        data?.tips.map((tipFull) => (
                            <TipCard onDelete={onDeleteTip} currentUser={user?.id || ''} key={tipFull.id}  tipFull={tipFull} />
                        ))
                }
            </CardTipsContainer>
                <GenericPagination
                    currentPage={currentPage}
                    totalPages={data?.totalPages as number}
                    onPageChange={(page) => setCurrentPage(page)}
                />
        </SectionContainer>
    );
}




