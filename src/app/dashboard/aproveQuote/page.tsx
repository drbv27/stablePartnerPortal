import ApprovedsTable from "@/components/ApprovedsTable";
/* import QuotesTable from "@/components/QuotesTable"; */
import { getQuotes } from "@/actions/quotes/quotes-actions"




const AproveQuotePage = async () => {
  const {quotes} = await  getQuotes();
  //console.log("quotes",quotes)

  return (
    <div>
      <h1 className="text-center text-2xl font semibold">Quotes to be approved</h1>
        <ApprovedsTable quotes={quotes}/>
    </div>
  )
  }
  
  export default AproveQuotePage