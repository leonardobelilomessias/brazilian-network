
import { HomeCarousel } from "@/app/ui/components/Carousels/HomeCarousel";
import { DashboardScreen } from "@/app/ui/Screens/DashboarScreen";
import { Feed } from "@/app/ui/Screens/Feed";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function HomePage() {
          const supabase = await createClient()
          const {data} = await supabase.auth.getUser()
          const id = data.user?.id
          if(!id){
              redirect(`/dashboard/visitante`)
          }
          if(id){
            redirect(`/dashboard/${id}`)
        }
  return (

    <>

    <DashboardScreen/>

      </>
    
  );
}
