'use client';

import { maskPhone } from '@/lib/maskPhone';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../components/ui/button/button';
import CreateIdentificationUser from '../../../actions/createIdentificationUser';
import GetIdentification from '@/services/getDataIdentification';
import { useIdentification } from '@/lib/zustand/useIdentification';
import { useTriggerLoading } from '@/context/triggerLoading';
import { useOrder } from '@/lib/zustand/useOrder';

export default function Identification() {
    useEffect(() => {
        setLoading(true)
        if (order.length === 0){
            return route.replace("/?toElement=menu-order")
        }
        setLoading(false)
        
    }, [])
    const [userDataExist, setUserDataExist] = useState<boolean>()
    const { setLoading } = useTriggerLoading()
    const { name, setName, number, setNumber } = useIdentification()
    const { order } = useOrder()

    const isValid = number.trim() !== '' && name.trim() !== '';
    const route = useRouter()

    async function nameExist() {
        if (number.length < 15) return
        setLoading(true)
        const OnlyNumber = number.replace(/[ \-\(\)]/g, "")
        const userExist = await GetIdentification(OnlyNumber)
        if (userExist?.number) {
            setName(userExist.name)
            setUserDataExist(true)
            setLoading(false)
            return
        }
        setUserDataExist(false)
        setLoading(false)
    }
    async function identifyUserExist() {
        setLoading(true)
        if (!isValid) {
            return
        }

        if (userDataExist || number) {
            route.push("/checkout")
            setLoading(false)
            return
        }
        const OnlyNumber = number.replace(/[ \-\(\)]/g, "")
        await CreateIdentificationUser(OnlyNumber, name)
        route.push("/checkout")
    }

    return (
        <div className="min-h-screen flex items- justify-center bg-white px-4">
            <div className="max-w-md w-full ">
                <Button onClick={() => route.push('/cart-page')} className="cursor-pointer text-gray-700 border-b-slate-400 border-b w-full mb-4 flex items-center space-x-1 ">
                    <span className='text-2xl'>&larr;</span>
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
                            onBlur={() => nameExist()}
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
                        onClick={() => identifyUserExist()}
                        disabled={!isValid}
                        className={`w-full py-2 rounded-md cursor-pointer font-semibold text-white transition ${isValid ? 'bg-primary' : 'bg-gray-300 cursor-not-allowed'}`}>
                        Avançar
                    </Button>

                    <p className="text-xs text-center text-gray-500">
                        Para realizar seu pedido vamos precisar de suas informações, este é um ambiente protegido.
                    </p>
                </div>
            </div>
        </div>
    );
}
