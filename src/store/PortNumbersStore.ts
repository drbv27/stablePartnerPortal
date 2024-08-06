import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface PortNumber {
    port: string | undefined;
}

interface Ports {
  portNumbers: Array<string>;
  addPortNumber: (port: string) => void;
  removePortNumber: (port: string) => void;
  resetPortNumbers: () => void;
  setPortNumbers: (array: Array<string>) => void;
}

export const usePortNumbers = create<Ports>(
  /* persist( */
      (set) => ({
          portNumbers: [],
          addPortNumber: (port: string) => set((state) => ({ portNumbers: [...state.portNumbers, port] })),
          removePortNumber: (port: string) => set((state) => ({ portNumbers: state.portNumbers.filter(p => p !== port) })),
          resetPortNumbers: () => set({ portNumbers: [] }), // reset totalProducts to an empty array
          setPortNumbers: (array: Array<string>) => set({ portNumbers: array }),
      }),
)

