'use server'


import { AuthService } from "../services/auth-services";

import { createClient } from "@/utils/supabase/server";
import { getUserByEmail } from "@/lib/supabase/queries/server/user";



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

export async function singup(data:{email:string, password:string,name:string}) {
  const supabase = await createClient()
  try {
    const {error, user} = await getUserByEmail(data.email);
    if (user) {
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
      throw userSupabase.error
      return;
    }
    if (userSupabase.data.user) {

      const { error: profileError, } = await supabase
        .from('profiles')
        .insert({
          id: userSupabase.data.user.id,
          email: data.email,
          user_name: data.name.split(" ")[0].slice(0,6).concat(userSupabase.data.user.id),
          full_name: data.name,
          avatar_url: null,
          bio: null,
          origem: null, 
          current_in: null,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        const {data,error}= await supabase.auth.admin.deleteUser(userSupabase.data.user.id)
        if(error){
          console.error('Erro ao deletar usuário:', error);
        }
        console.log('Usuário deletado:', data)
        return  profileError
      }

      const user = userSupabase.data.user
      if(user?.id){
        console.log('user com id', user.id)
        await AuthService.createSessionToken({user_id:user.id})
      }
      return user
    }
  } catch (error:any) {
    console.error("Erro ao criar usuário no cat:", error);
    return  error
  }
}  





