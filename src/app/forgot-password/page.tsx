'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const ForgotPasspage = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data:any) => {
        try {
            const response = await axios.put('https://api.nevtis.com/user/auth/forgot-password', {
                email: data.email
            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
        <div className='bg-slate-500 p-8'>
            <h1 className='text-center text-slate-100 font-bold'>Forgot Password</h1>
            <p className='text-center text-slate-100 font-bold'>Please enter your email</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1 mt-1'>
                <input type="email" placeholder="Email" {...register('email')} />
                <button type="submit" className='bg-orange-500 text-slate-100 font-semibold rounded'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPasspage