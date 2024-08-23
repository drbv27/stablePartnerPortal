'use client'
import Link from "next/link"
import { FaEye,FaTrash } from "react-icons/fa6"
import { deleteQuote } from "@/actions/quotes/quotes-actions"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react";


const ApprovedsTable = (quotes:any) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleDelete = async (id:string) => {
        await deleteQuote(id);
        router.push('/manageQuote');
    }
    {if((session?.user as any)?.role !== 'admin') router.push('/dashboard/main')}
    //console.log(quotes.quotes)
  return (
    <div className="p-2 bg-slate-200 w-[80vw] ml-1 shadow-xl rounded-md h-[75vh]">
        <div className="w-full bg-orange-700 flex justify-between px-4 font-semibold text-white mt-1 rounded-t-md">
            <div className="w-[70%]">Company</div>
            <div className="w-[20%] text-center">Status</div>
            <div className="w-[10%]">Actions</div>
        </div>
        <div className=" bg-white overflow-y-auto">
            {quotes.quotes.filter((quote: any) => quote.status === "signed").map((quote:any) => (
                <div key={quote._id} className="flex justify-between border-b-2 border-orange-300 px-4">
                    <div className="w-[70%] py-1">{quote.company?.companyName}</div>
                    <div className="w-[20%] text-center py-1 font-semibold">{quote.status}</div>
                    <div className="w-[10%] text-right py-1 flex justify-end">
                        <Link href={`/dashboard/aproveQuote/${quote._id}`} className="text-xl text-orange-500 mr-1">
                            <FaEye />
                        </Link>
                        {/* <button onClick={()=>handleDelete(quote._id)} className="text-red-500 text-xl mr-1"><FaTrash /></button> */}
                    </div>
                </div>
            )).reverse()}
        </div>
    </div>
  )
}

export default ApprovedsTable