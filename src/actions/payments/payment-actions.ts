import { revalidatePath } from 'next/cache';

//get a specific quote by id
export async function getContract(id:string){
    try {
        const contract = await fetch(`https://api.nevtis.com/marketplace/payment/by-quote/${id}`).then(res => res.json()).then(data => data);
        //console.log(quote)
        revalidatePath('/dashboard/main');
        revalidatePath('/dashboard/manageQuote');
        revalidatePath(`/dashboard/manageQuote/${id}`);
        revalidatePath(`/dashboard/aproveQuote`);
        revalidatePath(`/dashboard/aproveQuote/${id}`);
        revalidatePath(`/newQuote/manage/${id}`);
        return contract;
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//update a contract
export async function updateContract(id:string,quote:any){
    try {
        const updatedQuote = await fetch(`https://api.nevtis.com/marketplace/payment/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(quote)
        }).then(res => res.json()).then(data => data);
        //console.log(updatedQuote)
        revalidatePath('/dashboard/main');
        revalidatePath('/dashboard/manageQuote');
        revalidatePath(`/dashboard/manageQuote/${id}`);
        revalidatePath(`/dashboard/aproveQuote`);
        revalidatePath(`/dashboard/aproveQuote/${id}`);
        revalidatePath(`/newQuote/manage/${id}`);
        return {updatedQuote};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}