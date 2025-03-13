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
import { Bell, BotOff, Hotel, LogOut, Menu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { LogoIcon } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { navigationElements, navigationElementsAccount, navigationElementsCommunity, navigationElementsTools } from "@/app/common/constants/navegationElements";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface RouteProps {
  href: string;
  label: string;
}
const routeList: RouteProps[] = [
  {
    href: "/suporte",
    label: "Suporte",
  },
  {
    href: "/perfil",
    label: "Perfil",
  },
  {
    href: "/notificacoes",
    label: "Notificaçoes",
  },
];

interface NavigationItem {
  link: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  status?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export function NavMenuMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname()
  return (
    <>
      <span className="flex md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="px-2">
              <Menu className="flex md:hidden h-5 w-5" onClick={() => setIsOpen(true)} >
              </Menu>
          </SheetTrigger>
          <SheetContent side={"left"} className="overflow-y-scroll">
            <MobileNavigationMenu sections={navigationElements} />
          </SheetContent>
        </Sheet>
      </span>
      {/* desktop */}
      <div className="flex hidden md:flex gap-2">

        <nav className="flex items-center">
          {routeList.map((route: RouteProps, i) => (
            <a rel="noreferrer noopener" href={route.href} key={i} className={`flex text-[17px]  ${buttonVariants({ variant: "ghost",})}`}>
              {route.href === '/notificacoes' ? <Bell className="align-center" width={20} height={16} /> :route.label}
              </a>
          ))}
        </nav>

        <div className="hidden md:flex gap-2 items-center">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </>
  )
}

export function MobileNavigationMenu({ sections }: { sections: NavigationSection[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 mt-0">
      {sections.map((section) => (
        <div key={section.title}>
          <p className='flex h-[32px] grow gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:p-2 md:px-3'>
            {section.title}
          </p>
          <Separator />
          {section.items.map((item) => (
            <Link
              rel="noreferrer noopener"
              key={item.link}
              href={item.link}
              className={clsx(
                'flex h-[48px] grow gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === item.link,
                },
              )}
            >
              <item.icon size={18} />
              {item.title}
              {/* {item.status && <FeatureLabel status={item.status} />} */}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

function FeatureLabel({ status }: { status: string }) {
  const borderColor = status === 'Novo' ? 'border-blue-500' : 'border-gray-500';
  const textColor = status === 'Novo' ? 'text-blue-500' : 'text-gray-500';
  return (
    <div className={`flex items-center gap-2 ${borderColor} ${textColor}`}>
      {status}
    </div>
  );
}