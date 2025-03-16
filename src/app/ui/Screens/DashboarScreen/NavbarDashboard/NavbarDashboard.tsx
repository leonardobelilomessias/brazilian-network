'use server'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Compass } from "lucide-react";
import { NavMenuMobile } from "./NavMenuMobile";
import { ButtonSignOut } from "./ButtonSignOut";
import Link from "next/link";

export const NavbarDashboard = () => {

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-blue-500 text-white border border-blue-500 dark:bg-background">
      <NavigationMenu className="flex   ">
        <NavigationMenuList className=" h-14 px-4 min-w-[100vw] md:min-w-[95vw] flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              href="/dashboard"
              className="ml-2 font-bold text-xl flex"
            >
              <Compass />
              Brazilian Network
            </Link>
          </NavigationMenuItem>
          <div className="flex gap-5 items-center">
            <NavMenuMobile />
            <ButtonSignOut />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
