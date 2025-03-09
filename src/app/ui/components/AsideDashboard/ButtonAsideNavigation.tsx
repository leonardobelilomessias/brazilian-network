import clsx from "clsx"
import { LucideProps } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export function ButtonAsideNavigation({element}:{element:{link:string,title:string, icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>}}){
    const pathname = usePathname()
    return(
        <>
  
                    <Link
                    //   rel="noreferrer noopener"
                      key={element.link}
                      href={element.link}
                      className={clsx(
                        'flex h-[40px] items-center grow gap-2 md:mx-1 rounded-md align-center  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-1 md:px-3',
                        {
                          'bg-sky-100 text-blue-600': pathname === element.link,
                        },
                      )}
                    >
                        <element.icon size={18}/>
                      {element.title}
                    </Link>
        </>
    )
  }