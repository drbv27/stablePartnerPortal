/* 'use client' */
import CompanyTable from '@/components/CompanyTable';
import MonthlyCharges from '@/components/MonthlyCharges';
import OneTimeCharges from '@/components/OneTimeCharges';
import PromoCode from '@/components/PromoCode';
import SendComponent from '@/components/SendComponent';
import SpecialTerms from '@/components/SpecialTerms';
import { getQuote } from "@/actions/quotes/quotes-actions";
import EditedOneTimeCh from '@/components/editQuote/EditedOneTimeCh';
import SendCompoEdit from '@/components/editQuote/SendCompoEdit';
/* import { useTotalProducts } from '@/store/StaticProductT'; */

interface Props {
  params: {
    id: string;
  };
}

const EditCartPage = async ({params}: Props) => {
  const quote = await getQuote(params.id)
  //console.log("cuota",quote)
  return (
    <div className="h-[94vh] md:h-[99vh] overflow-y-auto shadow-lg">
      <h2 className="text-center font-bold text-lg text-orange-900">Review Your Edited Quote</h2>
      <CompanyTable />
      <MonthlyCharges />
      <EditedOneTimeCh />
      <PromoCode />
      <SpecialTerms especialTerms={quote.quote.specialTerms}/>
      <SendCompoEdit params={params}/>
      {/* <SendComponent /> */}
    </div>
  );
}

export default EditCartPage


/* export default function EditCartPage({params}: Props) {
    const { totalProducts } = useTotalProducts();
    console.log(totalProducts)
  return (
    <div className="h-[94vh] md:h-[88vh] overflow-y-auto">
      <h2 className="text-center font-bold text-lg text-orange-900">Review Your Edited Quote</h2>
      <CompanyTable />
      <MonthlyCharges />
      <EditedOneTimeCh />
      <PromoCode />
      <SpecialTerms />
      <SendCompoEdit params={params}/>
      <SendComponent />
    </div>
  );
} */