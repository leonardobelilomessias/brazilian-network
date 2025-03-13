'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { supabaseClient } from '@/lib/supabase/client'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { getServerClient } from '@/lib/supabase/server'
import { error } from 'console'
import { createClient } from '@/utils/supabase/server'

interface FormState {
  error: {
    content?: string[];
    tipId?: string[];
    auth?: string;
    submit?: string;
  } | null;
  success?: boolean;
}

const CommentSchema = z.object({
  content: z.string().min(1, 'O comentário não pode estar vazio'),
  tipId: z.string().uuid('ID da dica inválido')
})

export async function addComment(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = CommentSchema.safeParse({
        content: formData.get('content'),
        tipId: formData.get('tipId')
    })
    
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }
    
    const supabase = await createClient()
    const { data } = await supabase.auth.getSession()
    
    if (!data.session) {
        return {
            error: {
                auth: 'Você precisa estar logado para comentar'
            }
        }
    }
    
    const { error } = await supabase
    .from('comments')
    .insert({
        content: validatedFields.data.content,
        tip_id: validatedFields.data.tipId,
        user_id: data.session.user.id
    })
    console.log('data aqui',error)

  if (error) {
    return {
      error: {
        submit: 'Erro ao adicionar comentário'
      }
    }
  }

  revalidatePath(`/tips/${validatedFields.data.tipId}`)
  return { error: null, success: true }
}

