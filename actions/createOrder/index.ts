"use server"

import { Product } from "@/lib/zustand/useOrder";
import { db as prisma } from "@/lib/db";
import { revalidateTag } from "next/cache";
export default async function CreateOrder(order: Product, number: string, totPrice: number, paymentForm: string,isPaid?:"PAID") {
   const create = await prisma.order.create({
        data: {
            user: {
                connect: { number: number }
            },
            total: totPrice,
            items: {
                create: order
            },
            payment_form: paymentForm,
            paid:isPaid
        }
    });
  revalidateTag('orders')
return create
}