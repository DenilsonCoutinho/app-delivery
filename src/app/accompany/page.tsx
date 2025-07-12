"use client";

import { useTriggerLoading } from "@/context/triggerLoading";
import { useIdentification } from "@/lib/zustand/useIdentification";
import { useOrder } from "@/lib/zustand/useOrder";
import { useEffect, useState } from "react";

export default function Accompany() {
    const [numero, setNumero] = useState("5548991109700"); // Altere para o número do seu WhatsApp (com DDI)
    const [mensagem, setMensagem] = useState("Olá! Quero acompanhar meu pedido!");
    const { name, setName, number, setNumber } = useIdentification()
    const { order, setOrder } = useOrder()
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    const { setLoading } = useTriggerLoading()

    useEffect(() => {
        setOrder([])
        setLoading(false)

    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Acompanhe seu pedido</h1>
            <p className="text-gray-600 mb-6">Clique no botão abaixo para falar conosco via WhatsApp.</p>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg transition"
            >
                Ir para o WhatsApp
            </a>
        </div>
    );
}
