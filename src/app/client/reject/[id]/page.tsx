import RejectForm from "@/components/clientSpace/quote/RejectForm";
import { getQuote } from "@/actions/quotes/quotes-actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function RejectPage({params}: Props) {

  const {quote} = await getQuote(params.id);

  return (
    <RejectForm company={quote.company}/>
  );
}