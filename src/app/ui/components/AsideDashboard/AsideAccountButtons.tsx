import { navigationElementsAccount, navigationElementsCommunity } from "@/app/common/constants/navegationElements";
import { usePathname } from "next/navigation";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideAccountButtons() {
  const pathname = usePathname()
  return (
    <>
      <nav className="flex flex-col  gap-2 ">
        {navigationElementsAccount.map((element) => (
          <ButtonAsideNavigation key={element.title} element={element} />))}
      </nav>
    </>
  )
}

