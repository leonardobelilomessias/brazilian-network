import React from 'react';
import Link from 'next/link';
import { truncateText } from '@/app/util/textTrincate';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/app/util/FormatDate';
import { DropdownCard } from '../../Screens/Tips/TipsScreen/DropDownCard';
import { TipsFull } from '@/app/types/TypesDB';

interface TipCardProps {
    id: string;
    title: string;
    created_at: string,
    user_name: string
    likes: string | number
    comments: any[]
}

export function TipCard({ tipFull, currentUser, onDelete }: { tipFull: TipsFull, currentUser: string, onDelete:()=>void }) {
    return (
        <div className='relative border-b-[0.1px] border-gray-100 pb-2 ' >
            <div className="border-b border-gray-100 pb-3 md:pb-4 last:border-b-0 last:pb-0 relative">
                {
                    tipFull.profile?.id === currentUser &&
                    <div className='absolute right-0 top-0 sm:right-2 sm:top-2 w-8'>
                        <DropdownCard onDelete={onDelete} tipId={tipFull.id} />
                    </div>
                }
                <Link href={`/dica/${tipFull.id}`} className="block hover:bg-gray-100 rounded-md cursor-pointer transition duration-200 px-4 py-2 max-w-5xl" >
                    <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base line-clamp-1">{tipFull.title}</h3>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <p className="text-xs text-gray-500 flex justify-start items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>    Criado em {formatDate(tipFull.created_at).extendTime}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        por <span className="text-blue-500 font-medium">@{truncateText(tipFull.profile?.user_name || "", 8).toLowerCase()}</span>
                    </p>
                    <p className="text-xs text-gray-500">{tipFull.likes_count} Likes</p>
                    <p className="text-xs text-gray-500">{tipFull.tips_comments.length} Comentários</p>
                    <p className='text-blue-500 font-semibold text-xs'>Pais: {tipFull.country.name}</p>
                    <p className='text-blue-500 font-semibold text-xs'>Tema: {tipFull.theme.name}</p>

                </div>
                </Link>
            </div>
        </div>
    );
};

