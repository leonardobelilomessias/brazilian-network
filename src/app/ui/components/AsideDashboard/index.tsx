"use client"
import { usePathname } from "next/navigation";
import { AsideButtons } from "./AsideButtons";


export function AsideDashBoard(){
const pathname = usePathname();

return(
            <aside className="w-[14.9%] hidden md:block fixed border-r h-full border-gray-200    overflow-y-scroll pb-20">
            <AsideButtons />
        </aside>
    )
}