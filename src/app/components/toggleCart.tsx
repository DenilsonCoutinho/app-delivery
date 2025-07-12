"use client"
import { isWithinWorkingHours } from "@/lib/estabilishmentIsOpen"
import { useDrawer } from "@/lib/zustand/useDrawer"
import { useOrder } from "@/lib/zustand/useOrder"
import { ShoppingCart } from "lucide-react"
import { toast } from "react-toastify"

function ButtonCart() {
    const { order } = useOrder()
    const { isClosed, setIsClosed } = useDrawer()
    return (
        <>
            <div id="cart-icon" onClick={() => {
                if (isWithinWorkingHours()) {
                    console.log('Estamos dentro do horário de atendimento!');
                    setIsClosed(!isClosed)

                } else {
                    console.log('Fora do horário de atendimento.');
                    toast("Fora do horário de atendimento.", {
                        type: "error"
                    });
                }

            }} className="cart-icon cursor-pointer flex justify-center items-center fixed bottom-28 right-4 h-14 w-14 rounded-full bg-primary z-20">
                <ShoppingCart />
                <div className="bg-slate-200 text-xs shadow-md absolute top-0 left-0 h-5 w-5 flex justify-center items-center text-red-600 rounded-full">
                    {order.length}
                </div>
            </div>
        </>
    )
}

export default function ToggleCart() {
    return (
        <>
            <ButtonCart />
        </>
    )
}