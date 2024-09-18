
import { getQuote } from "@/actions/quotes/quotes-actions";
import ContractPage from '@/components/clientSpace/contract/ContractPage';

interface Props {
    params: {
      id: string;
    };
  }



export default async function QuotePageC({params}: Props) {
  
  const {quote} = await getQuote(params.id);
  //console.log(params.id)
  //console.log(quote);
  return (
    <div className='w-full overflow-y-auto'>
      <ContractPage data={quote} id={params.id}/>  
    </div>
  );
}