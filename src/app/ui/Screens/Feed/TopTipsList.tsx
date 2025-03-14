'use client'; // Transforma o componente em Client Component
import { TipsFull } from '@/app/types/TypesDB';
import { truncateText } from '@/app/util/textTrincate';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Timer } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';

export  function TopTipsList() {
  const [tips, setTips] = useState<TipsFull[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Número de dicas por página

  // Função para carregar as dicas
  const loadTips = async (page: number) => {
    try {
      const { tips: fetchedTips, totalPages: fetchedTotalPages } = await fetchTipsPagination(page, limit);
      setTips(fetchedTips);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error('Erro ao carregar dicas:', error);
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
    <div className="mb-8 bg-white rounded-lg p-4 md:p-6 w-full">
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-2"><Timer size={20} /></span>
        <h2 className="text-lg md:text-xl font-semibold">Top Dicas</h2>
      </div>
      <div className="space-y-3 md:space-y-4">
        {tips.map((tipFull) => (
          <Link href={`/dica/${tipFull.id}`} className="block hover:bg-gray-100 cursor-pointer transition duration-200 px-4 py-2" key={tipFull.id}>
            <div className="border-b border-gray-100 pb-3 md:pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base line-clamp-1">{tipFull.title}</h3>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <p className="text-xs text-gray-500">
                  Criado em {new Date(tipFull.created_at).toLocaleDateString()} às {new Date(tipFull.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-gray-500">
                  por <span className="text-blue-500 font-medium">@{truncateText(tipFull.profile?.user_name || "", 8).toLowerCase()}</span>
                </p>
                <p className="text-xs text-gray-500">{tipFull.likes_count} Likes</p>
                <p className="text-xs text-gray-500">{tipFull.tips_comments.length} Comentários</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginação */}
      <div className="">
        <Link href="/dicas">
          <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition duration-200">
            Ver todas
          </button>
        </Link>

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      </div>
    </div>
  );
}




interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Função para calcular o intervalo de páginas visíveis
  const getVisiblePages = () => {
    const visiblePages = [];
    const range = 2; // Quantidade de páginas visíveis ao redor da página atual

    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // Ajusta o intervalo para garantir que sempre haja 4 páginas visíveis
    if (currentPage - range < 1) {
      end = Math.min(totalPages, 4);
    }
    if (currentPage + range > totalPages) {
      start = Math.max(1, totalPages - 3);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Botão Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Anterior
      </button>

      {/* Números das Páginas */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botão Próximo */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Próximo
      </button>
    </div>
  );
}