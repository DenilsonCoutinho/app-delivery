"use client"
import { useTriggerLoading } from "@/context/triggerLoading"
import { useIdentification } from "@/lib/zustand/useIdentification"
import { useOrder } from "@/lib/zustand/useOrder"
import { useEffect, useState } from "react"
import Button from "../components/ui/button/button"
import FormPayment from "./components/formPayment"
import useMercadoPago from "@/hooks/useMercadoPago"
import { formatToBrl } from "@/lib/formatToBrl"
import { v4 as uuidv4 } from 'uuid';
export default function Checkout() {
    const { setLoading } = useTriggerLoading()
    const { order } = useOrder()
    const { number, name } = useIdentification()
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const idOrder = uuidv4()
    const addresses =
    {
        id: "1",
        title: "Endereço de retirada",
        value: "Rua Bernado Welter, 346 - COSTA E SILVA, Joinville",
    }
    useEffect(() => {
        setLoading(false)
    }, [])
    const { createMercadoPagoCheckout } = useMercadoPago();
    const priceInCents = order?.map((i) => {
        return i?.priceInCents * i.qtd
    })
    const fullPrice = priceInCents.reduce((acc, current) => {
        return acc + current;
    }, 0);

    console.log(fullPrice)
    console.log(order)
    return (
        <div className=" bg-white">
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-sm text-gray-600">Este pedido será entregue a:</h2>
                <div className="font-semibold text-lg text-gray-700">{name}</div>
                <div className="text-gray-700 mb-4">{number}</div>

                <button className="text-primary border border-primary rounded px-3 py-1 text-sm">Trocar</button>

                <div className="mt-6 border rounded-lg overflow-hidden">
                    <div className="bg-primary text-white px-4 py-2 font-semibold">
                        Retirar em
                    </div>

                    <div className="divide-y text-slate-900">

                        <div className="px-4 py-3">
                            <label className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="delivery"
                                    value={addresses.id}
                                    onChange={() => setSelectedOption(addresses.id)}
                                    checked={selectedOption === addresses.id}
                                />
                                <div>
                                    <div className="font-medium">{addresses.title}</div>
                                    <div className="text-sm text-gray-600">{addresses.value}</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <FormPayment />
                <div className="mt-6 border-t pt-4 text-sm text-slate-800">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatToBrl(fullPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxa de entrega</span>
                        <span>R$ 0,00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total</span>
                        <span>{formatToBrl(fullPrice)}</span>
                    </div>
                </div>

                <Button onClick={() =>
                    createMercadoPagoCheckout({
                        testeId: idOrder,
                        userEmail: "contact.denilsoncoutinho@gmail.com",
                        items:order
                    })
                } className="w-full mt-4 bg-primary cursor-pointer text-white py-3 rounded font-semibold">
                    Confirmar
                </Button>
            </div>
        </div>
    )
}