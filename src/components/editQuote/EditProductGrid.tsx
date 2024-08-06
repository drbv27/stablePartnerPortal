import { Product } from '@/interfaces';
import { EditProductGridItem } from '@/components/editQuote/EditProductGridItem';

/* interface Props {
  products: Product[];
} */


export const EditProductGrid = ( { products }: any ) => {
  //console.log(products)
  return (
    <div className='h-[100%] overflow-y-auto'>
      <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        {
          products.map( (product:any) => (
            <EditProductGridItem
              key={ product.slug }
              product={ product }
            />
          ) )
        }

      </div>
    </div>
  );
};