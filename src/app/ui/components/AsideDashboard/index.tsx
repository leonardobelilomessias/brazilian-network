"use client"
import { AsideButtons } from "./AsideButtons";
import { AccontProvider } from "@/context/ContextUserAccont";

export function AsideDashBoard(){
return(
    <AccontProvider>
            <aside className="w-[14.9%] hidden md:block fixed border-r h-full border-gray-200    overflow-y-scroll pb-20">
            <AsideButtons />
        </aside>
    </AccontProvider>
    )
}