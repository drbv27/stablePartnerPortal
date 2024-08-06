'use server'

import { NextResponse } from 'next/server';

import Product from '@/models/Product';
import { connectDB } from '@/utils/dbconnect';
import { revalidatePath } from 'next/cache';
import Quote from '@/models/Quote';


//create a new payment
export async function createPayment(paymentData:any){
    try {
        const newPayment = await fetch('https://api.nevtis.com/marketplace/payment/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(paymentData)
        }).then(res => res.json()).then(data => data);
        //console.log(newQuote)
        revalidatePath('/dashboard/newQuote/shopping');
        return {newPayment};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//update a quote
export async function updateStatus(id:string,status:string){
    try {
        const updatedQuote = await fetch(`https://api.nevtis.com/marketplace/quotes/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({status})
        }).then(res => res.json()).then(data => data);
        //console.log(updatedQuote)
        revalidatePath(`/client/quotes/${id}`);
        revalidatePath('/dashboard/manageQuote');
        revalidatePath('/dashboard/aproveQuote');
        return {updatedQuote};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//delete a quote
export async function deleteQuote(id:string){
    try {
        const deletedQuote = await fetch(`https://api.nevtis.com/marketplace/quotes/delete/${id}`,{
            method:'DELETE'
        }).then(res => res.json()).then(data => data);
        //console.log(deletedQuote)
        revalidatePath('/manageQuote');
        return {deletedQuote};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}
