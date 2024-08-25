import ContractsTable from "@/components/ContractsTable"
import { getContracts } from "@/actions/payments/payment-actions"
import { getQuotes } from "@/actions/quotes/quotes-actions";

const downloadContractsPage = async () => {

    const {contracts} = await getContracts();
    const {quotes} = await getQuotes();
    //console.log("contracts",contracts)

  return (
    <ContractsTable quotes={quotes}/>
  )
}

export default downloadContractsPage



/* import QuotesTable from "@/components/QuotesTable";
import { getQuotes } from "@/actions/quotes/quotes-actions"


const ManageQuotePage = async () => {

    const {quotes} = await  getQuotes();
    console.log("quotes",quotes)

    return (
      <div>
        <h1 className="text-2xl text-center text-orange-700 font-semibold">Manage Quotes</h1>
          <QuotesTable quotes={quotes}/>
      </div>
    )
  }
  
  export default ManageQuotePage */