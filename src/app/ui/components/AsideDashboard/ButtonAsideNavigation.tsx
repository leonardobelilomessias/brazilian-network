import clsx from "clsx"
import { LucideProps } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export function ButtonAsideNavigation({element}:{element:{link:string,title:string, icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, status?:string}}){
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
                      {/* {element.status && <FeatureLabel status={element.status}/>} */}
                    </Link>
        </>
    )
  }

  function FeatureLabel({status}:{status:string}){
    const borderColor = status === 'Novo' ? 'border-blue-500' : 'border-gray-500';
    const textColor = status === 'Novo' ? 'text-blue-500' : 'text-gray-500';
    return(
        <div className="flex items-center gap-2">
              <p className={`rounded text-xs border ${borderColor} p-0.5 ${textColor}`}>{status}</p>
        </div>
    )
  }