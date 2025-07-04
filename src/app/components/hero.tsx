"use client"
import logo from '@/assets/logo/logo.jpeg'
import map from '@/assets/hero-section/map.svg'
import acai_na_tigela from '@/assets/hero-section/açai-na-tigela.png'
import leaf from '@/assets/hero-section/leaf.png'
import acai from '@/assets/hero-section/Acai-fruta-e-folhas-grande-2 1.png'
import Image from 'next/image'
import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react';
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { scrollToElement } from '@/lib/useScrollIntoView'
import CreateIdentificationUser from '../../../actions/createIdentificationUser'
gsap.registerPlugin(useGSAP);

export default function Hero() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const toScroll = searchParams.get('toElement');
        if (!toScroll) return
        async function scrollTrigger() {
            await scrollToElement(toScroll as string)
        }
        scrollTrigger()
    }, [])
    useGSAP(() => {
        gsap.fromTo('.fruit-acai', { opacity: 0, }, { opacity: 1, x: 0, rotation: 360, duration: 4, ease: "power2.out", }); // <-- animation for the fruit
        gsap.to('.acai_na_tigela', { duration: 2, ease: "back.inOut", y: -10, scale: 1.01, yoyo: true, repeat: -1, }); // <-- animation for the leaf
        gsap.to('.leaf', { duration: 2, ease: "power2.out", x: -10, scale: 1.01, yoyo: true, }); // <-- animation for the leaf

    });

    return (
        <div className="bg-gradient-to-b from-[#1F062D] pt-10 h-[30rem] to-[#641493] overflow-hidden relative">
            <Image src={logo} alt="Logo" className="mx-auto shadow-md rounded-full" width={150} height={150} />
            <Image src={map} alt="map" className="mx-auto absolute top-40 rounded-full" width={400} height={450} />
            <div className='absolute -right-5 top-2 '>
                <Image src={leaf} alt="Logo" className="leaf" width={90} height={450} quality={100} />
            </div>
            <div className='relative flex flex-col justify-center items-center max-w-[500px] mt-10 mx-auto'>
                <h1 className='text-white text-5xl text-center'>Açai original</h1>
                <Image src={acai} alt="Logo" className=" absolute -left-10 -top-20 fruit-acai" width={150} height={450} quality={100} />
                <h1 className='text-white text-5xl text-center font-bold z-20'>Do norte</h1>
                <div className='absolute -right-16 top-10'>
                    <Image src={acai_na_tigela} alt="Logo" className="acai_na_tigela" width={190} height={450} quality={100} />
                </div>

            </div>
        </div>
    )
}