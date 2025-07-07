import OrderBoard from "./OrderBoard";
type OrderStatus = 'NEW' | 'PENDING' | 'FINISHED' | 'CANCELLED';

interface Order {
    id: number;
    total: number;
    user: {
        name: string;
        number: string;
    };
    status: OrderStatus;
}
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