'use client'
import Link from "next/link"
import { FaEye,FaTrash,FaSpinner, FaRegFilePdf } from "react-icons/fa6"
import { deleteQuote } from "@/actions/quotes/quotes-actions"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react";


const ContractsTable = (quotes:any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleDelete = async (id:string) => {
        await deleteQuote(id);
        router.push('/dashboard/manageQuote');
    }
    //console.log(quotes)
    //console.log(session)
  return (
    <div className="p-2 bg-slate-200 w-[84vw] ml-1 shadow-xl rounded-xl h-[93vh] overflow-y-auto">
        <div className="w-full bg-orange-700 flex justify-between px-2 font-semibold text-white mt-1 rounded-t-md">
            <div className="w-[40%]">Company</div>
            <div className="w-[15%]">Status</div>
            {/* <div className="w-[15%]">Seller</div> */}
            <div className="w-[15%]">No</div>
            <div className="w-[15%]">Actions</div>
        </div>


        <div className="px-2 bg-white rounded-lg">
            {quotes !== undefined && 
                ((session?.user as any)?.role === "admin" 
                ? quotes.quotes.filter((quote: any) => ( quote.status==="approved" ))
                
                : quotes.quotes.filter((quote: any) => quote.user === (session?.user as any)?._id && (quote.status !== "approved" ))
                )
                .sort((a: any, b: any) => b.quoteNo - a.quoteNo)
                .map((quote:any) => (
                <div key={quote._id} className="flex justify-between border-b border-orange-400">
                    <div className="w-[40%] py-1">{quote.company?.companyName}</div>
                    <div className={`w-[15%] text-center py-1 font-bold ${quote.status === 'new' ? 'text-green-500' : 'text-red-500'}`}>{quote.status}</div>
                    <div>{quote.quoteNo}</div>
                    
                    <div className="w-[15%] text-right py-1 flex justify-end">
{/*                     {quote.pdf && quote.pdf !== "pdf" &&
                        <Link href={`${quote.pdf}`} className="text-xl text-red-400 hover:text-red-600 mr-1">
                            <FaRegFilePdf />
                        </Link>
                    } */}
                    <Link href={`/dashboard/downloadContracts/${quote._id}`} className="text-xl text-orange-400 hover:text-orange-500 mr-1">
                        <FaEye />
                    </Link>
                    </div>
                </div>
                ))
            }
        </div>

    </div>
  )
}

export default ContractsTable