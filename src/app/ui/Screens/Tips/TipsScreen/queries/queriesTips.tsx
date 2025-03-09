import { supabaseClient } from "@/lib/supabase/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const fetchTips = async (): Promise<Tip[]> => { // Retorna um array de dicas
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
        user_name,
        avatar_url
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
  .eq("status", "approved") // Filtra apenas as dicas com status 'approved'
  .order("created_at", { ascending: false });
  revalidatePath('dicas')

if (error) throw error;

// console.log(data); // Verifique os dados retornados


  if (error) throw error;

  // 🔹 Garante que os relacionamentos sejam objetos únicos e não arrays
  return data?.map((tip) => ({
    ...tip,
    created_by: Array.isArray(tip.created_by) ? tip.created_by[0] : tip.created_by,
    theme_id: Array.isArray(tip.theme_id) ? tip.theme_id[0] : tip.theme_id,
    country_id: Array.isArray(tip.country_id) ? tip.country_id[0] : tip.country_id,
  })) ?? [];

};



export const insertTip = async (data:any): Promise<PostgrestSingleResponse<null>> => {
  
  const resp = await supabaseClient
  .from('tips')
  .insert([
    data
  ]);
  // revalidade('/dicas')
  return resp

};
export interface User {
    id: string;
    name: string;
    user_name: string;
  }
  
  export interface Theme {
    id: string;
    name: string;
  }
  
  export interface Country {
    id: string;
    name: string;
  }
  
  export interface Tip {
    id: string;
    title: string;
    content: string;
    status: string;
    created_at: string;
    likes_count: number;
    image_url: string | null;
    created_by: User;
    theme_id: Theme;
    country_id: Country;
  }
  