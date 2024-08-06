import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface PromoCode {
    _id: string | undefined;
    code: string | undefined;
    since: string | undefined;
    to: string | undefined;
    discount: number;

}


interface PromoCodeState {
    promocode: PromoCode | null;
    addCode: (promocode: PromoCode) => void;
    resetCode: () => void;
}

export const usePromoCode = create<PromoCodeState>(
    /* persist( */
        (set) => ({
            promocode: null,
            addCode: (promocode: PromoCode) => set(() => ({ promocode: promocode })),
            resetCode: () => set({ promocode: null}),
        }),
        /* { name:"productsOrdered"} */
    /* ) */
)
