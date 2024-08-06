'use client'
import { useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye } from 'react-icons/fa'


interface User {
    name?: string;
    email?: string;
    image?: string;
    _id?: string;
  }

  interface Session {
    expires: string;
    user?: User;
  }

const LeadsTable = ({leads}:any) => {
    const { data: session, status } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };;
    const router = useRouter();
    //console.log(session)
    //console.log(leads)
  return (
    <div className="h-[90vh] overflow-y-auto p-2">
    <h1 className="text-2xl font-semibold text-orange-900 text-center">My Leads</h1>
    <div className="w-full flex justify-between bg-orange-800 text-white py-1 px-1">
      <h2 className="w-[22%]">Name</h2>
      <p className="w-[22%]">Email</p>
      <p className="w-[22%]">Phone</p>
      <p className="w-[22%]">Company</p>
      <div className="w-[12%]">action</div>
    </div>
    <div className="border border-slate-200 shadow-lg">
    {leads && leads.filter((lead: any) => lead.seller === session!.user!._id).map((lead:any) => (
      <div key={lead._id} className="w-full flex justify-between px-1 border border-b-1">
        <h2 className="w-[22%]">{lead.name}</h2>
        <p className="w-[22%]">{lead?.email}</p>
        <p className="w-[22%]">{lead?.phone}</p>
        <p className="w-[22%]">{lead?.companyName}</p>
        <Link href={`/dashboard/leadList/${lead._id}`} className="w-[12%]"><FaEye className="text-orange-700"/></Link>
      </div>
    ))}
    </div>
  </div>
  )
}

export default LeadsTable