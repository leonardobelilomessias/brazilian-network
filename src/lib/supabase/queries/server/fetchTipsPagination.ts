'use server'
import { TipsFull } from "@/app/types/TypesDB";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const fetchTipsPagination = async (page: number, limit: number = 5): Promise<{ tips: TipsFull[], totalPages: number }> => {
    const supabase = await createClient();
  
    // Calcular o offset com base na página e no limite
    const offset = (page - 1) * limit;
  
    // Consultar as dicas com paginação
    const { data, error, count } = await supabase
      .from("tips")
      .select(
        `
          *,
          profiles!tips_created_by_fkey (
            id,
            user_name,
            full_name,
            avatar_url
          ),
          themes:theme_id (
            id,
            name
          ),
          countries:country_id (
            id,
            name,
            code
          ),
          tips_comments (
            id,
            content,
            created_at,
            user_id,
            profiles!tips_comments_user_id_fkey (
              id,
              user_name,
              avatar_url,
              full_name
            )
          )
        `,
        { count: 'exact' } // Solicitar a contagem total de registros
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1); // Aplicar paginação
  
    if (error) throw error;
  
    // Calcular o número total de páginas
    const totalPages = Math.ceil((count ?? 0) / limit);
  
    // Transformar os dados para o formato esperado pela aplicação
    const tips = data?.map((tip) => ({
      ...tip,
      profile: tip.profiles,
      theme: tip.themes,
      country: tip.countries,
      // Remover as chaves originais para evitar duplicação
      profiles: undefined,
      themes: undefined,
      countries: undefined,
    })) ?? [];
  
    return { tips, totalPages };
  };