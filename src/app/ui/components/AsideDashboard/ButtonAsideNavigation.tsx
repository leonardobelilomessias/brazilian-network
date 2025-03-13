import clsx from "clsx"
import { LucideProps } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"


interface ItemsPros { link: string, title: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, status?: string }

export function ButtonAsideNavigation({ items }: { items: ItemsPros[] }) {
  const selectedStyle = 'flex h-[40px] items-center grow gap-2 md:mx-1 rounded-md align-center  text-sm font-medium bg-blue-100 text-blue-500 md:flex-none md:justify-start md:p-1  md:px-3'
  const unSelectedStyle = 'bg-transparent flex h-[40px] items-center grow gap-2 md:mx-1 rounded-md align-center  text-sm font-medium hover:bg-blue-50 hover:text-blue-500 md:flex-none md:justify-start md:p-1  md:px-3 text-gray-700'
  
  const pathname = usePathname()
  return (
    <>
      {items.map((item) => (
          <Link
          //   rel="noreferrer noopener"
          key={item.link}
          href={item.link}
          className={`${pathname === item.link ? clsx(selectedStyle) : clsx(unSelectedStyle)}`}
        
        >
          <item.icon size={18} />
          {item.title}
          {/* {element.status && <FeatureLabel status={element.status}/>} */}
        </Link>
      ))}

    
    </>
  )
}

function FeatureLabel({ status }: { status: string }) {
  const borderColor = status === 'Novo' ? 'border-blue-500' : 'border-gray-500';
  const textColor = status === 'Novo' ? 'text-blue-500' : 'text-gray-500';
  return (
    <div className="flex items-center gap-2">
      <p className={`rounded text-xs border ${borderColor} p-0.5 ${textColor}`}>{status}</p>
    </div>
  )
}