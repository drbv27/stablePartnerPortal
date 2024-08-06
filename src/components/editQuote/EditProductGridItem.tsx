'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { useTotalProducts } from '@/store/StaticProductT';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { useTotalConference } from '../../store/UserAccounts';


interface ProductProps {
  product: {
    _id: string;
    description: string;
    images?: string[];
    inStock: number;
    price: number;
    recurrent?: boolean;
    short: string;
    slug: string;
    title: string;
    total: number;
    type: string;
    category: any;
  };
  quantity: number;
}

export const EditProductGridItem = ( { product }: any ) => {
  const {totalProducts, addProducts} = useTotalProducts();
  const [ count, setCount ] = useState( 0 );

  const onQuantityChanged = ( value: number ) => {
    if ( count + value < 1 ) return;
    setCount( count + value );
  };

      const [displayImage, setDisplayImage] = useState(
        product.images && product.images.length > 0
          ? `https://api.nevtis.com/marketplace/files/list/${product.product.images[0]}`
          : '/logo.png'
      );

  const handleAddProduct = () => {
    console.log("added product")
    /* addProducts(product, count);
    setCount(0); */
  }

  //console.log(product.images[0])
  //console.log(product)
  //console.log(totalProducts)
console.log(product.product)
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <div>
        <Image
          src={ `${ displayImage }` }
          alt={ product.title }
          className="w-3/4 mx-auto md:w-full object-cover rounded-lg shadow-xl"
          width={ 500 }
          height={ 500 }
          onMouseEnter={() => setDisplayImage(product.product.images && product.product.images[1] ? `https://api.nevtis.com/marketplace/files/list/${product.product.images[1]}` : '/logo.png')}
          onMouseLeave={() => setDisplayImage(product.product.images && product.product.images[0] ? `https://api.nevtis.com/marketplace/files/list/${product.product.images[0]}` : '/logo.png')}
        />
      </div>

      <div className="p-2 md:p-4 flex flex-col">
        <Link
          className="text-center text-sm md:text-md hover:text-orange-600"
          href={ `/dashboard/newQuote/quote/product/${ product.product.slug }` }>
          { product.product.title }
        </Link>
        {/* <span className="text-center font-bold">${ product.price.toFixed(2) }</span> */}
      </div>

      <div className="w-full flex justify-between">
        <button onClick={ () => onQuantityChanged( -1 ) }>
          <IoRemoveCircleOutline className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-700 hover:text-orange-600" />
        </button>
        <span className="w-10 md:w-20 mx-3 px-5 text-gray-500 text-center rounded font-semibold text-lg">
          { count }
        </span>
        <button onClick={ () => onQuantityChanged( +1 ) }>
          <IoAddCircleOutline className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-600 hover:text-orange-500" />
        </button>
      </div>
      <button  
          className="w-full btn-primary bg-orange-600 hover:bg-orange-400 my-4 p-2 rounded-xl text-white font-semibold" 
          onClick={handleAddProduct}
      >
          Add to cart
      </button>
    </div>
  );
};