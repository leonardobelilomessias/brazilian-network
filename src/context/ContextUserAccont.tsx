import { IProfile } from "@/app/types/TypesDB";
import { axiosApi } from "@/lib/axios/axios";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const ContextUserAccont = createContext({} as IDataAccont);
interface IDataAccont{
    dataUser:IProfile | null |undefined
    authUser:User | null |undefined

}
function AccountCountext({children}:{children:ReactNode}){
    const [dataUser,setDataUser] = useState<IProfile | null>()
    const [authUser,setDataAuthuser] = useState<User |null>()
    async function getDatauser() {
    const {data : {user}} =await  supabaseClient().auth.getUser()
    setDataAuthuser(user)
    if(user){
        const {data,error} =await  supabaseClient().from('profiles').select('*').eq('id',user?.id).single()

        setDataUser(data as IProfile)
    }
    console.log("data  usuario", user) 
    
}    
    useEffect(()=>{
        getDatauser()
    },[])
    return(
        <ContextUserAccont.Provider value={{dataUser:dataUser, authUser:authUser}}>
            {children}
        </ContextUserAccont.Provider>
    )
}
export function AccontProvider({children}:{children:ReactNode}){
    
    return(
        <AccountCountext>
            {children}
        </AccountCountext>
    )
}

export const useUserData = ()=>useContext(ContextUserAccont)