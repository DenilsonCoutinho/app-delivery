"use server"
import { db as prisma } from "@/lib/db"
import { OrderStatus } from "@prisma/client";
import { revalidateTag } from "next/cache";
export default async function UpdateOrder(id: number, status: OrderStatus) {

  const orders = await prisma.order.update({
    where: { id },
    data: { status: status }
  })
  revalidateTag('orders')
}