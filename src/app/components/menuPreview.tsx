"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import prdct from "@/assets/menu/IMG_20250621_113655 1.svg";
import prdct2 from "@/assets/menu/IMG_20250621_113741 (1) 1.svg";
import prdct3 from "@/assets/menu/WhatsApp Image 2025-06-21 at 14.20.07 1.svg";
import Button from "./ui/button/button";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        image: prdct3,
        title: "Polpa de açai",
        subtitle: "Nosso açai vindo diretamente do norte, cada poupa rende até 2 litros.",
    },
    {
        id: 2,
        image: prdct2,
        title: "Farinha de Tapioca",
        subtitle: "Do norte, artesanal e fresquinha",
    },
    {
        id: 3,
        image: prdct,
        title: "Farinha Branca",
        subtitle: "Perfeita para sua farofa ou açaí",
    },
];

export default function Menu() {
    useGSAP(() => {
        products.forEach((product) => {
            if (product.id % 2 === 0) {
                gsap.fromTo(
                    `.content-${product.id}`,
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.4,
                        ease: "back.inOut",
                        scrollTrigger: {
                            trigger: `.content-${product.id}`,
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            } else {
                gsap.fromTo(
                    `.content-${product.id}`,
                    { opacity: 0, x: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.4,
                        ease: "back.inOut",
                        scrollTrigger: {
                            trigger: `.content-${product.id}`,
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

        });
    });

  
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 -translate-y-16 overflow-hidden">

            {products.map((item) => (
                <div
                    key={item.id}
                    className={`bg-white content-${item.id} rounded-xl flex flex-col justify-between h-[450px] shadow-2xl py-5 px-4 text-center`}
                >
                    <div
                        
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-gray-600 mb-4">{item.subtitle}</p>
                    <Button className="bg-primary active:scale-90 shadow-xs text-white px-4 py-2 rounded-2xl hover:brightness-150 duration-100">
                        Ver cardápio
                    </Button>
                </div>
            ))}
        </div>
    );
}
