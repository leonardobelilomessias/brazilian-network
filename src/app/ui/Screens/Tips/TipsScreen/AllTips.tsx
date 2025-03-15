'use client'
import { TipsFull } from '@/app/types/TypesDB';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
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


export function AllTips() {
    const { dataUser } = useUserData()
    const [user,setUser] = useState<User|null>()
    const [tips, setTips] = useState<TipsFull[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true)
    const limit = 5; // Número de dicas por página
    async function getDatauser(){

        const {data:{user}} = await supabaseClient().auth.getUser()
        setUser(user)
    }

    // Função para carregar as dicas
    const loadTips = async (page: number) => {
        setLoading(true)
        try {
            const { tips: fetchedTips, totalPages: fetchedTotalPages } = await fetchTipsPagination(page, limit);
            setTips(fetchedTips);
            setTotalPages(fetchedTotalPages);
        } catch (error) {
            setLoading(false)

            console.error('Erro ao carregar dicas:', error);
        } finally {
            setLoading(false)

        }
    };

    // Carrega as dicas ao mudar a página
    useEffect(() => {
        getDatauser()
        loadTips(currentPage);
    }, [currentPage]);

    // Função para mudar de página
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <SectionContainer IconTitle={Timer} title='Últimas Dicas' className=''>
            <SelectGroup />
            
            <CardTipsContainer>
                {

                    loading ? 'carregando..' :
                        tips.map((tipFull) => (
                            <TipCard currentUser={user?.id || ''} key={tipFull.id}  tipFull={tipFull} />
                        ))
                }
            </CardTipsContainer>
                <GenericPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
        </SectionContainer>
    );
}




