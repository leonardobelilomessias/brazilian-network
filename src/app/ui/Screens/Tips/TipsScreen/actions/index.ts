'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export const deleteTip = async (tipId: string) => {
  const supabase = await createClient()
  
  // Verificar autenticação
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Acesso negado!')

  // Executar delete com validação
  const { error } = await supabase
    .from('tips')
    .delete()
    .match({
      id: tipId,
      created_by: user.id  // Garante que só o autor pode deletar
    })
console.log('log do erro', error)
  if (error) throw error
  
  revalidatePath('/dicas') // Atualizar dados da página
}