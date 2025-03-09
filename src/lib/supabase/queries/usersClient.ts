import { IUser } from "@/app/types/types";
import { supabaseClient } from "../client";

export const updateUserById = async (userData: IUser) => {
  const { data, error } = await supabaseClient
    .from('users')
    .update({
      name: userData.name,
      phone: userData.phone,
      bio: userData.bio,
      origem: userData.origem,
      current_in: userData.current_in,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userData.id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}; 