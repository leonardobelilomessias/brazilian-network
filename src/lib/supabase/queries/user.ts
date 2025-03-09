import { createClient } from "@/utils/supabase/server";
import { supabaseClient } from "../client";
import { IUser } from "@/app/types/types";

export const updateUserById = async (userData:IUser) => {
    const supabase =await  createClient();
    try {
        const { data, error } = await supabase
            .from('users')
            .update(userData)
            .eq('id', userData.id);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  };

  export const uploadAvatar = async (file: File, userId: string) => {
    try {
        const supabase =await  createClient();
      const { data, error } = await supabase
        .storage
        .from('avatars')
        .upload(`public/${userId}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      return data.path; // Retorna a chave do arquivo enviado
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error);
      return null;
    }
  };