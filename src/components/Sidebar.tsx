'use client'
import Image from 'next/image'
import { IoBrowsersOutline, IoCalculator, IoLogoReact } from 'react-icons/io5'
import { FaFileCirclePlus, FaFileInvoice, FaFileCircleCheck, FaUserPlus,FaFileSignature, FaTags, FaUserGear, FaRegCircleUser, FaFilePdf } from 'react-icons/fa6'
import { LiaUserTagSolid } from 'react-icons/lia'
import SidebarMenuItem from './SidebarMenuItem'
import { LogoutButton } from './LogoutButton'
import { useSession, signOut } from "next-auth/react";
import UserName from './UserName'

interface SidebarProps {
  userType?: string;
}

interface User {
  name?: string;
  email?: string;
  profilePhoto?: string;
  _id?: string;
}

interface Session {
  expires: string;
  user?: User;
}


const Sidebar = ({ userType }: SidebarProps) => {
  const { data: session, status } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
  const photoUrl = 'https://api.nevtis.com/marketplace/files/list/'
  const menuItems = [
    {
      path: '/dashboard/main',
      icon: <IoBrowsersOutline size={25} />,
      icon2: <IoBrowsersOutline size={20} />,
      title: 'Dashboard',
      subtitle: ''
    },
    {
      path: '/dashboard/newQuote/company',
      icon: <FaFileCirclePlus size={25} />,
      icon2: <FaFileCirclePlus size={20} />,
      title: 'New Quote',
      subtitle: ''
    },
    {
      path: '/dashboard/manageQuote',
      icon: <FaFileInvoice size={25} />,
      icon2: <FaFileInvoice size={20} />,
      title: 'Manage Quote',
      subtitle: ''
    },
    {
      path: '/dashboard/newLead',
      icon: <LiaUserTagSolid size={25} />,
      icon2: <LiaUserTagSolid size={20} />,
      title: 'New Lead',
      subtitle: ''
    },
    {
      path: '/dashboard/leadList',
      icon: <FaTags size={25} />,
      icon2: <FaTags size={20} />,
      title: 'Leads List',
      subtitle: ''
    },

/*     {
      path: '/dashboard/manageQuote',
      icon: <FaFileInvoice size={30} />,
      icon2: <FaFileInvoice size={20} />,
      title: 'Manage Quote',
      subtitle: 'Edit'
    }, */
    ...((session?.user as any)?.role === 'admin' ? [
/*       {
        path: '/dashboard/manageQuote',
        icon: <FaFileInvoice size={30} />,
        icon2: <FaFileInvoice size={20} />,
        title: 'Manage Quote',
        subtitle: 'Edit/approve'
      }, */
      {
        path: '/dashboard/aproveQuote',
        icon: <FaFileSignature size={25} />,
        icon2: <FaFileSignature size={20} />,
        title: 'Approve Contract',
        subtitle: ''
      },
      {
        path: '/dashboard/downloadContracts',
        icon: <FaFilePdf size={25} />,
        icon2: <FaFilePdf size={20} />,
        title: 'Check Contract',
        subtitle: ''
      },
    ] : []),
    {
      path: '/dashboard/settings',
      icon: <FaUserGear size={25} />,
      icon2: <FaUserGear size={20} />,
      title: 'Settings',
    },
  ];
  /* console.log(user.user) */
  //console.log(session?.user)
    return (
        <div id="menu" 
          /* style={{width : '400px'}} */
          className="w-[15vw] md:w-[15vw] bg-orange-950 min-h-screen z-10 text-slate-300 left-0 flex flex-col justify-between "
        >
          <div>
            <div id="logo" className="my-2 md:my-4 px-2 md:px-6">
              <h1 className="flex flex-col md:flex-row items-center text-lg md:text-2xl font-bold text-white">
                {/* <IoLogoReact className="mr-2 text-blue-500" size={25} /> */}
                <Image
                  className='rounded-full w-8 h-8 md:w-12 md:h-12'
                  src='/isotipo.png'
                  alt='logo'
                  width={25}
                  height={25}
                />
                <span className='md:block hidden'><span className='text-orange-600'>N</span> Dash</span>
              </h1>
              <p className="text-slate-500 text-sm md:block hidden text-center">Partner portal</p>
            </div>
            <div id="profile" className="px-6 py-1 md:py-4">
              <p className="text-xs md:text-base text-slate-500md:block hidden">Welcome <span className='invisible md:visible'>back</span></p>
              <a href="#" className="flex flex-col space-x-2 items-center">
                <span>
{/*                   <Image 
                    className="md:visible invisible rounded-full w-6 h-6 md:w-8 md:h-8" 
                    src={`${photoUrl}${session!.user!.profilePhoto}`} 
                    alt="user avatar"
                    width={50}
                    height={50}
                  /> */}
                  {session?.user?.profilePhoto ? (
                    <Image 
                      src={`${photoUrl}${session.user.profilePhoto}`}
                      className="md:visible invisible rounded-full w-6 h-6 md:w-8 md:h-8" 
                      alt="User Image" 
                      width={50} 
                      height={50} 
                    />
                    ) : (
                    <FaRegCircleUser size={25}  className='text-white'/>
                  )}
                </span>
                <UserName />
              </a>
            </div>
          </div>
          <div id="nav" className="w-full px-1.5 md:px-4">
            {
              menuItems.map( item => (
                <SidebarMenuItem  
                  key={item.title} {...item}
                />
              ))
            }
          </div>
          <div className="px-2 md:px-6 md:mx-6 py-4 flex justify-between items-center border-t">
            <LogoutButton />
          </div>
        </div>
    )
}

export default Sidebar