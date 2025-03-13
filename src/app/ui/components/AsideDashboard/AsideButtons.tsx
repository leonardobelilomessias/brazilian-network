import { navigationElements, navigationElementsAccount, navigationElementsCommunity } from "@/app/common/constants/navegationElements";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideButtons(){
    const pathname = usePathname()
    return(
        <>
                <nav className="flex flex-col  gap-1 ">
                <Separator />
                  {navigationElements.map((element) => (
                    <div key={element.title} className="flex flex-col">
                      <p className="text-sm font-medium  p-2 ">{element.title}</p>
                      <ButtonAsideNavigation key={element.title} items={element.items}/>
                    </div>
                  ))}

                </nav>
        </>
    )
}