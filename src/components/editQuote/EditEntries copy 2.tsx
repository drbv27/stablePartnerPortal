"use client"
import React, { useState } from 'react'
import TopbarEdit from '../TopBarEdit'
import { MdSkipNext, MdDeleteForever } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import { useTotalEntrieProducts } from '@/store/ManualEntries'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'

const EditEntries = ({quote, id}: any) => {
    const [eProducts, setEProducts] = useState(quote.quote.totalEntrieProducts)
    const { setEntrieProducts } = useTotalEntrieProducts()
    const { register, handleSubmit, reset } = useForm()
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
            price: parseFloat(data.price),
            chargetype: data.chargetype,
            total: parseFloat(data.price) * parseInt(data.quantity),
            recurrent: data.chargetype === 'monthly',
            quantity: parseInt(data.quantity)
        }
        setEProducts([...eProducts, newProduct])
        reset()
    }

    const handleProductUpdate = (index: number, field: string, value: string | number) => {
        const updatedProducts = [...eProducts]
        updatedProducts[index] = { 
            ...updatedProducts[index], 
            [field]: field === 'price' || field === 'quantity' ? parseFloat(value as string) : value 
        }
        if (field === 'price' || field === 'quantity') {
            updatedProducts[index].total = updatedProducts[index].price * updatedProducts[index].quantity
        }
        if (field === 'chargetype') {
            updatedProducts[index].recurrent = value === 'monthly'
        }
        setEProducts(updatedProducts)
    }

    return (
        <div className='h-[100vh] flex flex-col'>
            <TopbarEdit id={id}/>
            <div className='h-[90vh] flex flex-col md:flex-row'> 
                {eProducts.length > 0 ? (
                    <div className='h-[40vh] md:h-[90vh] overflow-y-auto w-[80vw] md:w-1/2'>
                        <h2 className='text-2xl font-bold text-orange-900 text-center mt-1 mb-1'>Actual Entries</h2>
                        {eProducts.map((product: any, index: number) => (
                            <div key={product.id} className='border border-gray-300 shadow-md rounded-lg px-2 py-1 mt-1 ml-4 mr-4'>
                                <div className='grow px-2'>
                                    <div className='flex md:flex-row justify-between gap-2'>
                                        <div>
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            value={product.title}
                                            onChange={(e) => handleProductUpdate(index, 'title', e.target.value)}
                                            className='font-semibold px-1 border border-gray-300 rounded ms-1'
                                        />
                                        </div>
                                    <div className='flex justify-end'>
                                        <button 
                                            className='bg-red-500 text-white font-semibold m-2 rounded-xl'
                                            onClick={() => setEProducts(eProducts.filter((_:any, i:any) => i !== index))}
                                        >
                                            <MdDeleteForever size={20}/>
                                        </button>
                                    </div>
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            value={product.description}
                                            onChange={(e) => handleProductUpdate(index, 'description', e.target.value)}
                                            className='px-1 border rounded'
                                        /> 
                                    </div>
                                    <div className='flex flex-col md:flex-row md:justify-between mt-2'>
                                        <div>
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => handleProductUpdate(index, 'quantity', e.target.value)}
                                            className='px-1 border rounded w-20'
                                        />
                                        </div>
                                        <div>
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={product.price}
                                            onChange={(e) => handleProductUpdate(index, 'price', e.target.value)}
                                            className='px-1 border rounded w-20'
                                        />
                                        </div>
                                        <div>
                                        <label>Charge type</label>
                                        <select
                                            value={product.chargetype}
                                            onChange={(e) => handleProductUpdate(index, 'chargetype', e.target.value)}
                                            className='px-1 border rounded'
                                        >
                                            <option value="monthly">Monthly</option>
                                            <option value="one-time">One-time</option>
                                        </select>
                                        </div>
                                    </div>
{/*                                     <div className='flex justify-end'>
                                    <button 
                                        className='bg-red-500 text-white font-semibold px-1 pt-0 m-2 rounded-md '
                                        onClick={() => setEProducts(eProducts.filter((_:any, i:any) => i !== index))}
                                    >
                                        x
                                    </button>
                                </div> */}
                                </div>
{/*                                 <div className='flex justify-end'>
                                    <button 
                                        className='bg-red-500 text-white font-semibold px-1 pt-0 m-2 rounded-md '
                                        onClick={() => setEProducts(eProducts.filter((_:any, i:any) => i !== index))}
                                    >
                                        x
                                    </button>
                                </div> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 px-4 bg-gray-100 rounded-lg shadow-md mx-4 h-[25vh] w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Entries Available</h3>
                        <p className="text-gray-500">Add your first entry using the form below.</p>
                    </div>
                )}
                <div className='md:h-[65vh] md:w-1/2'>
                    <div className="px-6 mt-2">
                        <h2 className="text-center text-2xl text-orange-900">Add New Product or Service</h2>
                        <p>Please fill in all the fields below to add to the quote.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-8 rounded-lg shadow-lg">
                        <div className="grid md:grid-cols-2 items-baseline mt-1 border-b border-orange-950 py-2">
                            <label>Title or name (for service or product)</label>
                            <input type="text" {...register('title', { required: true })} className="px-1"/>
                        </div>
                        <div className="grid md:grid-cols-2 items-baseline mt-2 border-b border-orange-950 py-2">
                            <label>Description</label>
                            <textarea rows={3} {...register('description', { required: true })} className="px-1"/>
                        </div>
                        <div className="grid grid-cols-2 items-baseline mt-2 border-b border-orange-950">
                            <label>Quantity</label>
                            <input type="number" {...register('quantity', { required: true })} className="px-1 text-right"/>
                        </div>
                        <div className="grid grid-cols-2 items-baseline mt-2 border-b border-orange-950">
                            <label>Price</label>
                            <input type="number" step={0.01} {...register('price', { required: true })} className="px-1 text-right"/>
                        </div>
                        <div className="grid grid-cols-2 items-baseline mt-2 border-b border-orange-950">
                            <label>Charge type</label>
                            <select {...register('chargetype', { required: true })} className="text-right">
                                <option value="monthly">Monthly</option>
                                <option value="one-time">One-time</option>
                            </select>
                        </div>
                        <div className="mt-4 flex flex-col justify-start">
                            <button type="submit" className="bg-orange-500 text-white px-4 py-1 rounded-lg font-semibold">Add</button>
                            <button type="button" className="bg-orange-500 p-1 rounded-md flex ms-auto mt-1 me-1 mb-1" onClick={handleNext}>
                                <span className="text-lg text-gray-100 font-semibold">Next </span> <MdSkipNext className="text-gray-100" size={28}/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditEntries