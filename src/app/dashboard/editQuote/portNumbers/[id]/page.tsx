import React, { useState } from "react";
import TopbarEdit from '@/components/TopBarEdit'
import { getQuote } from "@/actions/quotes/quotes-actions";
import EditPortNumbers from "@/components/editQuote/EditPortNumbers";

interface Props {
    params: {
      id: string;
    };
  }

const PortNumbersEdit = async ({params}: Props) => {
  const quote = await getQuote(params.id)
  return (
    <div>
        <TopbarEdit id={params.id}/>
        <EditPortNumbers quote={quote} id={params.id}/>
    </div>
  )
}

export default PortNumbersEdit