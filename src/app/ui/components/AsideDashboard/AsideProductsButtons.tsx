import { navigationElementsCommunity, navigationElementsTools } from "@/app/common/constants/navegationElements";
import { Separator } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideProductsButtons(){
    const pathname = usePathname()
    return(
        <>
        
                      
                  {navigationElementsTools.map((element) => (
                  <ButtonAsideNavigation key={element.title} element={element}/>
                  ))}

        </>
    )
}