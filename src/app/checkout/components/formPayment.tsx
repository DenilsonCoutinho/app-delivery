"use client";
import Image from "next/image";
import pix from "../../../../public/logo-pix-icone-1024.png"
import dinheiro from "../../../../public/real-brasileiro.png"
import { useState } from "react";

export default function FormPayment() {
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

    return (
        <div className="max-w-xl mx-auto mt-10">
            <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary text-white px-4 py-2 font-semibold">
                    Escolha a forma de pagamento
                </div>

                <div className="divide-y">

                    <div className="px-4 py-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="dinheiro"
                                onChange={() => setPaymentMethod("dinheiro")}
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
                                type="radio"
                                name="payment"
                                value="pix"
                                onChange={() => setPaymentMethod("pix")}
                                checked={paymentMethod === "pix"}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 text-lg"><Image src={pix} width={20} height={20} alt="pix" /></span>
                                <span className="font-medium text-slate-700">Pix</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
