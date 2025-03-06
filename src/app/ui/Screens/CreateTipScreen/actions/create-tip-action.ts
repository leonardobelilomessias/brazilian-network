'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const TipSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
  image: z.instanceof(File).optional(),
})

export async function createTipAction(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const validatedFields = TipSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    image: formData.get('image'),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { title, content, image } = validatedFields.data

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) {
    return { error: { auth: ['Usuário não autenticado'] } }
  }

  let imageUrl = null
  if (image && image.size > 0) {
    const filePath = `tips/${Date.now()}-${image.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tips')
      .upload(filePath, image)

    if (uploadError) {
      return { error: { image: ['Erro ao fazer upload da imagem'] } }
    }

    const { data: publicUrlData } = supabase.storage.from('tips').getPublicUrl(filePath)
    imageUrl = publicUrlData.publicUrl
  }

  const { error: insertError } = await supabase.from('tips').insert({
    title,
    content,
    image_url: imageUrl,
    created_by: userData.user.id,
  })

  if (insertError) {
    return { error: { submit: ['Erro ao criar dica'] } }
  }

  revalidatePath('/dashboard')
  return { success: true }
} 