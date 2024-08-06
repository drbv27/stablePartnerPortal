import User from "@/models/user";
import { revalidatePath } from 'next/cache';

import { connectDB } from "@/utils/dbconnect";


//get login users
export async function getUser(id:string){
    try {
        await connectDB();
        const user = await User.findById(id).exec();
        return {user};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//get all users adminspace
export async function getSellerUsers(){
    try {
        const users = await fetch('https://api.nevtis.com/user/users/seller/all').then(res => res.json()).then(data => data);
        //console.log(quotes)
        revalidatePath('/dashboard/manageQuote');
        revalidatePath('/dashboard/main');
        return users;
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//update a seller
export async function updateSeller(seller:any){
    try {
        const updatedSeller = await fetch(`https://api.nevtis.com/user/users/seller/update`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(seller)
        }).then(res => res.json()).then(data => data);
        //console.log(updatedQuote)
        revalidatePath(`/`);
        return {updatedSeller};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}