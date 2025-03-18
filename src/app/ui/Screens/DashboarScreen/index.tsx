'use client'
import AuthProvider from "@/context/AuthProvider";
import {TopTipsListSection} from "./Feed/TopTipsList";
import { ContainerScreen } from "../../components/Containers/ContainerSceen";
import { AccontProvider } from "@/context/ContextUserAccont";
import { LastTipsList } from "./Feed/LastTipsList";

export  function DashboardScreen(){

    return(
        <AccontProvider>
            <ContainerScreen>
                <LastTipsList />
            </ContainerScreen>
        </AccontProvider>
    )
}