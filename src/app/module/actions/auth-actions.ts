'use server'


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";
import { AuthService } from "../services/auth-services";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase/firebase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabaseClient } from "@/lib/supabase/client";
import { createClient } from "@/utils/supabase/server";


export async function login(data:{email:string, password:string}) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function singin(data:{email:string, password:string}) {
  const supabase = await createClient()
    try {
        const { email, password } = data;
        const userCredential = await supabase.auth.signInWithPassword({email, password,});
        const user = userCredential.data.user;
         console.log("data singinwithpassword cliente", )
        if(!user?.id){
          throw new Error().name = userCredential.error?.code as string
          
        }
        if(user?.id){
         console.log(userCredential.data)
          await AuthService.createSessionToken({user_id:user.id,token_supabase:userCredential.data.session.access_token}) 
        }
        return user
        console.log("Usuário logado com sucesso:", user);
        // Aqui você pode redirecionar o usuário ou realizar outra ação após o login bem-sucedido
      } catch (error) {

          console.log("Erro em auth singin:", error);
          throw error
        
      }
}


export async function singinWithSupabaseServer(data:{email:string, password:string}) {
  const supabase = createServerActionClient({ cookies: () => cookies() });
  const { email, password } = data;
console.log('singni on server')
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password, 
    });

    if (error) {
      console.error('Erro de login:', error);
      return { error: error.message };
    }

    const session = authData.session;

    if (session) {
      cookies().set('sb-access-token', session.access_token, {
        httpOnly: true,        // Impede acesso ao cookie via JavaScript no navegador
        // secure: process.env.NODE_ENV === 'production',  // Cookie só é enviado em HTTPS em produção
        sameSite: 'lax',      // Restringe envio do cookie em requisições cross-site
        path: '/'             // Cookie disponível em todo o site
      });
      
      cookies().set('sb-refresh-token', session.refresh_token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      revalidatePath('/');
      return { data: authData, error: null };
    }

    return { error: 'Sessão não encontrada' };

  } catch (error) {
    console.error('Erro inesperado:', error);
    return { error: 'Erro ao fazer login' };
  }
}

export async function singup(data:{email:string, password:string,name:string}) {
  const supabase = await createClient()
  try {
    const userExist = await getUserByEmail(data.email);
    console.log('resultado da busca do usuario', userExist)
    if (userExist) {
      console.log("Usuário já existe", userExist);
      throw Error().message ="User alredy exist";
    }
    const userSupabase = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.name, // Aqui adicionamos o nome de exibição no metadata
        },
      },
    });
    if (userSupabase.error) {
      console.error('Erro ao criar usuário2:', userSupabase.error);
      throw userSupabase.error
      return;
    }
    if (userSupabase.data.user) {
      // console.log(userSupabase.data)
      const { error: profileError } = await supabaseClient
        .from('users')
        .insert({
          id: userSupabase.data.user.id,
          email:data.email,
          name:data.name,
          user_name:data.name.split(" ")[0].slice(0,6).concat(userSupabase.data.user.id),
          created_at: new Date().toISOString(),
        });
        
      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        await supabaseClient.auth.admin.deleteUser(userSupabase.data.user?.id!)
        throw profileError
      }
      const user = userSupabase.data.user
    if(user?.id){
        
      console.log('user com id', user.id)
       await AuthService.createSessionToken({user_id:user.id}) 
     }
     return user

    }
  } catch (error:any) {
    console.error("Erro ao criar usuário:", error);
    throw error
  }
}  




async function getUserByEmail(email: string) {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }

  return data;
}



export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}