'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
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