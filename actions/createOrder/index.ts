"use server"

import { Product } from "@/lib/zustand/useOrder";
import { db as prisma } from "@/lib/db";
export default async function CreateOrder(order:Product,number:string,totPrice:number) {
    await prisma.order.create({
  data: {
    user: {
      connect: { number: number }
    },
    total: totPrice,
    items: {
      create: order
    }
  }
});

}