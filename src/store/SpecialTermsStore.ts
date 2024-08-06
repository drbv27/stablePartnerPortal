import { create } from 'zustand'
import { persist, PersistOptions } from "zustand/middleware";

interface SpecialTerms {
    specialTerms: string;
}

interface SpecialTermsState {
    specialTerms: SpecialTerms | null;
    addSpecialTerms: (specialTerms: SpecialTerms) => void;
    resetSpecialTerms: () => void;
}

type SpecialTermsStore = SpecialTermsState;

const persistConfig: PersistOptions<SpecialTermsStore> = {
    name: "specialTerms",
    // Puedes agregar más opciones de configuración aquí si es necesario
};

export const useSpecialTerms = create<SpecialTermsStore>()(
    persist(
        (set) => ({
            specialTerms: null,
            addSpecialTerms: (specialTerms: SpecialTerms) => set({ specialTerms }),
            resetSpecialTerms: () => set({ specialTerms: null }),
        }),
        persistConfig
    )
);