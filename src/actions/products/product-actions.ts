'use server'

import { NextResponse } from 'next/server';
import StaticProduct from '@/models/StaticProduct';
import Product from '@/models/Product';
import { connectDB } from '@/utils/dbconnect';
import { revalidatePath } from 'next/cache';

//get all products
export async function getProducts(){
    try {
        const products = await fetch('https://api.nevtis.com/marketplace/products/all').then(res => res.json()).then(data => data);
        //console.log(products)
        revalidatePath('/newQuote/quote/market')
        return {products};
        
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//get a specific product by slug
export async function getProduct(slug:string){
    try {
        await connectDB();
        const product = await Product.findOne({slug:slug}).exec();
        return {product};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}


//create a new trainer
/* export async function createTrainer(name:string){
    const trainer = new Trainer({name})
    try {
        await connectDB();
        const savedTrainer = await trainer.save(name);
        revalidatePath('/dashboard/trainers');
        return {trainer:savedTrainer.name};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
} */