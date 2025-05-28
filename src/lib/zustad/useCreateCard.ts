import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CreateCard = {
    step: number
    setStep: (value: number) => void

}



export const useCreateCard = create<CreateCard>()(
    persist(
        (set) => ({
            step: 0, 
            setStep: (value) => set({ step: value }),
        }),
        {
            name: 'tikLoveYouCreateCard', // unique name for the storage
        }
    )
)
