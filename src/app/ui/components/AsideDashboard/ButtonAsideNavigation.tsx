import { useUserData } from "@/context/ContextUserAccont"
import clsx from "clsx"
import { LucideProps } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"


interface ItemsPros { link: string, title: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, status?: string }

export function ButtonAsideNavigation({ items }: { items: ItemsPros[] }) {
  const selectedStyle = 'flex h-[40px] items-center grow gap-2 md:mx-1 rounded-md align-center  text-sm font-medium bg-blue-100 text-blue-500 md:flex-none md:justify-start md:p-1  md:px-3'
  const unSelectedStyle = 'bg-transparent flex h-[40px] items-center grow gap-2 md:mx-1 rounded-md align-center  text-sm font-medium hover:bg-blue-50 hover:text-blue-500 md:flex-none md:justify-start md:p-1  md:px-3 text-gray-700'
  const {dataUser} = useUserData()
  const pathname = usePathname()
  const pahtDashboard = dataUser?.id? `/${dataUser?.id}`:`/visitante`
  return (
    <>
      {items.map((item) => (
          <Link key={item.link} href={item.link.includes('/dashboard')? `${item.link}/${pahtDashboard}`:`${item.link}`}className={`${pathname.includes(item.link) ? clsx(selectedStyle) : clsx(unSelectedStyle)}`}>
            <item.icon size={18} />
            {item.title}
        </Link>
      ))}
  
    </>
  )
}
