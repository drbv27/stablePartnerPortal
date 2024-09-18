import React from 'react'
import { getProducts } from '@/actions/products/product-actions';
import EditMarket from '@/components/editQuote/EditMarket';
import { getQuote } from "@/actions/quotes/quotes-actions";
import TopbarEdit from '@/components/TopBarEdit';

interface Props {
  params: {
    id: string;
  };
}

const EditMarketPage = async ({params}: Props) => {
  const {quote} = await getQuote(params.id);
  const { products=[],errorMsg } =await getProducts();
  if(errorMsg) return <h1>{errorMsg}</h1>
  return (
    <div>
      <TopbarEdit id={params.id}/>
      <EditMarket products={products} quote={quote}/>
    </div>
  )
}

export default EditMarketPage