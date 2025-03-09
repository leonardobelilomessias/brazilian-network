import { CreateTipScreen } from "@/app/ui/Screens/Tips/CreateTipScreen";
import { getServerClient } from "@/lib/supabase/server";
import { createClient } from "@/utils/supabase/server";

export default async function newTip(){
    const supabase =    await createClient()
    const {data} = await supabase.auth.getUser()
    // console.log(data,'servidor ciar dica')
    const user_id = data.user?.id

    return(
        <>
        <CreateTipScreen userId={user_id} />
        </>
    )
}