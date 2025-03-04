'use client'
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Compass, Flag, Hotel, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Seguimentos",
  },
  {
    href: "#testimonials",
    label: "Depoimentos",
  },
  {
    href: "#pricing",
    label: "Preços",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] bg-blue-500 top-0 z-40 w-full dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex text-white"
            >
              <Compass />
              Brazilian Network
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            {/* <ModeToggle /> */}

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex text-white md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  {/* <span className="sr-only">Menu Icon</span> */}
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Brazilian Network
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="/entrar"
      
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    
                    Entrar
                  </a>
                </nav>
                
              </SheetContent>
            </Sheet>
          </span>



          <div className="hidden md:flex gap-2">
            <Link
              rel="noreferrer noopener"
              href="/cadastro"
    
              
              className={`rounded border border-white text-white flex align-middle justify-center items-center px-4`}
            >
            
              Criar conta
            </Link>
            <Link
              rel="noreferrer noopener"
              href="/entrar"
    
              
              className={`border ${buttonVariants({ variant: "secondary" })} text-blue`}
            >
            
              <p className="text-blue-500">Entrar</p>
            </Link>

            {/* <ModeToggle /> */}
          </div>
          
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
