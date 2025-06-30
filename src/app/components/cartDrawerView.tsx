'use client'
import { Product, useOrder } from "@/lib/zustand/useOrder";
import { Drawer } from "./ui/drawer";
import Image from "next/image";
import { formatToBrl } from "@/lib/formatToBrl";
import Button from "./ui/button/button";
import { Minus, PlusIcon } from "lucide-react";
import { useDrawer } from "@/lib/zustand/useDrawer";
import { useTriggerResize } from "@/context/triggerResize";
import { useRouter } from "next/navigation";
export default function CartDrawerView() {
    const { order, setOrder } = useOrder()
    const { isClosed, setIsClosed } = useDrawer()
    const { inneHeigth } = useTriggerResize()
    const priceInCents = order?.map((i) => {
        return i?.priceInCents * i.qtd
    })
    const fullPrice = priceInCents.reduce((acc, current) => {
        return acc + current;
    }, 0);

    function decremetItem(item: Product) {
        setOrder(prev => {
            const existing = prev.find(p => p.id === item.id)

            if (existing) {
                if (existing.qtd <= 1) {
                    return prev.filter(p => p.id !== item.id)
                }

                return prev.map(p => p.id === item.id ? { ...p, qtd: p.qtd - 1 } : p)
            }

            return [...prev, { ...item, qtd: 1 }]
        })
    }
    function incrementItem(item: Product) {
        setOrder(prev => {
            const existing = prev.find(p => p.id === item.id)
            if (existing) {
                return prev.map(p => p.id === item.id ? { ...p, qtd: p.qtd + 1 } : p)
            }
            return [...prev, { ...item, qtd: 1 }]
        })
    }

    const route = useRouter()

    return (
        <>
            <Drawer.Root>
                <Drawer.Content>
                    <div className="flex justify-between h-20">
                        <Drawer.Closer onClose={() => setIsClosed(!isClosed)} />
                        <Drawer.Title>Seus pedidos</Drawer.Title>
                    </div>
                    <div style={{ height: inneHeigth - 120 + "px" }} className=" h-full overflow-y-auto shadow-xs">
                        {order.length == 0 ?
                            <div className="flex justify-center items-center h-full">
                                <p className="text-slate-500">Sem produtos no carrinho</p>
                            </div>
                            : order?.map((item) => (
                                <div
                                    key={item.id}
                                    className={`bg-white content-${item.id} rounded-xl flex flex-row items-center gap-1  py-5 px-4 text-center`}>
                                    <div>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded-md mb-4"
                                        />
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col items-start">
                                            <div className="flex flex-row gap-1 items-start">
                                                <h2 className="text-xs font-semibold text-gray-400">X{item.qtd}</h2>
                                                <h2 className="text-xs font-bold text-gray-400">{item.title}</h2>
                                            </div>
                                            <h2 className="text-sm font-semibold text-gray-400">{formatToBrl(item.priceInCents * item.qtd)}</h2>
                                        </div>
                                        <div className="flex  gap-3">
                                            <Button onClick={() => decremetItem(item)} className="Drecrement-Button cursor-pointer active:scale-95 duration-75 flex justify-center items-center bg-red-500 w-7 h-7 rounded-full"><Minus className="text-white" /></Button>
                                            <Button onClick={() => incrementItem(item)} className="Increment-Button cursor-pointer active:scale-95 duration-75 flex justify-center items-center bg-green-500 w-7 h-7 rounded-full"><PlusIcon className="text-white" /></Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                    </div>
                    <Drawer.Footer>
                        <h1 className="text-center text-xl text-black">
                            TOTAL:{formatToBrl(fullPrice)}
                        </h1>
                        <div className="flex justify-between items-center mt-2">
                            <Button onClick={() => setIsClosed(!isClosed)} className=" bg-primary text-white rounded-2xl p-2 text-xl cursor-pointer">Pedir mais</Button>
                            <Button onClick={() => route.push("/cart-page")} disabled={order.length === 0 ? true : false} className={`${order.length === 0 ? "cursor-not-allowed" : "cursor-pointer"} bg-confirm text-white rounded-2xl p-2 text-xl`}>Finalizar Pedido</Button>
                        </div>
                    </Drawer.Footer>
                </Drawer.Content>

            </Drawer.Root>
        </>
    )
}