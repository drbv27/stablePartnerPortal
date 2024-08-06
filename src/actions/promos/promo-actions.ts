'use server'

import { NextResponse } from 'next/server';

import { connectDB } from '@/utils/dbconnect';
import { revalidatePath } from 'next/cache';
import Code from '@/models/Code';


//get a specific product by slug
export async function getCodes(){
    try {
        await connectDB();
        const codes = await Code.find().exec();
        return {codes};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}

//get a specific code by code
export async function getCode(code:string){
    try {
        await connectDB();
        const codeR = await Code.findOne({code}).exec();
        return {codeR};
    }
    catch (error) {
        return {errorMsg:(error as Error).message};
    }
}