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
import { Modal } from "../components/ui/modal"
import { useModal } from "@/lib/zustand/useModal"
import GetIdentification from "@/services/getDataIdentification"
import { maskPhone } from "@/lib/maskPhone"
import UpsertIdentification from "@/services/upsertIdentification"
import { error } from "console"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import CreateOrder from "../../../actions/createOrder"
import { isWithinWorkingHours } from "@/lib/estabilishmentIsOpen"
export default function Checkout() {
    useEffect(() => {
        setLoading(false)
        if (isWithinWorkingHours()) {
            console.log('Estamos dentro do horário de atendimento!');
        } else {
            toast("Fora do horário de atendimento", {
                type: "error"
            });
            return route.replace("/?toElement=menu-order")
        }
        if (order.length === 0) {
            return route.replace("/?toElement=menu-order")
        }


    }, [])
    const { setLoading } = useTriggerLoading()
    const { order } = useOrder()
    const { isClosed, setIsClosed } = useModal()
    const { name, setName, number, setNumber } = useIdentification()
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [formPaymentIsSelected, setFormPaymentIsSelected] = useState<string | undefined>();
    const idOrder = uuidv4()
    const addresses =
    {
        id: "1",
        title: "Endereço de retirada",
        value: "Rua Bernado Welter, 346 - COSTA E SILVA, Joinville",
    }
    const route = useRouter()

    const priceInCents = order?.map((i) => {
        return i?.priceInCents * i.qtd
    })
    const fullPrice = priceInCents.reduce((acc, current) => {
        return acc + current;
    }, 0);
    function selectFormDelivery(item: string) {
        setSelectedOption((prev) => {
            if (prev === item) {
                setFormPaymentIsSelected("")
                return null
            }
            return item
        })
    }
    async function nameExist() {
        if (number.length < 15) throw new Error("Número de telefone incompleto!")
        setLoading(true)
        const OnlyNumber = number.replace(/[ \-\(\)]/g, "")
        const userExist = await GetIdentification(OnlyNumber)
        if (userExist?.number) {
            // setName(userExist.name)
            setLoading(false)
            return { nameExist: true, name: userExist.name }
        }
        setLoading(false)
    }

    const isValid = number.trim() !== '' && name.trim() !== '';

    async function createOrUpdateUser() {
        try {
            setLoading(true)
            if (!isValid) {
                setLoading(false)
                return
            }
            const isNameExiste = await nameExist()
            if (isNameExiste?.name === name) {
                setIsClosed(!isClosed)
                toast(`Nenhum dado foi alterado`, {
                    type: "info"
                });
                return
            }
            const OnlyNumber = number.replace(/[ \-\(\)]/g, "")
            await UpsertIdentification(OnlyNumber, name)
            setLoading(false)
            setIsClosed(!isClosed)
        } catch (error) {
            setLoading(false)
            if (error instanceof Error) {
                toast(`${error}`, {
                    type: "error"
                });
                return
            }
            toast(`${error}`, {
                type: "error"
            });
        }

    }

    const { createMercadoPagoCheckout } = useMercadoPago();
    async function createCheckoutOrNot() {
        try {
            setLoading(true)
            if (formPaymentIsSelected === "pix") {
                createMercadoPagoCheckout({
                    testeId: idOrder,
                    // userEmail: "contact.denilsoncoutinho@gmail.com",
                    items: order,
                    number: number,
                    name: name,
                    paymentForm: formPaymentIsSelected
                })
                return
            }
            const OnlyNumber = number?.replace(/[ \-\(\)]/g, "")
            const orders: any = order.map((item: any) => ({
                title: item.title,
                subtitle: item.subtitle,
                qtd: item.qtd,
                price: item.price,
                priceInCents: item?.priceInCents,
                final_price: item.final_price,
            }));

            const priceReduce = priceInCents.reduce((acumulador: any, numero: any) => acumulador + numero, 0);
            const createOrder = await CreateOrder(orders, OnlyNumber, priceReduce, formPaymentIsSelected!)
            const ordersToN8n = order.map((item: any) => ({
                title: item.title,
                subtitle: item.subtitle,
                qtd: item.qtd,
                price: item.price,
                priceInCents: item?.priceInCents,
                final_price: formatToBrl(item?.priceInCents * item.qtd),
            }));
            await fetch('https://n8n-app-geli.fly.dev/webhook/d79a1391-4e64-4ff8-af61-f6edf2fe8084', {
                method: 'POST', // ou 'GET' dependendo de como você configurou o webhook
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    number: OnlyNumber,
                    orders: ordersToN8n,
                    totPrice: priceReduce,
                    id: createOrder?.id
                }),
            });
            route.replace('/accompany')
        } catch (error) {
            setLoading(false)
            toast(`Ocorreu algo errado!`, {
                type: "error"
            });
        }

    }

    return (
        <div className=" bg-white min-h-dvh">
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-sm text-gray-600">Este pedido será entregue a:</h2>
                <div className="font-semibold text-lg text-gray-700">{name}</div>
                <div className="text-gray-700 mb-4">{number}</div>

                <Button onClick={() => setIsClosed(!isClosed)} className="text-primary cursor-pointer border border-primary rounded px-3 py-1 text-sm">Trocar</Button>

                <div className="mt-6 border rounded-lg overflow-hidden">
                    <div className="bg-primary text-white px-4 py-2 font-semibold">
                        Retirar em
                    </div>

                    <div className="divide-y text-slate-900">

                        <div className="px-4 py-3">
                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    name="delivery"
                                    value={addresses.id}
                                    onChange={() => selectFormDelivery(addresses.id)}
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
                {
                    selectedOption &&
                    <FormPayment formPayment={(e) => { setFormPaymentIsSelected(e) }} />
                }
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

                <Button disabled={!formPaymentIsSelected} onClick={() => createCheckoutOrNot()} className={`w-full mt-4 bg-primary ${formPaymentIsSelected ? "cursor-pointer" : "cursor-not-allowed opacity-55"} text-white py-3 rounded font-semibold`}>
                    Confirmar
                </Button>
            </div>
            <Modal.Root>
                <Modal.Content >
                    <Modal.Close onClose={() => { setIsClosed(!isClosed) }}></Modal.Close>
                    <div className="flex items- justify-center bg-white px-4">
                        <div className="max-w-md w-full ">
                            <Button className="cursor-pointer text-gray-700 border-b-slate-400 border-b w-full mb-4 flex items-center space-x-1 ">
                                <span>Identifique-se</span>
                            </Button>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Seu número de WhatsApp é:
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="(22) 2 2222-2222"
                                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 text-black focus:ring-primary"
                                        value={number}
                                        maxLength={14}
                                        onChange={(e) => setNumber(maskPhone(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Seu nome e sobrenome:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nome e sobrenome"
                                        className="w-full border rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={name}
                                        maxLength={124}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <Button
                                    onClick={() => createOrUpdateUser()}
                                    disabled={!isValid}
                                    className={`w-full py-2 rounded-md cursor-pointer font-semibold text-white transition ${isValid ? 'bg-primary' : 'bg-gray-300 cursor-not-allowed'}`}>
                                    Salvar
                                </Button>

                                <p className="text-xs text-center text-gray-500">
                                    Para realizar seu pedido vamos precisar de suas informações, este é um ambiente protegido.
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
            </Modal.Root>
        </div>
    )
}