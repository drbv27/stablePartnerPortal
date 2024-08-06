'use server'
import { revalidatePath } from "next/cache";

export const getProductsBySlug = async (slug: string) => {
    try {
        const products = await fetch(`https://api.nevtis.com/marketplace/products/${slug}`).then(res => res.json()).then(data => data);
        revalidatePath('/main')
        return {products};
    } catch (error) {
        return {errorMsg:(error as Error).message};
    }
}