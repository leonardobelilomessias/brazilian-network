import { Tip, TipsFull } from '@/app/types/TypesDB';
import { truncateText } from '@/app/util/textTrincate';
import { Timer } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function TopTipsList({tips}: {tips: TipsFull[]}) {
  return (
    <div className="mb-8 bg-white rounded-lg p-4 md:p-6  w-full">
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
      <Link href="/dicas">
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition duration-200">
            Ver todas
          </button>
        </div>
      </Link>
    </div>
  );
}