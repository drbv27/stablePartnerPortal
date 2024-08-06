'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';
import { useTotalProducts } from '@/store/StaticProductT';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { initialData } from '@/seed/seed';

interface Props {
  product: Product;
}

export const ProductGridItem = ( { product }: Props ) => {
  const {totalProducts, addProducts} = useTotalProducts();
  const [ count, setCount ] = useState( 0 );

  const onQuantityChanged = ( value: number ) => {
    if ( count + value < 1 ) return;
    setCount( count + value );
  };

/*   const [ displayImage, setDisplayImage ] = useState( `https://api.nevtis.com/marketplace/files/list/${product.images[ 0 ]}` ); */
      const [displayImage, setDisplayImage] = useState(
        product.images && product.images.length > 0
          ? `https://api.nevtis.com/marketplace/files/list/${product.images[0]}`
          : 'default_image_url'
      );

  const productS = initialData.products.find( product => product.slug === product.slug );
  
  const initialProduct = {
    id: String(product._id), 
    title: product?.title,
    description: product?.description,
    image: "five",
    inStock: 0,
    price: product?.price,
    sizes: ["S", "M", "L", "XL", "XXL"],
    slug: product.slug,
    tags: ["shirt"],
    type: "phone",
    category: "services",
    total: count,
    recurrent: product?.recurrent ?? false,
  }

  /* const handleAddProduct = () => { addProducts([initialProduct]) } */
  const handleAddProduct = () => {
    if (count > 0) {
      addProducts([initialProduct]);
      setCount(0);
    }
  }
  //console.log(product.images[0])
  //console.log(product)
  //console.log(totalProducts)

  return (
    <div className="rounded-md overflow-hidden fade-in">
      {/* <div href={ `/dashboard/newQuote/quote/product/${ product.slug }` }> */}
      <div>
        <Image
          src={ `${ displayImage }` }
          alt={ product.title }
          className="w-3/4 mx-auto md:w-full object-cover rounded-lg shadow-xl"
          width={ 500 }
          height={ 500 }
          onMouseEnter={() => setDisplayImage(product.images && product.images[1] ? `https://api.nevtis.com/marketplace/files/list/${product.images[1]}` : '/logo.png')}
          onMouseLeave={() => setDisplayImage(product.images && product.images[0] ? `https://api.nevtis.com/marketplace/files/list/${product.images[0]}` : '/logo.png')}
/*           onMouseEnter={ () => setDisplayImage( `https://api.nevtis.com/marketplace/files/list/${product.images[ 1 ]}` )  }
          onMouseLeave={ () => setDisplayImage( `https://api.nevtis.com/marketplace/files/list/${product.images[ 0 ]}` ) } */
        />
      </div>

      <div className="p-2 md:p-4 flex flex-col">
        <Link
          className="text-center text-sm md:text-md hover:text-orange-600"
          href={ `/dashboard/newQuote/quote/product/${ product.slug }` }>
          { product.title }
        </Link>
        <span className="text-center font-bold">${ product.price.toFixed(2) }</span>
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