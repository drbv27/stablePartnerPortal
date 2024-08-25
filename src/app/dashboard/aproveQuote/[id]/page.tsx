/* 'use client' */
import { getQuote } from "@/actions/quotes/quotes-actions";
import { getContract } from "@/actions/payments/payment-actions";
import CompanyContract from "@/components/contracts/CompanyContract";
import MonthlyContract from "@/components/contracts/MonthlyContract";
import OneTimeCompany from "@/components/contracts/OneTimeCompany";
import PaymentContract from "@/components/contracts/PaymentContract";

interface Props {
    params: {
      id: string;
    };
  }


export default async function approvedQuotePage({params}: Props){
    const {quote} = await getQuote(params.id);
    const contract = await getContract(params.id);

    if(!quote || !contract){
        return <div>Loading...</div>
    }
    

    return (
      
        <div className="h-[99vh] overflow-y-auto">
          <CompanyContract company={quote.company} />
          <MonthlyContract quote={quote}/>
          <OneTimeCompany quote={quote}/>
          <PaymentContract contract={contract}/>
        </div>
      );
}