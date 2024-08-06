'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { getQuote } from "@/actions/quotes/quotes-actions";
import { MdContactEmergency, MdContactMail, MdContactPhone, MdDomain, MdOutgoingMail, MdSkipNext } from 'react-icons/md';
import { FaCity, FaMapLocationDot, FaMapPin,FaFax, FaUsersLine, FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import { IoPerson } from "react-icons/io5";
import { pdf } from '@react-pdf/renderer';
import SpecialTerms from '../SpecialTerms';
import { getProducts } from '@/actions/products/product-actions';
import { updateQuote } from '@/actions/quotes/quotes-actions';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2'

const EditQuote = ({quote}:any) => {
    const router = useRouter();
    const { register, handleSubmit, control } = useForm();
    const [quoteS, setQuoteS] = useState<any>(quote);
    const [products, setProducts] = useState<any>([]);
    const [newMarket, setNewMarket] = useState<any>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const getProductsData = async () => {
        const productsData = await getProducts();
        setProducts(productsData);
    }

    React.useEffect(() => {
        getProductsData();
    }, [])

    const handleIncrease = (index: number) => {
        const newProducts = [...quoteS.totalProducts];
        newProducts[index].quantity += 1;
        setQuoteS({...quoteS, totalProducts:newProducts})
    }
    const handleIncreaseE = (index: number) => {
        const newProductsE = [...quoteS.totalEntrieProducts];
        newProductsE[index].quantity = Number(newProductsE[index].quantity) + 1;
        setQuoteS({...quoteS, totalEntrieProducts:newProductsE})
    }
    const handleDecrease = (index: number) => {
        const newProducts = [...quoteS.totalProducts];
        if (newProducts[index].quantity > 0) {
            newProducts[index].quantity -= 1;
            setQuoteS({...quoteS, totalProducts:newProducts})
        }
    }
    const handleDecreaseE = (index: number) => {
        const newProductsE = [...quoteS.totalEntrieProducts];
        if (newProductsE[index].quantity > 0) {
            (newProductsE[index].quantity) = Number(newProductsE[index].quantity) - 1;
            setQuoteS({...quoteS, totalEntrieProducts:newProductsE})
        }
    }

    const handleNewM = () => {
      const productToAdd = products.products.find((product:any) => product._id === selectedProduct);
      if (productToAdd) {
        setNewMarket((prevMarket:any) => [...prevMarket, { ...productToAdd, quantity }]);
        const newProduct = { product: productToAdd, quantity: quantity };
        const newProducts = [...quoteS.totalProducts, newProduct];
        setQuoteS({...quoteS, totalProducts: newProducts});
      }
    };

    const handleSendMail = async ({to,name,subject,dynamicLink}:any) => {
      const res = await fetch('/api/sendgrid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, name, subject, dynamicLink}),
      });
      if (res.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    };
  
      const onSubmit = async (data:any) => {
        const dataToSend = {
            company: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                companyName: data.companyName,
                areaCode: data.areaCode,
                phone: data.phone,
                address: data.address,
                address2: data.address2,
                city: data.city,
                state: data.state,
                zip: data.zip,
                siteAnalysis: data.siteAnalysis,
                bandwith: data.bandwith,
                locationType: data.locationType,
                agreement: data.agreement,
                renevalTerms: data.renevalTerms
            },
            pdf: quoteS.pdf,
            specialTerms: quoteS.specialTerms,
            status: data.status,
            totalUsers: Number(data.totalUsers),
            totalFax: Number(data.totalFax),
            totalConference: Number(data.totalConference),
            totalProducts: quoteS.totalProducts.map((product: { product: { _id: string }; quantity: number }) => ({
                product: product.product._id,
                quantity: product.quantity,
              })),
            totalEntrieProducts: quoteS.totalEntrieProducts,
        }
        console.log(dataToSend);
        const updated=await updateQuote(quoteS._id, dataToSend);
        const result = await Swal.fire({
          title: 'Quote Saved',
          text: 'Do you want to send an email?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        });
        //console.log(updated)
        if (result.isConfirmed) {
          handleSendMail({ to:data.email, name:data.name, subject:'Updated Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${quoteS._id}` })
        }
        
        router.push('/dashboard/manageQuote')

        //console.log(quoteS)
      }
  
      console.log(quoteS)
  return (

    <div>
    <h1 className='text-center'>Edit quote: <span className="text-2xl font-semibold text-orange-800">{quote.company.companyName}</span></h1>
    <form className="border border-gray-300 rounded-xl shadow-xl p-1 ml-4 w-[80vw]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={quote.company.name}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <MdContactEmergency className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="lastname"
                        control={control}
                        defaultValue={quote.company.lastname}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <MdContactEmergency className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="email"
                        control={control}
                        defaultValue={quote.company.email}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <MdContactMail className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="companyName"
                        control={control}
                        defaultValue={quote.company.companyName}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <MdDomain className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 ">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="areaCode"
                        control={control}
                        defaultValue={quote.company.areaCode}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <MdContactPhone className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue={quote.company.phone}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <MdContactPhone className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 grow-[2]">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="address"
                        control={control}
                        defaultValue={quote.company.address}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <FaMapLocationDot className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow-[1]">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="address2"
                        control={control}
                        defaultValue={quote.company.address2}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />     
                          <FaMapLocationDot className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 grow-[3]">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="city"
                        control={control}
                        defaultValue={quote.company.city}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <FaCity className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow-[1]">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="state"
                        control={control}
                        defaultValue={quote.company.state}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <FaMapLocationDot className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow-[1]">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="zip"
                        control={control}
                        defaultValue={quote.company.zip}
                        render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                      />
                          <FaMapPin className="absolute right-2 top-3 text-2xl text-gray-400" />
                  </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="siteAnalysis"
                        control={control}
                        defaultValue={quote.company.siteAnalysis}
                        render={({ field }) => (
                          <select className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400" {...field}>
                            <option value="" disabled>Site analysis</option>
                            <option value="Commercial" className="text-gray-600">Commercial</option>
                            <option value="Residential" className="text-gray-600">Residential</option>
                          </select>
                        )}
                      />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="bandwith"
                        control={control}
                        defaultValue={quote.company.bandwith}
                        render={({ field }) => (
                          <select className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400" {...field}>
                            <option value="" disabled selected>Bandwith</option>
                            <option value="Need Quote" className="text-gray-600">Need Quote</option>
                            <option value="CBI" className="text-gray-600">CBI</option>
                            <option value="Fiber" className="text-gray-600">Fiber</option>
                            <option value="DSL" className="text-gray-600">DSL</option>
                          </select>
                        )}
                      />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow">
                  <div className=" w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="locationType"
                        control={control}
                        defaultValue={quote.company.locationType}
                        render={({ field }) => (
                          <select className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400" {...field}>
                            <option value="" disabled selected>Location Type</option>
                            <option value="HQ" className="text-gray-600">HQ</option>
                            <option value="Branch" className="text-gray-600">Branch</option>
                            <option value="Executive Suite" className="text-gray-600">Executive Suite</option>
                          </select>
                        )}
                      />
                  </div>
              </div>


          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
              <div className="my-1 md:my-2 grow">
                  <div className="my-1 w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="agreement"
                        control={control}
                        defaultValue={quote.company.agreement}
                        render={({ field }) => (
                          <select className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400" {...field}>
                            <option value="" disabled selected>Agreement Terms</option>
                            <option value="Month to Month" className="text-gray-600">Month to Month</option>
                            <option value="12 Months" className="text-gray-600">12 Months</option>
                            <option value="24 Months" className="text-gray-600">24 Months</option>
                            <option value="36 Months" className="text-gray-600">36 Months</option>
                          </select>
                        )}
                      />
                  </div>
              </div>
              <div className="my-1 md:my-2 grow">
                  <div className="my-1 w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="renevalTerms"
                        control={control}
                        defaultValue={quote.company.renevalTerms}
                        render={({ field }) => (
                          <select className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400" {...field}>
                            <option value="" disabled selected>Renewal Terms</option>
                            <option value="Month to Month" className="text-gray-600">Month to Month</option>
                            <option value="12 Months" className="text-gray-600">12 Months</option>
                            <option value="24 Months" className="text-gray-600">24 Months</option>
                            <option value="36 Months" className="text-gray-600">36 Months</option>
                          </select>
                        )}
                      />
                  </div>
              </div>
          </div>
          <div>
            <hr className='mt-1'/>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow">
                    <h2>Total Users</h2>
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <Controller
                          name="totalUsers"
                          control={control}
                          defaultValue={quote.totalUsers}
                          render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                        />
                            <IoPerson className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <h2>Total Fax</h2>
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <Controller
                          name="totalFax"
                          control={control}
                          defaultValue={quote.totalFax}
                          render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                        />
                            <FaFax className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <h2>Total Conference</h2>
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <Controller
                          name="totalConference"
                          control={control}
                          defaultValue={quote.totalConference}
                          render={({ field }) => <input className="w-full p-2 bg-primary border border-input rounded-2xl" {...field} />}
                        />
                            <FaUsersLine className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>
          </div>
          <div>
            <hr className='mt-1'/>
            <div className='mx-4'>
                <h2 className='text-xl text-center font-semibold text-orange-800 mb-1'>MarketPlace</h2>
                <div className='flex border-b-2'>
                  <p className='w-[40%] font-semibold'>Description</p>
                  <p className='w-[17%] text-center font-semibold'>Value</p>
                  <div className='w-[17%] text-right flex items-center justify-center font-semibold'>
                    <p>Qty</p>
                  </div>
                  <p className='w-[17%] text-right font-semibold'>Total</p>
                  <p className='w-[9%] text-right font-semibold text-sm'>OT/R</p>
                </div>
                {quote.totalProducts && quote.totalProducts.map((product: any, index: number) => (
                    <div className='flex border-b-2' key={index}>
                      <p className='w-[40%]'>{product.product.title}</p>
                      <p className='w-[17%] text-center'>${Number(product.product.price).toFixed(2)}</p>
                      <div className='w-[17%] flex gap-1 items-center justify-center'>
                          <button 
                            type="button" 
                            onClick={() => handleDecrease(index)}
                            className='border border-gray-300 rounded-md py-0.5 px-1 bg-orange-200'
                          >
                            -
                          </button>
                          <p>{product.quantity}</p>
                          <button 
                            type="button" 
                            onClick={() => handleIncrease(index)}
                            className='border border-gray-300 rounded-md py-0.5 px-1 bg-slate-200'
                          >
                            +
                          </button>
                      </div>
                      <p className='w-[17%] text-right font-semibold'>${(product.product.price*product.quantity).toFixed(2)}</p>
                      {product.recurrent ? <p className='w-[9%] text-right text-slate-800'>OT</p>: <p className='w-[9%] text-right text-orange-700'>R</p>}
                    </div>
                ))}
            </div>
            <div className='mx-4'>
                {quote.totalEntrieProducts.map((product: any, index: number) => (
                    <div className='flex border-b-2' key={index}>
                      <p className='w-[40%]'>{product.title}</p>
                      <p className='w-[17%] text-center'>${Number(product.price).toFixed(2)}</p>
                      <div className='w-[17%] flex gap-1 items-center justify-center'>
                        <button 
                          type="button" 
                          onClick={() => handleDecreaseE(index)}
                          className='border border-gray-300 rounded-md py-0.5 px-1 bg-orange-200'
                        >
                          -
                        </button>
                          <p>{product.quantity}</p>
                          <button 
                            type="button" 
                            onClick={() => handleIncreaseE(index)}
                            className='border border-gray-300 rounded-md py-0.5 px-1 bg-slate-200'
                          >
                            +
                          </button>
                      </div>
                      <p className='w-[17%] text-right font-semibold'>${(Number(product.price)*Number(product.quantity)).toFixed(2)}</p>
                      {product.recurrent ? <p className='w-[9%] text-right text-slate-800'>OT</p>: <p className='w-[9%] text-right text-orange-700'>R</p>}
                    </div>
                ))}
            </div>
          </div>



          <div className='border border-slate-200 my-2 shadow-md bg-slate-200 p-4'>
            <h2 className='text-center'>Add products</h2>
            {newMarket && newMarket.length > 0 && newMarket.map((product: any, index: number) => (
              <div className='flex border-b-2 text-sm text-orange-900' key={index}>
                <p className='w-[40%]'>{product.title}</p>
                <p className='w-[20%] text-left'>{product.quantity}</p>
                <p className='w-[20%] text-center'>${product.price}</p>
                <p className='w-[20%] text-right'>${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className='flex justify-between gap-2'>
            <select name="market" id="" className='w-[70%]' onChange={e => setSelectedProduct(e.target.value)}>
              {products && products.products && products.products.length > 0 && products.products.map((product: any) => (
                <option key={product._id} value={product._id}>{product.title}</option>
              ))}
            </select>
            <input type="number" name="quantity" id=""  className="w-[30%]" placeholder='Qty' value={quantity} onChange={e => setQuantity(Number(e.target.value))}/>
            </div>
            <button type="button" className='bg-orange-300 w-full mt-2 shadow-md' onClick={handleNewM}>add</button>
          </div>





          <div className="my-1 mx-4 md:my-2 grow">
                  <div className="my-1 w-full relative rounded-2xl shadow-xl">
                      <Controller
                        name="status"
                        control={control}
                        defaultValue={quote.status}
                        render={({ field }) => (
                          <select className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400 text-center" {...field}>
                            <option value="" disabled selected>Status</option>
                            <option value="new" className="text-gray-600">new</option>
                            <option value="approved" className="text-gray-600">Approved</option>
                            <option value="rejected" className="text-gray-600">Rejected</option>
                          </select>
                        )}
                      />
                  </div>
              </div>

          <div className='flex justify-end gap-2'>
            <button className="bg-orange-500 p-2 rounded-lg text-white flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg">
              <span className="text-lg text-gray-200">Only Save </span> <FaSave className="text-gray-200" size={28}/>
            </button>
        </div>
      </form>


  </div>
  )
}

export default EditQuote