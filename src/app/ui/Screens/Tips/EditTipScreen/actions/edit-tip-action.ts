'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { supabaseClient } from '@/lib/supabase/client'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

import { title } from 'process'
import { createClient } from '@/utils/supabase/server'

export const insertTip = async (data:any): Promise<PostgrestSingleResponse<null>> => {
  
  const resp = await supabaseClient
  .from('tips')
  .insert([
    data
  ]);
   revalidatePath('/dicas')
  return resp

};


export const fetchTip = async (id:string): Promise<any> => {
  const { data, error } = await supabaseClient
  .from("tips")
  .select(
    `
      id,
      title,
      content,
      status,
      created_at,
      likes_count,
      image_url,
      created_by:users!tips_created_by_fkey (
        id,
        name,
        user_name
      ),
      theme_id:themes (
        id,
        name
      ),
      country_id:countries (
        id,
        name
      )
    `
  )
  .eq("id", id) // Filtra apenas as dicas com status 'approved'


if (error) throw error;

// console.log(data); // Verifique os dados retornados


  if (error) throw error;

  // 🔹 Garante que os relacionamentos sejam objetos únicos e não arrays
  const tip = data[0] ;
  return  tip 

};



export const updateTip = async (data:any): Promise<PostgrestSingleResponse<null>> => {
  const supabase = await createClient()
  const { data: updatedData, error } = await supabase
      .from('tips')
      .update(data)
      .eq('id', data.id); // Filtra a dica pelo ID
  
  if (error) {
      console.error('Erro ao atualizar a dica:', error);
      return { data: null, error, count: null, status: Number(error.code), statusText: error.message };
  } else {
    revalidatePath(`/dica/${data.id}`);
    revalidatePath(`/dica/editar-dica/${data.id}`);

      console.log('Dica atualizada com sucesso:', data);
      return { data: null, error: null, count: null, status: 200, statusText: 'OK' };
  }
};

