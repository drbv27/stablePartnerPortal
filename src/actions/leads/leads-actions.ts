'use server'

import { revalidatePath } from 'next/cache';

//create a new lead
export async function createLead(lead:any){
    try {
        const newLead = await fetch('https://api.nevtis.com/user/users/lead/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(lead)
        }).then(res => res.json()).then(data => data);
        //console.log(newQuote)
        revalidatePath('/dashboard/leadList');
        return {newLead};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}


//get all leads
export async function getAllLeads(){
    try {
        const leads = await fetch('https://api.nevtis.com/user/users/lead/all', { next: { revalidate: 60 } }).then(res => res.json()).then(data => data);
        //console.log(quotes)
        revalidatePath('/dashboard/leadList');
        return {leads};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//get a specific lead by id
export async function getLead(id:string){
    try {
        const lead = await fetch(`https://api.nevtis.com/user/users/user/${id}`).then(res => res.json()).then(data => data);
        //console.log(quote)
        revalidatePath('/dashboard/leadList/[id]');
        return {lead};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//UPDATE a new lead
export async function updateLead(lead:any){
    try {
        const updatedLead = await fetch('https://api.nevtis.com/user/users/lead/update',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(lead)
        }).then(res => res.json()).then(data => data);
        //console.log(newQuote)
        revalidatePath('/dashboard/leadList');
        revalidatePath(`/dashboard/leadList/${lead._id}`);
        return {updatedLead};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}


