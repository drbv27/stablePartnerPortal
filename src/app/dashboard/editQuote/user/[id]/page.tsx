import EditUsers from '@/components/editQuote/EditUsers'
import { getQuote } from "@/actions/quotes/quotes-actions";
import React from 'react'
import EditUsersForm from '@/components/editQuote/EditUsersForm';
import TopbarEdit from '@/components/TopBarEdit';

interface Props {
    params: {
      id: string;
    };
  }

const EditUserpage = async ({params}: Props) => {
    const {quote} = await getQuote(params.id);
  return (
    <>
    <TopbarEdit id={params.id}/>
    <EditUsersForm quote={quote}/>
    </>
  )
}

export default EditUserpage