import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: Product[];
}


export const ProductGrid = ( { products }: Props ) => {
  //console.log(products)
  return (
    <div className='h-[100%] overflow-y-auto'>
      <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        {
          products.map( product => (
            <ProductGridItem
              key={ product.slug }
              product={ product }
            />
          ) )
        }

      </div>
    </div>
  );
};