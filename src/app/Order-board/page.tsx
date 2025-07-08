import OrderBoard from "./OrderBoard";
export const dynamic = "force-dynamic";

export default async function OrderBoardWrapper() {
    const getOrders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-order`, {
        method: "GET",
        next: { tags: ["orders"] }
    })
     const dataOrder = await getOrders.json() || []
    return (
        <>
            <OrderBoard getOrders={dataOrder} />
        </>
    )
}