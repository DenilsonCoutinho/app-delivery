"use server"

import { db as prisma } from "@/lib/db"

export default async function CreateIdentificationUser(number: string, name: string) {
  await prisma.user.create({
    data: {
      number: number,
      name: name
    }
  })
}
