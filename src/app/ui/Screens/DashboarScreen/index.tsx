import { Button } from "@/components/ui/button";
import { HeroDashboard } from "./HeroDashboard";
import TableDataFinance from "./TableDataFinance";
import { LaunchContainer } from "./LaunchContainer";
import { SelectedContainer } from "./SelectedContainer";
import { Suspense } from "react";
import { TableDataFinanceSkeleton } from "./TableDataFinanceSkeleton";
import { HomeCarousel } from "../../components/Carousels/HomeCarousel";
import { SearchBar } from "./SearchBar";
import EventsSection from "../Feed/EventsSection";
import VideosSection from "../Feed/VideosSection";
import RecentQuestionsSection from "../Feed/RecentQuestionsSection";
import { supabaseClient } from "@/lib/supabase/client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { TopTipsSection } from "../Feed/TopTipsSection";

export async function DashboardScreen(){
    const supabase = createServerComponentClient({cookies:()=>cookies()})
    const {data} = await supabase.auth.getUser()
    const name = data.user?.identities?.[0]?.identity_data?.display_name || 'Visitante'
    console.log(data.user,'data supabase')
    // const token_supabase = cookies().get("token_supabase")?.value
    // console.log(token_supabase)
    // const {data} = await supabaseClient.auth.getUser(token_supabase)
    // console.log('Cookies:', cookies().getAll())
    // console.log(data,'data supabase')
    return(
        
        <div className="sm:container p-2 pt-5">
            <p className="text-2xl font-bold">Bem Vindo {name}</p>
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