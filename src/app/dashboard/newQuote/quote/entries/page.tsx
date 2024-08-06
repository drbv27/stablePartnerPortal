'use client'
import {useForm, SubmitHandler} from 'react-hook-form'
import { useTotalEntrieProducts } from "@/store/ManualEntries";
import { useRouter } from "next/navigation";
import { MdSkipNext } from 'react-icons/md';

type Inputs = {
  title: string;
  description: string;
  quantity: number;
  price: number;
  chargetype: string;
  recurrent: boolean;
  total: number;
};

interface State {
  totalUsers: number; 
  // Add other state properties here
}

export default function EntriesPage() {
  const { addEntrieProducts, totalEntrieProducts } = useTotalEntrieProducts();

  const { register, handleSubmit, watch, formState: { errors },reset } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = data => {
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    //console.log(data);
    if (data.chargetype === 'monthly') {
      data.recurrent = true;
    } else {
      data.recurrent = false;
    }
    data.total = data.quantity * data.price;
    const id = Math.floor(Math.random() * Math.pow(10, 16));
    addEntrieProducts([{id:id.toString(),...data}])
    reset()
  
  };

  const router = useRouter();

  const handleNext = () => {
    router.push('/dashboard/newQuote/shopping')
  }

  //console.log(totalEntrieProducts)

  return (
    <div>
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
  );
}