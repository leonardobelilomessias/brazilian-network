import { cookies } from "next/headers";
import { supabaseClient } from "../client";

export const getTipById = async (id: string) => {
  try {

    const { data, error } = await supabaseClient
      .from('tips')
      .select(`
        *,
        users:created_by (
          id,
          name,
          avatar_url,
          email
        ),
        themes:theme_id (
          id,
          name
        ),
        countries:country_id (
          id,
          name
        ),
        comments!tip_id (
          id,
          content,
          created_at,
          updated_at,
          user_id,
          users!user_id (
            id,
            name,
            avatar_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro Supabase:', error); // Debug log
      throw error;
    }

// Debug log
    return data;
  } catch (error) {
    console.error('Erro ao buscar dica:', error);
    return null;
  }
};

export const getCommentsByTipId = async (tipId: string) => {
  try {
    const { data, error } = await supabaseClient
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        updated_at,
        users (
          id,
          name,
          avatar_url
        )
      `)
      .eq('tip_id', tipId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return null;
  }
}

export const createComment = async (tipId: string, content: string) => {
    const token_supabase = cookies().get('token_supabase')?.value
  try {
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token_supabase);
    
    if (userError || !userData.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabaseClient
      .from('comments')
      .insert({
        content,
        tip_id: tipId,
        user_id: userData.user.id
      })
      .select(`
        id,
        content, 
        created_at,
        updated_at,
        users (
          id,
          name,
          avatar_url
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return null;
  }
}

export const deleteComment = async (commentId: string) => {
  try {
    const token_supabase = cookies().get('token_supabase')?.value
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token_supabase);

    if (userError || !userData.user) {
      throw new Error('Usuário não autenticado');
    }

    // Verificar se o usuário é o criador do comentário
    const { data: comment, error: commentError } = await supabaseClient
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (commentError || !comment) {
      throw new Error('Comentário não encontrado');
    }

    if (comment.user_id !== userData.user.id) {
      throw new Error('Usuário não tem permissão para deletar este comentário');
    }

    // Deletar o comentário
    const { error: deleteError } = await supabaseClient
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) {
      throw deleteError;
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    return null;
  }
}
