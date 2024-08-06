import { create } from 'zustand'
/* import SpecialTerms from '../components/SpecialTerms'; */

interface QuoteId {
    quoteId: string | undefined;
}

interface QuoteIdState {
    quoteId: QuoteId | null;
    addQuoteId: (quoteId: QuoteId) => void;
    resetQuoteId: () => void;
}

export const useQuoteId = create<QuoteIdState>(
        (set) => ({
            quoteId: null,
            addQuoteId: (quoteId: QuoteId) => set(() => ({ quoteId: quoteId })),
            resetQuoteId: () => set({ quoteId: null}),
        }),
)
