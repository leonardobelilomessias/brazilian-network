// import { singin } from "@/modules/auth/actions/auth-actions";
// import { AuthService } from "@/modules/auth/services/auth-services";
import { AuthService } from "@/app/module/services/auth-services";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function DELETE(request: Request) {

        const supabase = await createClient()
        const session =  await AuthService.isSessionValid()
        await supabase.auth.signOut()
        if (session){
            AuthService.deleteSession()
        }
    
    return Response.json({logout:true})
}