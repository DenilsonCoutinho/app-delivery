import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface useIdentificationProps {
    name: string
    number: string
    setNumber: (name: string) => void
    setName: (name: string) => void
}

export const useIdentification = create<useIdentificationProps>()(
    persist((set) => ({
        number: '',
        setNumber: (number) => set(({ number: number })),
        name: '',
        setName: (name) => set(({ name: name })),
    }),
        {
            name: 'identification', // unique name for the storage
        }
    ))
