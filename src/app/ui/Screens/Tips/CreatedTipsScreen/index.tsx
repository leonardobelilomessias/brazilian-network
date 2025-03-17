import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function CreatedTipsScreen({id}:{id?:string}) {
    return (
        <div className="container pt-5 min-h-[60vh]">
            <div className="flex flex-col align-middle justify-center items-center">
                
                <h1 className="text-2xl font-bold my-4">Dica criada com Sucesso!</h1>
                <div className="bg-blue-100 rounded-full flex items-center justify-center p-4">
                    <Check className="text-blue-500" size={100}/>
                </div>
                <p className="text-xs my-4 text-gray-700">Sua dica foi adiciona com sucesso e esta visível para todos. </p>
                <div className=' flex flex-col items-center mt-4 gap-2 justify-center'>
                    <Link className='bg-blue-500 text-white p-1 text-sm rounded hover:bg-blue-400 min-w-36 text-center ' href={ id?`/dica/${id}`:'/dicas'}>
                        <p>Ver dica criada</p>
                    </Link >
                    <Link className='border border-blue-500 p-1 hover:bg-blue-100 hover:text-blue-700 text-blue-500 text-sm rounded min-w-36 text-center ' href={'/dicas'}>
                        <p>Ir para Todos Dicas</p>
                    </Link>
                </div>

            </div>
        </div>
    );
};

