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
import TopTipsSection from "../Feed/TopTipsSection";
import VideosSection from "../Feed/VideosSection";
import RecentQuestionsSection from "../Feed/RecentQuestionsSection";

export async function DashboardScreen(){


    return(
        
        <div className="sm:container p-2 pt-5">
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