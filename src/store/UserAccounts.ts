import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface User {
    totalUsers: number;
    addUser: () => void;
    removeUser: () => void;
    setTotalUsers: (value: number) => void;
  }

interface Fax {
    totalFax: number;
    addFax: () => void;
    removeFax: () => void;
    setTotalFax: (value: number) => void;
  }

interface Conference {
    totalConference: number;
    addConference: () => void;
    removeConference: () => void;
    setTotalConference: (value: number) => void;
  }

interface Equipment {
    totalGRPS: number;
    totalGRPL: number;
    totalGXPS: number;
    totalGXPL: number;
    totalDPS: number;
    totalDPL: number;
  }

export const useTotalUsers = create<User>(
   /*  persist( */
        (set) =>({
            totalUsers:0,
            addUser: () => set((state) => ({ totalUsers: state.totalUsers + 1 })),
            removeUser: () => set((state) => ({ totalUsers: state.totalUsers - 1 })),
            setTotalUsers: (value: number) => set(() => ({ totalUsers: value })),
        }),
        /* { name:"userAccounts"} */
   /*  ) */
)

export const useTotalFax = create<Fax>(
    /* persist( */
        (set) =>({
            totalFax:0,
            addFax: () => set((state) => ({ totalFax: state.totalFax + 1 })),
            removeFax: () => set((state) => ({ totalFax: state.totalFax - 1 })),
            setTotalFax: (value: number) => set(() => ({ totalFax: value })),
        }),
        /* { name:"faxAccounts"} */
    /* ) */
)

export const useTotalConference = create<Conference>(
    /* persist( */
        (set) =>({
            totalConference:0,
            addConference: () => set((state) => ({ totalConference: state.totalConference + 1 })),
            removeConference: () => set((state) => ({ totalConference: state.totalConference - 1 })),
            setTotalConference: (value: number) => set(() => ({ totalConference: value })),
        }),
        /* { name:"conferenceAccounts"} */
   /*  ) */
)

export const useTotalEquipement = create<Equipment>(
   /*  persist( */
        (set) =>({
            totalGXPS:0,
            totalGXPL:0,
            totalGRPS:0,
            totalGRPL:0,
            totalDPS:0,
            totalDPL:0,
            addGXPS: () => set((state) => ({ totalGXPS: state.totalGXPS + 1 })),
            addGXPL: () => set((state) => ({ totalGXPL: state.totalGXPL + 1 })),
            removeGXPS: () => set((state) => ({ totalGXPS: state.totalGXPS - 1 })),
            removeGXPL: () => set((state) => ({ totalGXPL: state.totalGXPL - 1 })),
            setTotalGXPS: (value: number) => set(() => ({ totalGXPS: value })),
            setTotalGXPL: (value: number) => set(() => ({ totalGXPL: value })),
            addGRPS: () => set((state) => ({ totalGRPS: state.totalGRPS + 1 })),
            addGRPL: () => set((state) => ({ totalGRPL: state.totalGRPL + 1 })),
            removeGRPS: () => set((state) => ({ totalGRPS: state.totalGRPS - 1 })),
            removeGRPL: () => set((state) => ({ totalGRPL: state.totalGRPL - 1 })),
            setTotalGRPS: (value: number) => set(() => ({ totalGRPS: value })),
            setTotalGRPL: (value: number) => set(() => ({ totalGRPL: value })),
            addDPS: () => set((state) => ({ totalDPS: state.totalDPS + 1 })),
            addDPL: () => set((state) => ({ totalDPL: state.totalDPL + 1 })),
            removeDPS: () => set((state) => ({ totalDPS: state.totalDPS - 1 })),
            removeDPL: () => set((state) => ({ totalDPL: state.totalDPL - 1 })),
            setTotalDPS: (value: number) => set(() => ({ totalDPS: value })),
            setTotalDPL: (value: number) => set(() => ({ totalDPL: value })),
        }),
        /* { name:"equipement"} */
  /*   ) */
)
