import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CreateCard = {
    step: number
    spotifyMusic: string | null | undefined
    hasHydrated: boolean
    setStep: (value: number) => void
    setSpotifyMusic: (value: string | null | undefined) => void
    setHasHydrated: (state: boolean) => void
}

export const useCreateCard = create<CreateCard>()(
    persist(
        (set) => ({
            step: 0,
            spotifyMusic: "",
            hasHydrated: false            ,
            setStep: (value) => set({ step: value }),
            setSpotifyMusic: (value) => set({ spotifyMusic: value }),
            setHasHydrated: (state) => set({ hasHydrated: state }),
        }),
        {
            name: 'tikLoveYouCreateCard', // unique name for the storage
        }
    )
)
