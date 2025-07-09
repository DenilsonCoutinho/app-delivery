import { Suspense } from "react";
import OrderBoard from "./OrderBoard";

export default async function OrderBoardWrapper() {
    const getOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-order`, {
        method: "GET",
        next: { tags: ["orders"] }
    })
    if (!getOrders.ok) {
        console.error("Erro ao buscar pedidos:", getOrders.statusText)
        return null;
    }
     const dataOrder = await getOrders.json() || undefined
    return (
        <Suspense fallback={<></>}>
            <OrderBoard getOrders={dataOrder} />
        </Suspense>
    )
}