import { ProductGrid } from "@/components/ProductGrid";
import { Title } from "@/components/Title";
import { initialData } from "@/seed/seed";
import { Product, Category } from "@/interfaces";

import { getProducts } from "@/actions/products/product-actions";
import NextButton from "@/components/NextButton";

const products = initialData.products;

export default async function MarketPage() {
  const { products = [], errorMsg } = await getProducts();
  if (errorMsg) return <h1>{errorMsg}</h1>;
  //console.log(products)

  return (
    <>
      <div className="w-full flex items-end">
        <Title
          title="Nevtis Market"
          subtitle="all products available for sale"
          className="mb-2 ml-4 text-orange-700"
        />
        <NextButton route="/dashboard/newQuote/quote/entries" />
      </div>
      <div className="w-full h-[70vh]">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
