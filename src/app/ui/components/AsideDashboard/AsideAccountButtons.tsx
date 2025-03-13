import { navigationElements, navigationElementsAccount, navigationElementsCommunity } from "@/app/common/constants/navegationElements";
import { usePathname } from "next/navigation";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideAccountButtons() {
  const pathname = usePathname()
  return (
    <>
      <nav className="flex flex-col  gap-2 ">
        {navigationElements.map((element) => (
          <ButtonAsideNavigation key={element.title} items={element.items } />))}
      </nav>
    </>
  )
}

