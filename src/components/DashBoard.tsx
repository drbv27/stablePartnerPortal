'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react";
/* import { useUserType } from "@/store/userStore" */

interface User {
    name?: string;
    email?: string;
    image?: string;
    role: string; // Add this line
  }
  
  interface Session {
    user: User;
  }

const DashBoard = ({ quotes: { quotes }, announcements: { announcements } }: any) => {
    const { data: session, status } = useSession() as { data: Session | null, status: string };
    //console.log(quotes)
    //console.log(announcements)
    //console.log(userType)
    //console.log(session)
    let userType = "seller"
    if(session && session.user) {
        userType = session.user.role
    }
    

  return (
    <div className="w-[85vw]">
        <h1 className="text-center font-semibold text-4xl text-orange-700 border-b-2 mt-1">Dashboard</h1>
        <div className="flex flex-col w-full">
            <div className="flex w-full justify-evenly my-2 p-2 border-b-2">
                <div /* href="/dashboard/manageQuote" */ className="bg-slate-200 py-2 px-6 rounded-lg shadow-lg hover:bg-orange-200">
                    <h2 className="font-semibold text-orange-700"> New Quotes</h2>
                    <div className="text-center font-bold text-2xl text-orange-700">
                    {/* {(quotes && session) && quotes.filter((quote: any) => userType === 'admin' ? quote.status === 'new' : quote.status === 'new' && quote.user.email === session?.user.email).length} */}
                    {(quotes && session) && quotes.filter((quote: any) =>  quote.status === 'new' ).length}
                    </div>
                </div>
                <div /* href="/aproveQuote" */ className="bg-orange-200 p-2 rounded-lg shadow-lg hover:bg-slate-200">
                    <h2 className="font-semibold text-slate-600">Signed Quotes</h2>
                    <div className="text-center font-bold text-2xl text-slate-600">
                    {/* {(quotes && session) && quotes.filter((quote: any) => userType === 'admin' ? quote.status === 'approved' : quote.status === 'approved' && quote.user.email === session?.user.email).length} */}
                    {(quotes && session) && quotes.filter((quote: any) => quote.status === 'signed' ).length}
                    </div>
                </div>
                <div /* href="/aproveQuote" */ className="bg-slate-200 p-2 rounded-lg shadow-lg hover:bg-slate-200">
                    <h2 className="font-semibold text-orange-700">Approved Quotes</h2>
                    <div className="text-center font-bold text-2xl text-orange-700">
                    {/* {(quotes && session) && quotes.filter((quote: any) => userType === 'admin' ? quote.status === 'approved' : quote.status === 'approved' && quote.user.email === session?.user.email).length} */}
                    {(quotes && session) && quotes.filter((quote: any) => quote.status === 'approved' ).length}
                    </div>
                </div>
            </div>
            <div className="mx-4 my-2 bg-slate-100 p-4 shadow-2xl h-[75vh] rounded-md">
                <h2 className="text-center text-2xl text-orange-700 border-b-2">Announcements</h2>
                <div className="bg-white h-[90%] overflow-y-auto">
                    {announcements && announcements.map((announcement: any) => (
                        <div key={announcement._id} className="p-2 border border-b-orange-100">
                            <h3 className="font-semibold text-orange-700">{announcement.title}: </h3>
                            <p>{announcement.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashBoard