'use client'
import { Tip, TipsFull } from '@/app/types/TypesDB';
import { Calendar, LucideProps, Timer } from 'lucide-react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';
import { TipCard } from '../TipCard';
import { supabaseClient } from '@/lib/supabase/client';
import useSWR,{mutate} from 'swr';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { useUserData } from '@/context/ContextUserAccont';
import { User } from '@supabase/supabase-js';
interface ItemsPros { 
    linkButton: string, 
    title: string, 
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, 
    status?: string 
    tips:TipsFull[]
    userId?:string |null | undefined
    hasButton?:boolean
}

const fetcher = async ([page, limit]: [number, number]) => {
  const result = await fetchTipsPagination(page, limit);
  return result;
};

export default function GenericTipList() {
    const [user,setUser] = useState<User|null>()
    const { dataUser } = useUserData();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    function onDeleteTip(){
      mutate([currentPage, limit])
    }
    // Configuração do SWR
    const { data, error, isLoading } = useSWR(
      [currentPage, limit],
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
        <div className="mb-8 bg-white rounded-lg p-4 md:p-6  w-full">
            <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2"><Timer/></span>
                <h2 className="text-lg md:text-xl font-semibold">Dicas</h2>
            </div>
            <div className="">
                {data?.tips.map((tipFull) => (
                    <TipCard  onDelete={onDeleteTip} tipFull={tipFull} key={tipFull.id} currentUser={dataUser?.id||""}/>
                ))}
            </div>
            

                <Link href={'/dicas'}>
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition duration-200">
                        Ver todas
                    </button>
                </div>
            </Link>
            
        </div>
    );
}