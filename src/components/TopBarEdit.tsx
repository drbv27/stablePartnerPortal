
import Image from 'next/image'
import { IoBrowsersOutline, IoCalculator, IoLogoReact, IoKeypadSharp } from 'react-icons/io5'
import { FaFileCirclePlus, FaFileInvoice, FaFileCircleCheck, FaUserPlus, FaUserGear, FaBuildingCircleCheck, FaIdCard, FaSquarePhone, FaFile, FaCartShopping } from 'react-icons/fa6'
import { BsShop } from 'react-icons/bs'
import { IoPerson, IoKeypadOutline } from "react-icons/io5";
import { LuClipboardEdit } from 'react-icons/lu'
import SidebarMenuItem from './SidebarMenuItem'
import TopbarMenuItem from './TopbarMenuItem'




const TopbarEdit = ({id}:any) => {
  const menuItems = [
    {
      path: `/dashboard/editQuote/company/${id}`,
      icon: <FaBuildingCircleCheck size={30} />,
      icon2: <FaBuildingCircleCheck size={20} />,
      title: 'Company',
      subtitle: 'Edition'
    },
    {
      path: `/dashboard/editQuote/user/${id}`,
      icon: <FaIdCard size={30} />,
      icon2: <FaIdCard size={20} />,
      title: 'User',
      subtitle: 'Edition'
    },
    {
      path: `/dashboard/editQuote/portNumbers/${id}`,
      icon: <IoKeypadOutline size={30} />,
      icon2: <IoKeypadOutline size={20} />,
      title: 'Port Nos',
      subtitle: 'Edition'
    },
    {
      path: `/dashboard/editQuote/market/${id}`,
      icon: <BsShop size={30} />,
      icon2: <BsShop size={20} />,
      title: 'Market place',
      subtitle: 'Edition'
    },
    {
      path: `/dashboard/editQuote/entries/${id}`,
      icon: <FaFile size={30} />,
      icon2: <FaFile size={20} />,
      title: 'Entries',
      subtitle: 'Edition'
    },
    {
      path: `/dashboard/editQuote/cart/${id}`,
      icon: <FaCartShopping size={30} />,
      icon2: <FaCartShopping size={20} />,
      title: 'Checkout',
      subtitle: 'Edition'
    },
  
  ]
    return (
        <div id="menu" 
          className="w-full md:w-full bg-orange-400 h-[10vh] z-10 text-slate-300 left-0 pt-1">
          <div id="nav" className="w-full px-1.5 md:px-4 flex justify-evenly">
            {
              menuItems.map( item => (
                <TopbarMenuItem  
                  key={item.title} {...item}
                />
              ))
            }
          </div>
        </div>
    )
}

export default TopbarEdit