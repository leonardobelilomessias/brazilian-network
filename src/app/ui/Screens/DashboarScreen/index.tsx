
import AuthProvider from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import { fetchTips } from "@/lib/supabase/queries/server/Tips";
import TopTipsList from "../Feed/TopTipsList";

export async function DashboardScreen(){
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    
    const name = data.user?.user_metadata.display_name || 'Visitante'
    console.log(data.user?.identities)
    const userId = data.user?.id
    const tips = await fetchTips()
    // console.log(data.user,'data supabase')
    // const token_supabase = cookies().get("token_supabase")?.value
    // console.log(token_supabase)
    // const {data} = await supabaseClient.auth.getUser(token_supabase)
    // console.log('Cookies:', cookies().getAll())
    // console.log(data,'data supabase')
    return(
        
        <div className="sm:container p-2 pt-5">
            <AuthProvider>

            <p className="text-2xl font-bold">Bem Vindo {name}</p>
            </AuthProvider>
            <TopTipsList tips={tips}/>
            {/* <RecentQuestionsSection /> */}
            {/* <SearchBar/> */}
            {/* <HomeCarousel/> */}
            {/* <HeroDashboard/>1 */}
            {/* <EventsSection /> */}
            {/* <VideosSection /> */}

        </div>
    )
}