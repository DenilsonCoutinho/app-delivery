import { create } from 'zustand'


interface UseDrawer {
    isClosed: boolean
    setIsClosed: (isClosed: boolean) => void
}

export const useDrawer = create<UseDrawer>()(
    (set) => ({
        isClosed: false,
        setIsClosed: (isClosed) => set(({ isClosed: isClosed })),
    })
)
