import { create } from 'zustand'
import { persist } from "zustand/middleware";
import { set } from 'mongoose';

interface EntrieProduct {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    price: number;
    chargetype: string;
    total: number;
    recurrent: boolean;
    quantity: number;
}

interface Products {
    totalEntrieProducts: Array<EntrieProduct>;
    addEntrieProducts: (array: Array<EntrieProduct>) => void;
    removeEntrieProducts: (array: Array<EntrieProduct>) => void;
    setEntrieProducts: (array: Array<EntrieProduct>) => void;
    resetEntrieProducts: () => void;
}

export const useTotalEntrieProducts = create<Products>(
    /* persist( */
        (set) => ({
            totalEntrieProducts: [],
            addEntrieProducts: (array: Array<EntrieProduct>) => set((state) => ({ totalEntrieProducts: [...state.totalEntrieProducts, ...array] })),
            removeEntrieProducts: (array: Array<EntrieProduct>) => set((state) => ({ totalEntrieProducts: [...array]})),
            setEntrieProducts: (array: Array<EntrieProduct>) => set({ totalEntrieProducts: array }), // set totalProducts to the array passed as argument
            resetEntrieProducts: () => set({ totalEntrieProducts: [] }), // reset totalProducts to an empty array
        }),
        /* { name:"productsOrdered"} */
    /* ) */
)
