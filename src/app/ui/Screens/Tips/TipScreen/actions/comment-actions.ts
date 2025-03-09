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

export async function deleteCommentAction(commentId: string) {
  try {
    const token_supabase = cookies().get('token_supabase')?.value;
    const supabase = await createClient()
    const { data: { user }, error: sessionError } = await supabase.auth.getUser();
    

    if (sessionError || !user?.id) {
      console.log('Erro de sessão:', sessionError);
      return { success: false, error: 'Usuário não autenticado' };
    }
    console.log('Usuário autenticado server:', user.id);
    console.log('id do comentario', commentId);
    console.log('id do criador do comentario e o mesmo do usuario', user.id,);


    
    if (!user.id) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', user.id);
    console.log(deleteError)
    if (deleteError) {
      throw deleteError;
    }

    revalidatePath(`/dica/${commentId}`);
    return { success: true, error: null };
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    return { success: false, error: 'Erro ao deletar comentário' };
  }
} 