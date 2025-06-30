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
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export default function MenuOrder() {
    const products: Product[] = [
        {
            id: 1,
            image: prdct3,
            title: "Polpa de açai",
            subtitle: "Nosso açai vindo diretamente do norte, cada poupa rende até 2 litros.",
            price: "R$ 35,00",
            priceInCents: 3500,
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
        <div id='menu-order' className=" bg-gray-100 text-black ">
            <div className='md:flex hidden md:h-96'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper select-none max-w-[500px] bg-gray-100"
                >
                    {
                        products.map((product) => (
                            <SwiperSlide key={product.id} className='flex flex-col items-center justify-center max-w-96 mx-auto relative'>
                                <div
                                >
                                    <Image src={product.image} alt={product.title} className=' w-full mx-auto' />
                                </div>
                                <h3 className='font-bold text-sm'>{product.title}</h3>
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-bold text-sm'>{product.price}</h3>
                                    <div onClick={() => { cartOrder(product); notify() }} className='bg-primary cursor-pointer active:scale-95 duration-300 w-7 h-7 rounded-full flex items-center justify-center  '>
                                        <PlusIcon className='text-white ' />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='md:hidden flex flex-col gap-14'>
                {
                    products.map((product) => (
                        <div key={product.id} className='flex  flex-col items-center justify-center max-w-96 mx-auto relative'>
                            <div
                            >
                                <Image src={product.image} alt={product.title} className=' w-40 mx-auto' />
                            </div>
                            <h3 className='font-bold text-sm'>{product.title}</h3>
                            <div className='flex items-center justify-between w-40 gap-5 mx-auto '>
                                <h3 className='font-bold text-sm'>{product.price}</h3>
                                <div onClick={() => { cartOrder(product); notify() }} className='bg-primary cursor-pointer active:scale-95 duration-300 w-7 h-7 rounded-full flex items-center justify-center  '>
                                    <PlusIcon className='text-white ' />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}