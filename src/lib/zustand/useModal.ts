import { create } from 'zustand'


interface UseModal {
    isClosed: boolean
    setIsClosed: (isClosed: boolean ) => void
}

export const useModal = create<UseModal>()(
    (set) => ({
        isClosed: false,
        setIsClosed: (isClosed) => set(({ isClosed: isClosed })),
    })
)
