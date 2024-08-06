import { create } from 'zustand'
import { persist } from "zustand/middleware";
import SpecialTerms from '../components/SpecialTerms';

interface SpecialTerms {
    specialTerms: string | undefined;
}

interface SpecialTermsState {
    specialTerms: SpecialTerms | null;
    addSpecialTerms: (specialTerms: SpecialTerms) => void;
    resetSpecialTerms: () => void;
}

export const useSpecialTerms = create<SpecialTermsState>(
    /* persist( */
        (set) => ({
            specialTerms: null,
            addSpecialTerms: (specialTerms: SpecialTerms) => set(() => ({ specialTerms: specialTerms })),
            resetSpecialTerms: () => set({ specialTerms: null}),
        }),
        /* { name:"productsOrdered"} */
    /* ) */
)
