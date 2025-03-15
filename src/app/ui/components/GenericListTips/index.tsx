import { Tip, TipsFull } from '@/app/types/TypesDB';
import { Calendar, LucideProps, Timer } from 'lucide-react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { TipCard } from '../TipCard';
interface ItemsPros { 
    linkButton: string, 
    title: string, 
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, 
    status?: string 
    tips:TipsFull[]
    userId?:string |null | undefined
    hasButton?:boolean
}

export default function GenericTipList({ items }: { items: ItemsPros }) {
    return (
        <div className="mb-8 bg-white rounded-lg p-4 md:p-6  w-full">
            <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2"><items.icon/></span>
                <h2 className="text-lg md:text-xl font-semibold">{items.title}</h2>
            </div>
            <div className="">
                {items.tips.map((tipFull) => (
                    <TipCard tipFull={tipFull} key={tipFull.id} currentUser={items.userId||""}/>
                ))}
            </div>
            { items.hasButton &&

                <Link href={items.linkButton}>
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition duration-200">
                        Ver todas
                    </button>
                </div>
            </Link>
            }
        </div>
    );
}