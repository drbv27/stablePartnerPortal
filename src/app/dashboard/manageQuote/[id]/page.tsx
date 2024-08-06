
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getQuote } from "@/actions/quotes/quotes-actions";
import { MdContactEmergency, MdContactMail, MdContactPhone, MdDomain, MdSkipNext } from 'react-icons/md';
import { FaCity, FaMapLocationDot, FaMapPin,FaFax, FaUsersLine, FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import { IoPerson } from "react-icons/io5";
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