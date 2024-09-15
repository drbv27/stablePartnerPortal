import React from 'react'
import { getQuote } from "@/actions/quotes/quotes-actions";
import EditCompanyForm from '@/components/editQuote/EditCompanyForm';
import Topbar from '@/components/TopBar';
import TopbarEdit from '@/components/TopBarEdit';

interface Props {
    params: {
      id: string;
    };
  }

const EditCompanypage = async ({params}: Props) => {
    const {quote} = await getQuote(params.id);
    console.log(params.id)
    console.log(quote)
  return (
    <>
      <TopbarEdit id={params.id}/>
      <EditCompanyForm quote={quote}/>
    </>
  )
}

export default EditCompanypage