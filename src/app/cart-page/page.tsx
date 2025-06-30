"use client"
import Image from 'next/image';
import { useOrder, type Product } from '@/lib/zustand/useOrder'; // ajuste o caminho se necessário
import Button from '../components/ui/button/button';
import { Minus, PlusIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import acai_na_tigela from '@/assets/hero-section/açai-na-tigela.png'


export default function CartPage() {
    const { order, setOrder } = useOrder()
    function incrementItem(item: Product) {
        setOrder(prev => {
            const itemExist = prev.find(e => e.id === item.id)
            if (itemExist) {
                return prev.map(e => e.id === itemExist.id ? { ...e, qtd: e.qtd + 1 } : e)
            }
            return [...prev, { ...item, qtd: 1 }]
        })
    }

    function decremetItem(item: Product) {
        setOrder(prev => {
            const itemExist = prev.find(e => e.id === item.id)
            if (itemExist) {
                if (itemExist.qtd <= 1) {
                    console.log(itemExist)
                    return prev.filter(e => e.id !== item.id)
                }
                return prev.map(e => e.id === itemExist.id ? { ...e, qtd: e.qtd - 1 } : e)
            }
            return []
        })
    }

    const route = useRouter()

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="max-w-xl mx-auto w-full px-4">
                <div className="flex items-center py-4">
                    <Button onClick={()=>route.push('/')} className="text-xl text-slate-800">⬅</Button>
                    <h1 className="ml-4 text-xl font-semibold text-slate-800">Carrinho</h1>
                </div>

                {order.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border-b py-4">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="rounded"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-slate-800">{item.qtd}x {item.title}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-primary font-bold text-lg">R$ {(item.priceInCents / 100).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={() => decremetItem(item)} className="Drecrement-Button cursor-pointer active:scale-95 duration-75 flex justify-center items-center bg-red-500 w-7 h-7 rounded-full">
                                {item.qtd === 1 ? <Trash className='w-4 h-4' /> : <Minus className="text-white" />}
                            </Button>
                            <span className='text-black'>{item.qtd}</span>
                            <Button onClick={() => incrementItem(item)} className="Increment-Button cursor-pointer active:scale-95 duration-75 flex justify-center items-center bg-green-500 w-7 h-7 rounded-full">
                                <PlusIcon className="text-white " />
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="text-center my-6">
                    <button className="border-2 border-blue-500 text-blue-600 px-6 py-2 rounded-md">
                        Adicionar mais produtos
                    </button>
                </div>
            </div>

            <div className="mt-auto w-full max-w-xl mx-auto p-4">
                <Button className="bg-primary text-white font-bold w-full py-3 rounded-md relative">
                    Avançar R$ {(order.reduce((acc, p) => acc + (p.qtd * p.priceInCents), 0) / 100).toFixed(2)}
                    <Image src={acai_na_tigela} alt='acai_na_tigela' className='absolute w-10 top-0'/>
                    <Image src={acai_na_tigela} alt='acai_na_tigela' className='absolute w-10 top-0 right-0'/>
                </Button>
            </div>
        </div>
    );
}
