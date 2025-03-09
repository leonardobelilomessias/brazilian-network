import { navigationElementsAccount, navigationElementsCommunity } from "@/app/common/constants/navegationElements";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideCommunityButtons(){
    const pathname = usePathname()
    return(
        <>
                <nav className="flex flex-col  gap-1 ">
                <Separator />
                  {navigationElementsCommunity.map((element) => (
                    <ButtonAsideNavigation key={element.title} element={element}/>
                  ))}

                </nav>
        </>
    )
}