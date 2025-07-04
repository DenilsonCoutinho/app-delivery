import { StaticImageData } from 'next/image';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
  id: any;
  title: string;
  subtitle: string;
  price: string;
  priceInCents: number;
  image: StaticImageData;
  qtd: number
  final_price: number | undefined
  descriptio?:string
};

interface UseOrder {
  order: Product[]
  setOrder: (order: Product[] | ((prev: Product[]) => Product[])) => void
}

export const useOrder = create<UseOrder>()(
  persist((set, get) => ({
    order: [],
    setOrder: (order) => {
      const nextOrder = typeof order === "function" ? order(get().order) : order; set(({ order: nextOrder }))
    },
  }),
    {
      name: 'orders', // unique name for the storage
    }

  ))
