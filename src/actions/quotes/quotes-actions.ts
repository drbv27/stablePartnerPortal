'use server'

import { revalidatePath } from 'next/cache';


//get all quotes
export async function getQuotes(){
    try {
        const quotes = await fetch('https://api.nevtis.com/marketplace/quotes/all', { next: { revalidate: 60 } }).then(res => res.json()).then(data => data);
        //console.log(quotes)
        revalidatePath('/dashboard/manageQuote');
        revalidatePath('/dashboard/main');
        revalidatePath('/dashboard/aproveQuote')
        return {quotes};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//get a specific quote by id
export async function getQuote(id:string){
    try {
        /* const quote = await fetch(`https://api.nevtis.com/marketplace/quotes/${id}`).then(res => res.json()).then(data => data); */
        const quote = await fetch(`https://api.nevtis.com/marketplace/quotes/${id}`, { cache: 'no-store' }).then(res => res.json()).then(data => data);
        //console.log(quote)
        revalidatePath('/dashboard/manageQuote');
        revalidatePath(`/dashboard/manageQuote/${id}`);
        revalidatePath(`/newQuote/manage/${id}`);
        revalidatePath(`/client/quotes/${id}`);
        revalidatePath(`/client/accept/${id}`);
        revalidatePath(`/client/reject/${id}`);
        revalidatePath(`/dashboard/editQuote/company/${id}`);
        revalidatePath(`/dashboard/editQuote/user/${id}`);
        revalidatePath(`/dashboard/editQuote/portNumbers/${id}`);
        revalidatePath(`/dashboard/editQuote/market/${id}`);
        revalidatePath(`/dashboard/editQuote/entries/${id}`);
        revalidatePath(`/dashboard/editQuote/cart/${id}`);
        return {quote};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}


//create a new quote
export async function createQuote(quote:any){
    try {
        const newQuote = await fetch('https://api.nevtis.com/marketplace/quotes/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(quote)
        }).then(res => res.json()).then(data => data);
        //console.log(newQuote)
        revalidatePath('/dashboard/newQuote/shopping');
        return {newQuote};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//update a quote
export async function updateQuote(id:string,quote:any){
    try {
        const updatedQuote = await fetch(`https://api.nevtis.com/marketplace/quotes/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(quote)
        }).then(res => res.json()).then(data => data);
        //console.log(updatedQuote)
        revalidatePath(`/dashboard/manageQuote/${id}`);
        revalidatePath(`/client/quotes/${id}`)
        revalidatePath('/dashboard/manageQuote');
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
        revalidatePath('/dashboard/manageQuote');
        return {deletedQuote};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}
