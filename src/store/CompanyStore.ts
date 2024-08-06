import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface Company {
    id: string | undefined;
    name: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    companyName: string | undefined;
    areaCode: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    address2: string | undefined;
    city: string | undefined;
    state: string | undefined;
    zip: string | undefined;
    siteAnalysis: string | undefined;
    bandwith: string | undefined;
    locationType: string | undefined;
    agreement: string | undefined;
    renevalTerms: string | undefined;
}

interface CompanyState {
    company: Company | null;
    addCompany: (company: Company) => void;
    resetCompany: () => void;
}

export const useCompany = create<CompanyState>(
    /* persist( */
        (set) => ({
            company: null,
            addCompany: (company: Company) => set(() => ({ company: company })),
            resetCompany: () => set({ company: null}),
        }),
        /* { name:"productsOrdered"} */
    /* ) */
)
