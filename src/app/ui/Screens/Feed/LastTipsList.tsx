'use client'; // Transforma o componente em Client Component
import { TipsFull } from '@/app/types/TypesDB';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Timer } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SectionContainer from '../../components/Containers/SectionContainer';
import CardTipsContainer from '../../components/Containers/CardsTipsContainer';
import { TipCard } from '../../components/TipCard';
import { useUserData } from '@/context/ContextUserAccont';

export function LastTipsList() {
  const {dataUser} = useUserData()
  const [tips, setTips] = useState<TipsFull[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[loading,setLoading] = useState(true)
  const limit = 5; // Número de dicas por página

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
    }finally{
      setLoading(false)

    }
  };

  // Carrega as dicas ao mudar a página
  useEffect(() => {
    
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
      <CardTipsContainer>
      {
        
        loading?'carregando..':
        tips.map((tipFull) => (
          <TipCard currentUser={dataUser?.id|| ''} key={tipFull.id} tipFull={tipFull} />
        ))
      }
      </CardTipsContainer>

      {/* Paginação */}
      <div className="">
        <Link href="/dicas">
          <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition duration-200">
            Ver todas
          </button>
        </Link>

      </div>
    </SectionContainer>
  );
}




