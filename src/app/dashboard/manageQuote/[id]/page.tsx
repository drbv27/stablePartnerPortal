
import { getQuote } from "@/actions/quotes/quotes-actions";
import EditQuote from '@/components/quotes/EditQuote';

interface Props {
    params: {
      id: string;
    };
  }

export default async function QuotePage({params}: Props) {
  
  const {quote} = await getQuote(params.id);

    //console.log(quote);
  return (
    <EditQuote quote={quote}/>
  );
}