"use server"
import { db as prisma } from "@/lib/db"
export default async function GetIdentification(number: string) {
    const userExist = await prisma.user.findUnique({
        where: { number: number }
    })
    return userExist
}