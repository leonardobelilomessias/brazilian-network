import { navigationElements, navigationElementsCommunity, navigationElementsTools } from "@/app/common/constants/navegationElements";
import { Separator } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideProductsButtons(){
    const pathname = usePathname()
    return(
        <>
        
                      
                  {navigationElements.map((element) => (
                  <ButtonAsideNavigation key={element.title} items={element.items}/>
                  ))}

        </>
    )
}