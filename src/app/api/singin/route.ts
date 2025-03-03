// import { singin } from "@/modules/auth/actions/auth-actions";
// import { AuthService } from "@/modules/auth/services/auth-services";
import { singin } from "@/app/module/actions/auth-actions";
import { FirebaseError } from "firebase/app";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
        const {email, password} = await request.json() 
     const response = await singin({email,password})
     
        // const session =  await AuthService.isSessionValid()
        // console.log('response',email,password)
        return NextResponse.json(response)
    }
    catch(error:any){
        if(error==='invalid_credentials'){
                console.log(error,"na rota singin, invalid-credential")
                const response = new Response(JSON.stringify({message:'invalid_credentials'}),{status:402})
                return response
            }
            if(error==='email_not_confirmed'){
                console.log(error,"na rota singin, email_not_confirmed")
                const response = new Response(JSON.stringify({message:'email_not_confirmed'}),{status:403})
                return response
            }
            const response = new Response(JSON.stringify({message:'generic_error'}),{status:400})
            return response
    }
    
}
