'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import gsap from "gsap";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import prdct from "@/assets/menu/IMG_20250621_113655 1.svg";
import prdct2 from "@/assets/menu/IMG_20250621_113741 (1) 1.svg";
import prdct3 from "@/assets/menu/WhatsApp Image 2025-06-21 at 14.20.07 1.svg";
import Image from 'next/image';
import { PlusIcon } from 'lucide-react';
import { Product, useOrder } from '@/lib/zustand/useOrder';
import { useGSAP } from '@gsap/react';
import { formatToBrl } from '@/lib/formatToBrl';
gsap.registerPlugin(useGSAP);

export default function MenuOrder() {
    const products: Product[] = [
        {
            id: 1,
            image: prdct3,
            title: "Polpa de açai",
            subtitle: "Nosso açai vindo diretamente do norte, cada poupa rende até 2 litros.",
            price: "R$ 35,00",
            priceInCents:3500,
            qtd: 1,
            final_price: undefined
        },
        {
            id: 2,
            image: prdct2,
            title: "Farinha de Tapioca",
            subtitle: "Do norte, artesanal e fresquinha",
            price: "R$ 17,00",
            priceInCents: 1700,
            qtd: 1,
            final_price: undefined

        },
        {
            id: 3,
            image: prdct,
            title: "Farinha Branca",
            subtitle: "Perfeita para sua farofa ou açaí",
            price: "R$ 15,00",
            priceInCents: 1500,
            qtd: 1,
            final_price: undefined

        },
    ];

    const { order, setOrder } = useOrder()

    async function cartOrder(orderCart: Product) {
        setOrder(prev => {
            const existing = prev.find(p => p.id === orderCart.id)
            if (existing) {
                return prev.map(p => p.id === orderCart.id ? { ...p, qtd: p.qtd + 1 } : p)
            }
            return [...prev, { ...orderCart, qtd: 1 }]
        })
    }
    useGSAP(() => {
        gsap.fromTo('.cart-icon', { scale: 1 }, { scale: 1.2, duration: 0.3, ease: "power2.out", }); // <-- animation for the fruit

    }, [order]);

    const notify = () => toast("Produto adicionado!", {
        type: "success"
    });
    return (
        <div id='menu-order' className="  text-black pb-28 ">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto px-2'>
                {
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="flex justify-between items-center p-4 rounded-lg shadow-sm border border-gray-200 bg-white"
                        >
                            <div className="flex flex-col gap-1 max-w-[60%]">
                                <h3 className="text-sm font-semibold leading-tight">{product.title}</h3>
                                <p className="text-sm text-gray-600">{product.subtitle}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-bold text-primary">
                                        {formatToBrl(product.priceInCents * product.qtd)}
                                    </span>
                                     <button
                                    onClick={() => { cartOrder(product); notify(); }}
                                    className="bg-primary w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-transform duration-300"
                                >
                                    <PlusIcon className="text-white w-4 h-4" />
                                </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                               
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
}