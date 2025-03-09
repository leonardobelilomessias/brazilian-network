
import { HomeCarousel } from "../../components/Carousels/HomeCarousel";
import EventsSection from "../Feed/EventsSection";
import VideosSection from "../Feed/VideosSection";
import RecentQuestionsSection from "../Feed/RecentQuestionsSection";
import { TopTipsSection } from "../Feed/TopTipsSection";
import AuthProvider from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/server";

export async function DashboardScreen(){
    const supabase = await createClient()
    const {data} = await supabase.auth.getUser()
    const name = data.user?.identities?.[0]?.identity_data?.display_name || 'Visitante'
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
            {/* <SearchBar/> */}
            <HomeCarousel/>
            <TopTipsSection />
            {/* <HeroDashboard/>1 */}
            <EventsSection />
            <RecentQuestionsSection />
            <VideosSection />
            {/* <Suspense fallback={<TableDataFinanceSkeleton/>}>
                <TableDataFinance  />
            </Suspense>
            <Suspense fallback={<>loading</>}>
                <SelectedContainer />
            </Suspense>
            <Suspense fallback={<>loading</>}>
                <LaunchContainer />
            </Suspense>  */}
        </div>
    )
}