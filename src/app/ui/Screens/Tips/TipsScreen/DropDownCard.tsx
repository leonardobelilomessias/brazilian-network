'use client' // Transforma em Client Component
import React from 'react'   
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useTransition } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { deleteTip } from './actions'
import Link from 'next/link'
import { Edit2, EllipsisVertical, Trash } from 'lucide-react'

export function DropdownCard({ tipId }: { tipId: string }) {
  const [isPending, startTransition] = useTransition()
const {toast} = useToast()
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTip(tipId)
        console.log('id a ser deletado', tipId)
        toast({title: 'Dica excluída com sucesso!', })
      } catch (error) {
        toast({title: 'Erro ao excluir dica'})
      }
    })
  }

  return (
    <DropdownMenu   >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" className=' border-0 '><EllipsisVertical size={20}/></Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-44">
        {/* ... Opção Editar ... */}
        
        <Link href={`/dicas/editar-dica/${tipId}`} className='flex hover:bg-gray-100 items-center gap-2 w-44 ' >
        <DropdownMenuItem 
          className='flex items-center gap-2 hover:cursor-pointer'
          
        >
          <Edit2 size={14} />
          <span>
            Editar
          </span>
        </DropdownMenuItem>
          </Link>
        <DropdownMenuItem 
          className='flex items-center gap-2'
          onSelect={handleDelete}
          disabled={isPending}
        >
          <Trash size={14} />
          <span>
            {isPending ? 'Excluindo...' : 'Excluir'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}