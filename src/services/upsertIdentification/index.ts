"use server"
import { db as prisma } from "@/lib/db"
export default async function UpsertIdentification(phone: string, name: string) {

    await prisma.user.upsert({
        where: { number: phone },
        update: { name: name },
        create: { number: phone, name: name }
    })

}