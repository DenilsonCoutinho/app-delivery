import { clsx } from 'clsx'
import { ReactNode } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { X } from "lucide-react"
import { useModal } from '@/lib/zustand/useModal';
gsap.registerPlugin(useGSAP);


interface ModalCloseProps {
    onClose: () => void
}
export function ModalCloser({ onClose }: ModalCloseProps) {
    const { isClosed, setIsClosed } = useModal()
    return (
        <div className=" flex justify-end w-full">
            <h1 className="text-2xl text-black cursor-pointer" >
                <X onClick={onClose} className="text-black bg" />
            </h1>
        </div>
    )
}

interface ModalContainerProps {
    children: ReactNode
}
export function ModalRoot({ children }: ModalContainerProps) {
    const { isClosed } = useModal()
    useGSAP(async () => {
        if (isClosed) {
            document.querySelector(".modal-root")?.classList.remove("hidden")
            document.querySelector(".modal-orvelay-root")?.classList.remove("hidden")
            gsap.set(".modal-orvelay-root", { display: "" });
        } else {
            gsap.set(".modal-orvelay-root", { display: "none" });
        }
    }, [isClosed]);
    return (
        <div className='modal-root hidden !z-[90]'>
            <div className="h-full  modal-orvelay-root w-full flex justify-center items-center fixed top-0 !z-[90]">
                {children}
                <div className="modal-orvelay-root bg-black opacity-40 fixed h-full w-full"></div>
            </div>
        </div>
    )
}

interface ModalContentProps {
    children: ReactNode
    className?: string
    width?: "sm" | "md" | "lg" | "none";
    height?: "sm" | "md" | "lg" | "none";
}
const heightMap = {
    sm: "max-h-[300px]",
    md: "max-h-[500px]",
    lg: "max-h-[700px]",
    none: ""
};

const widhtMap = {
    sm: "max-w-[200px]",
    md: "max-w-[500px]",
    lg: "max-w-[800px]",
    none: ""
};

export function ModalContent({ children, className, height = "md", width = "md" }: ModalContentProps) {
    const { isClosed } = useModal()
    useGSAP(async () => {
        if (isClosed) {
            gsap.fromTo(".modal-content", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.3, });
        }
        return

    }, [isClosed]);
    return (
        <div className={clsx(`modal-content bg-white  w-full h-full z-[90] rounded-md overflow-y-auto p-2`, widhtMap[width], heightMap[height], className)}>
            {children}
        </div>
    )
}