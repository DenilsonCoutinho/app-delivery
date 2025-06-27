"use client"

import { useDrawer } from "@/lib/zustand/useDrawer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { X } from "lucide-react"
gsap.registerPlugin(useGSAP);

interface DrawerRootProps {
    children?: React.ReactNode
}
export function DrawerRoot({ children }: DrawerRootProps) {
    const { isClosed } = useDrawer()
    useGSAP(async () => {
        if (isClosed) {
            document.querySelector(".drawer-orvelay-root")?.classList.remove("hidden")
            gsap.set(".drawer-orvelay-root", { display: "" });
        } else {
            await new Promise(resolve => setTimeout(resolve, 100))
            gsap.set(".drawer-orvelay-root", { display: "none" });
        }
    }, [isClosed]);
    return (
        <div className="drawer-orvelay-root hidden">
            {children}
            <div className="overlay-drawer fixed bg-black opacity-60 w-full h-full z-[40]">
            </div>
        </div>
    )
}
interface DrawerCloseProps {
    onClose: () => void
}
export function DrawerCloser({ onClose }: DrawerCloseProps) {
    return (
        <div className=" p-3">
            <h1 className="text-2xl text-black cursor-pointer" >
                <X onClick={onClose} className="text-black " />
            </h1>
        </div>
    )
}

interface DrawerTitleProps {
    children?: React.ReactNode

}
export function DrawerTitle({ children }: DrawerTitleProps) {
    return (
        <div className=" p-3">
            <h1 className="text-2xl text-black" >
                {children}
            </h1>
        </div>
    )
}

interface DrawerContentProps {
    children?: React.ReactNode
}
export function DrawerContent({ children }: DrawerContentProps) {
    const { isClosed, setIsClosed } = useDrawer()
    useGSAP(() => {
        if (isClosed) {
            gsap.fromTo(".drawer-content", { x: 110 }, { x: 0, duration: 1, ease: "elastic" });
        } else {
            gsap.fromTo(".drawer-content", { x: 0 }, { x: 510, duration: 1, ease: "elastic" });
        }

    }, [isClosed]);
    return (
        <>
            {<div className="drawer-content  flex flex-col justify-between max-w-[400px] w-full h-full overflow-y-scroll shadow-md bg-white z-[66] fixed right-0">
                {children}
            </div>}
        </>
    )
}


export function DrawerFooter({ children }: DrawerTitleProps) {
    return (
        <div className="h-28 w-full shadow-black shadow-xs p-3">
            <h1 className="text-2xl text-black" >
                {children}
            </h1>
        </div>
    )
}