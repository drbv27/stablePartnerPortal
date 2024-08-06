'use client'
import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { MdSkipNext } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useTotalProducts } from '@/store/StaticProductT';
import Image from 'next/image'

const EditMarket = ({products,quote}:any) => {
    const [quoteProducts, setQuoteProducts] = useState(quote.totalProducts)
    const [marketProducts, setMarketProducts] = useState(products.map((productM:any) => {
        return {
            product: productM,
            quantity: 0
        }
    }))
    
    const { setProducts } = useTotalProducts();
    const router = useRouter();

    const handleDelete = (id:string) => {
        const newProducts = quoteProducts.filter((product:any) => product.product._id !== id)
        setQuoteProducts(newProducts)
    }
    const handleAdd = (id:string) => {
        const newProducts = quoteProducts.map((product:any) => {
            if(product.product._id === id){
                product.quantity += 1
            }
            return product
        })
        setQuoteProducts(newProducts)
    }
    const handleAddMarket = (id:string) => {
        const newProducts = marketProducts.map((product:any) => {
            if(product.product._id === id){
                product.quantity += 1
            }
            return product
        })
        setMarketProducts(newProducts)
    }
    const handleSubstract = (id:string) => {
        const newProducts = quoteProducts.map((product:any) => {
            if(product.product._id === id){
                product.quantity -= 1
            }
            return product
        })
        setQuoteProducts(newProducts)
    }
    const addToCart = (product:any) => {
        const newTotalProducts = [...quoteProducts,product]
        setQuoteProducts(newTotalProducts)
    }

    const handleAddToCart =()=>{
        setProducts(quoteProducts.map((product:any) => {
            return {
                id: product.product._id,
                title: product.product.title,
                description: product.product.description,
                image: product.product.images[0],
                inStock: product.product.inStock,
                price: product.product.price,
                sizes: product.product.sizes,
                slug: product.product.slug,
                tags: product.product.tags,
                type: product.product.type,
                category: product.product.category,
                total: product.quantity,
                recurrent: product.product.recurrent
            }
            })
        )
        router.push(`/dashboard/editQuote/entries/${quote._id}`)
    }

    return (
        <div className='w-full'>
            <div className='flex items-center justify-center mb-1 '>
                <div className='md:w-[60vw] p-2 shadow-md'>
                    <h2 className='bg-orange-500 font-semibold text-white text-center rounded-t-lg font-semibold'>Actual products</h2>
                    {quoteProducts && quoteProducts.length > 0 ? (
                        quoteProducts.map((product:any) => (
                            <div key={product.product._id} className='flex justify-between gap-4 border border-b-orange-500 border-l-orange-500 border-r-orange-500 px-1 py-1'>
                                <div className='flex gap-2'>
                                    <button onClick={()=>handleDelete(product.product._id)}>
                                        <IoCloseCircleOutline className='text-red-500 font-bold text-xl'/>
                                    </button>
                                    <h2>{product.product.title}</h2>
                                    <h2>{product.product.recurrent ? <span className='bg-orange-500 font-semibold text-white rounded text-xs p-0.5'>R</span>: <span className='bg-slate-500 font-semibold text-white rounded text-xs p-0.5'>OT</span>}</h2>
                                </div>
                                <div className='flex gap-2'>
                                    <h2 className='text-orange-500'>{`(${product.quantity})`}</h2>
                                    <h2>x</h2>
                                    <h2>{product.product.price}</h2>
                                    <button onClick={()=>handleAdd(product.product._id)}>
                                        <IoAddCircleOutline className='text-orange-500 font-bold text-lg'/>
                                    </button>
                                    <button onClick={()=>handleSubstract(product.product._id)}>
                                        <IoRemoveCircleOutline className='text-orange-500 font-bold text-lg'/>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 px-2 bg-gray-100 rounded-md">
                            <p className="text-lg font-semibold text-gray-600">No products selected</p>
                            <p className="text-sm text-gray-500">Add products from the marketplace below</p>
                        </div>
                    )}
                </div>
                <button 
                    className='bg-orange-500 text-white flex font-semibold p-1 rounded-md ml-1'
                    onClick={handleAddToCart}
                >
                    Save <MdSkipNext className='text-2xl'/>
                </button>
            </div>
            <hr />
            <h2 className='text-center text-xl font-semibold text-orange-800'>Add from marketplace</h2>
            <div className=' w-[98%] mt-8 flex flex-wrap gap-x-8 md:gap-x-2 h-[70vh] overflow-y-auto'>
                {marketProducts && marketProducts.map((product:any) => (
                    <div key={product.product._id} className='flex flex-col gap-1 w-[30vw] md:w-[20vw] items-center justify-center py-2'>
                        <Image src={`https://api.nevtis.com/marketplace/files/list/${product.product.images[0]}`} alt={product.product.title} width={130} height={130}/>
                        <div className='w-full'>
                            <h2 className='text-center font-bold'>{product.product.title}</h2>
                            <h2 className='text-center'>$ {product.product.price}</h2>
                            <div className='w-full flex justify-evenly'>
                                <button onClick={()=>handleSubstract(product._id)}>
                                    <IoRemoveCircleOutline className='text-orange-500 font-bold text-2xl'/>
                                </button>
                                <h2 className='text-center'>{product.quantity}</h2>
                                <button onClick={()=>handleAddMarket(product.product._id)}>
                                    <IoAddCircleOutline className='text-orange-500 font-bold text-2xl'/>
                                </button>
                            </div>
                            <div className='flex justify-center'>
                                <button 
                                    className='w-[60%] bg-orange-500 text-white font-bold py-1 rounded-md'
                                    onClick={()=>addToCart(product)}
                                >
                                    add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditMarket