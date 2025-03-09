'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { supabaseClient } from '@/lib/supabase/client'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

export const insertTip = async (data:any): Promise<PostgrestSingleResponse<null>> => {
  
  const resp = await supabaseClient
  .from('tips')
  .insert([
    data
  ]);
   revalidatePath('/dicas')
  return resp

};