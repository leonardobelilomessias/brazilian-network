import NextAuth from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { signInUser } from '@/lib/firebase/signinUser';
import { authConfig } from './auth.config';
import { supabase } from './lib/supabase/supabase';
import { User, UserResponse } from '@supabase/supabase-js';
 
type IUser = {
  id:string
}


async function getUser(email:string, password:string): Promise<User | null>{
  try {
    const { data: { user } } = await supabase.auth.signInWithPassword({email, password})
    
    console.log(user)
  return user
} catch (error) {
  console.error('Failed to fetch user:', error);
  throw new Error('Failed to fetch user.');
}
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email,password);
          if (!user?.id) return null;
          if (user.id) return user
        }
        console.log('Invalid credentials');
        return null
      },
    }),
  ],
});