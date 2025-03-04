// import { singin } from "@/modules/auth/actions/auth-actions";
// import { AuthService } from "@/modules/auth/services/auth-services";
import { singin, singup } from "@/app/module/actions/auth-actions";
import { IUser } from "@/app/types/types";
import { db } from "@/lib/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
        const {email, password, name} = await request.json() 
        const response = await singup({email,password,name})
     
        // const session =  await AuthService.isSessionValid()
        // console.log('response',email,password)
        const formattedDate = new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format( new Date(`${"1990"}-${"01"}-${"01"}`));

        //  console.log(user)
        // await createNewUserDb(user)
        return NextResponse.json(JSON.stringify({response}))
    }catch(error:any){
      if(error.code==="over_email_send_rate_limit"){
        const response = new Response(JSON.stringify({message:error.code}),{
          status:401
      })
      return response

      }
    console.log("error aquii",error)
    const response = new Response(JSON.stringify({message:error}),{
      status:401
  })
  return response
    
}
}

const createNewUserDb = async (user: IUser): Promise<string> => {
    try {
      const docRef = doc(db, "users", user.id);
      await setDoc(docRef, user);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
      throw error;
    }
  };