import { getQuote } from "@/actions/quotes/quotes-actions";
import { getContract } from "@/actions/payments/payment-actions";
import ContractFinal from "@/components/clientSpace/contract/ContractFinal";

interface Props {
    params: {
      id: string;
    };
  }

const IndividualContractPage = async ({params}: Props) => {
    const {quote} = await getQuote(params.id);
    const contract = await getContract(params.id);
    
    return (
        <div className="h-[99vh] w-[85vw] overflow-y-auto">
            <ContractFinal data={quote} id={params.id} contract={contract}/>
        </div>
    )
}

export default IndividualContractPage