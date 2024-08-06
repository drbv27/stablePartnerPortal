import RejectForm from "@/components/clientSpace/quote/RejectForm";
import { getQuote } from "@/actions/quotes/quotes-actions";


interface Props {
  params: {
    id: string;
  };
}



export default async function RejectPage({params}: Props) {

  const {quote} = await getQuote(params.id);
/*   let quoteData = null;
  if(quote){
    quoteData = quote;
  }

  if (!quoteData) {
    return <div>No data found</div>;
  } */


console.log(quote.company)
  return (
   
    <RejectForm company={quote.company}/>
  );
  }