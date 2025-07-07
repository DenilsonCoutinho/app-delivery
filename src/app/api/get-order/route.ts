import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
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
  return NextResponse.json({
     orders
    });
}