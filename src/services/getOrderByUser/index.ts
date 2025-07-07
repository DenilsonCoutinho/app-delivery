"use server"
import { db as prisma } from "@/lib/db"
export default async function GetOrderByUser() {

    const orders = await prisma.order.findMany({
    where: {
      status: {
        in: ['NEW', 'PENDING', 'FINISHED'],
      },
    },
    include: {
      user: true,
      items:true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
    return orders
}