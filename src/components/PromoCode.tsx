'use client'
import {useState} from 'react'
import { useForm } from 'react-hook-form';
import { getCode, getCodes } from '@/actions/promos/promo-actions'
import { usePromoCode } from '@/store/PromoCodeStore';

type PromoCode = {
  _id: string;
  code: string;
  discount: number;
  since: string;
  to: string;
};

const PromoCode = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const {addCode,promocode,resetCode} = usePromoCode()

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const onSubmit = async (data: any) => {
    //console.log(data);
    const code = await getCode(data.promoCode)
    const { codeR } = code
    //console.log(codeR)
    if (codeR) {
      const currentDate = new Date();
      const [monthSince, daySince, yearSince] = codeR.since.split("/");
      const [monthTo, dayTo, yearTo] = codeR.to.split("/");
      const validStart = new Date(parseInt(yearSince), parseInt(monthSince) - 1, parseInt(daySince));
      const validEnd = new Date(parseInt(yearTo), parseInt(monthTo) - 1, parseInt(dayTo));
      if (currentDate >= validStart && currentDate <= validEnd) {
        //console.log("CODE VALID");
        const promoCode: PromoCode = {
          _id: codeR._id.toString(),
          code: codeR.code,
          discount: codeR.discount,
          since: codeR.since,
          to: codeR.to,
        };
        addCode(promoCode)
        showMessage('Promo Code Applied')
      } else {
        resetCode()
        showMessage('Promo Code Expired')
        //console.log("CODE INVALID");
      }
    } else {
      resetCode()
      showMessage('Promo Code Not Found')
      //console.log("CODE NOT FOUND");
    }
  };

  return (
    <div className='px-1 md:px-6 pt-4 text-right flex justify-end gap-2 items-center'>
        <p className='text-orange-500'>{message}</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex'>
          <input
            {...register('promoCode')}
            type="text"
            placeholder='Enter promo code'
            className='border border-gray-300 p-2 mr-1'
          />
            <button type='submit' className='bg-orange-500 p-2 rounded text-white'>Apply</button>
        </form>
    </div>
  )
}

export default PromoCode