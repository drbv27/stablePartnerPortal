import Image from "next/image";
import {
  IoBrowsersOutline,
  IoCalculator,
  IoLogoReact,
  IoKeypadSharp,
} from "react-icons/io5";
import {
  FaFileCirclePlus,
  FaFileInvoice,
  FaFileCircleCheck,
  FaUserPlus,
  FaUserGear,
  FaBuildingCircleCheck,
  FaIdCard,
  FaSquarePhone,
  FaFile,
  FaCartShopping,
} from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { IoPerson, IoKeypadOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import SidebarMenuItem from "./SidebarMenuItem";
import TopbarMenuItem from "./TopbarMenuItem";

const menuItems = [
  {
    path: "/dashboard/newQuote/company",
    icon: <FaBuildingCircleCheck size={30} />,
    icon2: <FaBuildingCircleCheck size={20} />,
    title: "Company",
    subtitle: "Accounts",
  },
  {
    path: "/dashboard/newQuote/quote/user",
    icon: <FaIdCard size={30} />,
    icon2: <FaIdCard size={20} />,
    title: "User",
    subtitle: "Accounts",
  },
  {
    path: "/dashboard/newQuote/quote/numberPorts",
    icon: <IoKeypadOutline size={30} />,
    icon2: <IoKeypadOutline size={20} />,
    title: "Port",
    subtitle: "Numbers",
  },
  {
    path: "/dashboard/newQuote/quote/market",
    icon: <BsShop size={30} />,
    icon2: <BsShop size={20} />,
    title: "Market",
    subtitle: "place",
  },
  /*   {
    path: '/dashboard/newQuote/quote/equipment',
    icon: <FaSquarePhone size={30} />,
    icon2: <FaSquarePhone size={20} />,
    title: 'Equipement',
    subtitle: 'Hardware'
  }, */
  {
    path: "/dashboard/newQuote/quote/entries",
    icon: <FaFile size={30} />,
    icon2: <FaFile size={20} />,
    title: "Entries",
    subtitle: "manually add",
  },
  {
    path: "/dashboard/newQuote/shopping",
    icon: <FaCartShopping size={30} />,
    icon2: <FaCartShopping size={20} />,
    title: "Checkout",
    subtitle: "Shopping cart",
  },
  /*   {
    path: `/newQuote/manage/${quoteId}`,
    icon: <LuClipboardEdit size={30} />,
    icon2: <LuClipboardEdit size={20} />,
    title: 'Check and send',
    subtitle: 'Quote email'
  }, */
];

const Topbar = () => {
  return (
    <div
      id="menu"
      /* style={{width : '400px'}} */
      className="w-full bg-orange-950 h-[10vh] z-10 text-slate-300 left-0 pt-1"
    >
      <div id="nav" className="w-full px-1.5 md:px-4 flex justify-evenly">
        {menuItems.map((item) => (
          <TopbarMenuItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Topbar;
