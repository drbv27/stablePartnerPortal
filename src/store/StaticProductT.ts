import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { set } from 'mongoose';

interface SingleProduct {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    image: string;
    inStock: number;
    price: number;
    sizes: Array<string>;
    slug: string;
    tags: Array<string>;
    type: string;
    category: string;
    total: number;
    recurrent: boolean;
}

interface Products {
    totalProducts: Array<SingleProduct>;
    addProducts: (array: Array<SingleProduct>) => void;
    removeProducts: (array: Array<SingleProduct>) => void;
    setProducts: (array: Array<SingleProduct>) => void;
    resetProducts: () => void;
}

export const useTotalProducts = create<Products>(
    /* persist( */
        (set) => ({
            totalProducts: [],
            addProducts: (array: Array<SingleProduct>) => set((state) => ({ totalProducts: [...state.totalProducts, ...array] })),
            removeProducts: (array: Array<SingleProduct>) => set((state) => ({ totalProducts: [...array]})),
            setProducts: (array: Array<SingleProduct>) => set({ totalProducts: array }),
            resetProducts: () => set({ totalProducts: [] }), // reset totalProducts to an empty array
        }),
        /* { name:"productsOrdered"} */
    /* ) */
)
