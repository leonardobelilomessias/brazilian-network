import { axiosApi } from "@/lib/axios/axios";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const ContextUserAccont = createContext({} as IDataAccont);
interface IDataAccont{
    dataUser:User | null |undefined
}
function AccountCountext({children}:{children:ReactNode}){
    const [dataUser,setDataUser] = useState<User | null>()
    async function getDatauser() {
    const {data : {user}} =await  supabaseClient().auth.getUser()
    setDataUser(user)
    console.log("data  usuario", user) 
    
}    
    useEffect(()=>{
        getDatauser()
    },[])
    return(
        <ContextUserAccont.Provider value={{dataUser:dataUser}}>
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