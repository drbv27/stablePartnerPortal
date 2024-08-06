'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  path: string,
  icon: JSX.Element,
  icon2: JSX.Element,
  title: string,
  subtitle?: string
}


const SidebarMenuItem = ({ path, icon, icon2, title, subtitle }:Props) => {
  const currentPath = usePathname()
  /* const firstPartOfPath = '/' + path.split('/')[1]; */
  const firstPartOfPath = '/' + path.split('/').slice(1, 3).join('/');
  //console.log("current",currentPath)
  //console.log("llega",path)
  //console.log("firstpart",firstPartOfPath)

  return (
    <Link href={path} 
    className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 ${(currentPath.startsWith(firstPartOfPath)) && "bg-orange-800 rounded"} hover:bg-white/5 transition ease-linear duration-150`}>
    <div>
      <div className="md:hidden">
        {icon2}
      </div>
      <div className="hidden md:block">
        {icon}
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-md font-bold leading-5 text-white hidden md:block">{title}</span>
      <span className="text-sm text-white/50 hidden md:block">{subtitle}</span>
    </div>
  </Link>
  )
}

export default SidebarMenuItem