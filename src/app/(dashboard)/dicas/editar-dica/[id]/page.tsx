import { CreateTipScreen } from "@/app/ui/Screens/Tips/CreateTipScreen";
import { EditTipScreen } from "@/app/ui/Screens/Tips/EditTipScreen";
import { fetchTip } from "@/app/ui/Screens/Tips/EditTipScreen/actions/edit-tip-action";
import { createClient } from "@/utils/supabase/server";
interface EditTipPageProps {
    params: {
      id: string;
    }
  }
export default async function editTip({ params }: EditTipPageProps){
    const supabase =    await createClient()
    const {data} = await supabase.auth.getUser()
    // console.log(data,'servidor ciar dica')
    const user_id = data.user?.id
    const tip = await fetchTip(params.id)

    

    return(
        <>
        <EditTipScreen userId={user_id} tip={tip} />
        </>
    )
}