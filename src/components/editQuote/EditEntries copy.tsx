'use client'
import React,{useState} from 'react'
import TopbarEdit from '../TopBarEdit'
import { MdSkipNext } from 'react-icons/md'
import { useTotalEntrieProducts } from '@/store/ManualEntries'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'

const EditEntries = ({quote,id}:any) => {
    const [eProducts, setEProducts] = useState(quote.quote.totalEntrieProducts)
    const { setEntrieProducts } = useTotalEntrieProducts()
    const { register, handleSubmit } = useForm()
    const router = useRouter()

    const handleNext = () => {
        setEntrieProducts(eProducts)
        router.push(`/dashboard/editQuote/cart/${id}`)
    }

    const onSubmit: SubmitHandler<any> = (data) => {
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            title: data.title,
            description: data.description,
            price: data.price,
            chargetype: data.chargetype,
            total: data.price * data.quantity,
            recurrent: data.chargetype === 'monthly' ? true : false,
            quantity: data.quantity
        }
        setEProducts([...eProducts,newProduct])
    }

    /* console.log(eProducts)
    console.log(quote)
    console.log(id) */
  return (
    <div className='h-[100vh] flex flex-col'>
    <div className='h-[75vh]'> 
      <TopbarEdit id={id}/>
      <div >
        <div className="px-6">
          <h2 className="text-center text-2xl text-orange-900">Tell us about the service or product</h2>
          <p>Please fill in all the fields below to add to the quote.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-8 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 items-baseline mt-2 border-b border-orange-950 py-2">
            <label>Title or name (for service or product)</label>
            <input type="text" {...register('title',{ required:true })} className="px-1"/>
          </div>
          <div className="grid md:grid-cols-2 items-baseline mt-2 border-b border-orange-950 py-2">
            <label>Description</label>
            <textarea rows={4} {...register('description',{ required:true })} className="px-1"/>
          </div>
          <div className="grid grid-cols-2 items-baseline mt-2 border-b border-orange-950">
            <label>Quantity</label>
            <input type="number" {...register('quantity',{ required:true })} className="px-1 text-right"/>
          </div>
          <div className="grid grid-cols-2 items-baseline mt-2 border-b border-orange-950">
            <label>Price</label>
            <input type="number" step={0.01} {...register('price',{ required:true })} className="px-1 text-right"/>
          </div>
          <div className="grid grid-cols-2 items-baseline mt-2 border-b border-orange-950">
            <label>Charge type</label>
            <select {...register('chargetype',{required:true})} className="text-right">
              <option value="monthly">Monthly</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
          <div className="mt-4 flex flex-col justify-start">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">Add</button>
            <button type="button" className="bg-orange-500 p-1 rounded-md flex ms-auto mt-1 me-1 mb-1" onClick={handleNext}>
              <span className="text-lg text-gray-200">Next </span> <MdSkipNext className="text-gray-200" size={28}/>
            </button>
          </div>

        </form>

      </div>
    </div>
    <div className='h-[25vh] overflow-y-auto'>
      {eProducts.map((product:any) => (
        <div key={product.id} className='border border-gray-300 shadow-md rounded-lg px-2 py-1 mt-2 flex ml-4 mr-4'>
          <div className='grow px-2'>
            <div className='flex flex-col md:flex-row md:justify-between'>
              <h3><span className='font-semibold'>Title: </span>{product.title}</h3>
              <p><span className='font-semibold'>Description: </span><span>{product.description}</span></p>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between'>
              <p ><span className='font-semibold'>Quantity: </span><span>{product.quantity}</span></p>
              <p><span className='font-semibold'>Price: $</span><span>{product.price}</span></p>
              <p><span className='font-semibold'>ChargeType: </span> <span>{product.chargetype}</span></p>
            </div>
          </div>
          <div>
            <button 
                className='bg-red-500 text-white font-semibold p-2 m-2 rounded-md'
                onClick={()=>setEProducts(eProducts.filter((item:any) => item.id !== product.id))}
            >
                X
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default EditEntries