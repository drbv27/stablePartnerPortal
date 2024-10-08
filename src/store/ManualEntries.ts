import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface EntrieProduct {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    price: number;
    chargetype: string;
    total: number;
    recurrent: boolean;
    quantity: number;
    taxes: boolean; // Added taxes field
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
            setEntrieProducts: (array: Array<EntrieProduct>) => set({ totalEntrieProducts: array }),
            resetEntrieProducts: () => set({ totalEntrieProducts: [] }),
        }),
        /* { name:"productsOrdered"} */
    /* ) */
)