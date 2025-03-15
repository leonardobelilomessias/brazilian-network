'use server'

import { revalidatePath } from 'next/cache'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
export const insertTip = async (data:any): Promise<PostgrestSingleResponse<null>> => {
  const supabase = await createClient()
  const resp = await supabase 
  .from('tips')
  .insert([
    data
  ]);
   revalidatePath('/dicas')
  return resp

};