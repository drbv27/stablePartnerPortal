
import React from 'react'
import { getQuote } from "@/actions/quotes/quotes-actions";
import EditEntries from '@/components/editQuote/EditEntries';

interface Props {
    params: {
      id: string;
    };
  }

const EntriesEdit = async ({params}: Props) => {
  const quote = await getQuote(params.id)
  //console.log(quote.quote.totalEntrieProducts)
  return (
    <EditEntries quote={quote} id={params.id}/>
  )
}

export default EntriesEdit

