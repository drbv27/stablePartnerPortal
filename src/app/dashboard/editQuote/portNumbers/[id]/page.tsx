import React, { useState } from "react";
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts";
import { IoPerson, IoKeypadOutline } from "react-icons/io5";
import { FaFax, FaUsersLine, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { useRouter } from "next/navigation";
import { usePortNumbers } from "@/store/PortNumbersStore";
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