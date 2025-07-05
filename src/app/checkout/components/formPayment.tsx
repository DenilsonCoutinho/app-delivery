"use client";
import Image from "next/image";
import pix from "../../../../public/logo-pix-icone-1024.png"
import dinheiro from "../../../../public/real-brasileiro.png"
import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";

interface FormPaymentProps {
    formPayment: (e: string) => void
}
export default function FormPayment({ formPayment }: FormPaymentProps) {
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    function selectFormPayment(item: string) {
        setPaymentMethod((prev) => {
            if (prev === item) {
                return null
            }
            return item
        })
    }
    useEffect(() => {
        if (paymentMethod === null) {
            formPayment('')
        }
        if (paymentMethod) {
            formPayment(paymentMethod);
        }
    }, [paymentMethod]);
    return (
        <div className="max-w-xl mx-auto mt-10 slide-in-blurred-bottom">
            <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary text-white px-4 py-2 font-semibold">
                    Escolha a forma de pagamento
                </div>

                <div className="divide-y">

                    <div className="px-4 py-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="payment"
                                value="DINHEIRO"
                                onChange={() => selectFormPayment("dinheiro")}
                                checked={paymentMethod === "dinheiro"}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 text-lg"><Image src={dinheiro} width={20} height={20} alt="dinheiro" /></span>
                                <span className="font-medium  text-slate-700">Dinheiro (pagar na retirada)</span>
                            </div>
                        </label>
                    </div>

                    <div className="px-4 py-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="payment"
                                value="PIX"
                                onChange={() => selectFormPayment("pix")}
                                checked={paymentMethod === "pix"}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 text-lg"><Image src={pix} width={20} height={20} alt="pix" /></span>
                                <span className="font-medium text-slate-700">Pix</span>
                            </div>
                        </label>
                    </div>

                    <div className="px-4 py-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="payment-cartão"
                                value="cartão"
                                onChange={() => selectFormPayment("cartão")}
                                checked={paymentMethod === "cartão"}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 text-lg"><CreditCard /></span>
                                <span className="font-medium text-slate-700">Cartão</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
