
import { getQuote } from "@/actions/quotes/quotes-actions";
import { getContract } from "@/actions/payments/payment-actions";
import ContractSigned from '@/components/clientSpace/contract/ContractSigned';

interface Props {
    params: {
      id: string;
    };
  }



export default async function QuotePageC({params}: Props) {
  
  const {quote} = await getQuote(params.id);
  const contract = await getContract(params.id);
  //console.log(params.id)

  //console.log(quote);
  return (
    <div className='w-full overflow-y-auto'>
      <ContractSigned data={quote} id={params.id} contract={contract}/>  
    </div>
  );
}