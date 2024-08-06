'use client'
import { useSpecialTerms } from '@/store/SpecialTermsStore'
import {useForm, SubmitHandler} from 'react-hook-form'
import Swal from 'sweetalert2'
import { useEffect } from 'react'

interface FormValues {
  specialTerms: string;
}

const SpecialTerms = ({especialTerms}:any) => {
    const {specialTerms,addSpecialTerms} = useSpecialTerms()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {
      // Cargar el valor inicial en el textarea
      setValue('specialTerms', especialTerms);
    }, [especialTerms, setValue]);
   
    const onSubmit: SubmitHandler<FormValues> = data => {
        addSpecialTerms(data)
        Swal.fire({
            position: "top-end",
            title: 'Special Terms Saved',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
        })
    }
    console.log(specialTerms)
  return (
    <div className='px-2 md:px-6 py-4 text-right shadow-md'>
        <form onSubmit={handleSubmit(onSubmit)} >
          <h2 className='font-semibold text-left text-xl text-orange-900'>Special Terms</h2>
            <textarea 
              cols={30} 
              rows={10}
              {...register('specialTerms')} 
              className='w-full border border-gray-400 rounded p-1'>
            </textarea>
            <button type='submit' className='bg-orange-700 py-1 px-2 rounded text-white'>Save Terms</button>
        </form>
    </div>
  )
}

export default SpecialTerms