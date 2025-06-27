"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
interface TriggerResizeProps {
    inneHeigth: number;
    setInneHeigth: React.Dispatch<React.SetStateAction<number>>;
}
const ResizeContext = createContext<TriggerResizeProps | undefined>(undefined);
interface TriggerResizeProviderProps {
    children: ReactNode;
}
export function TriggerResizeProvider({ children }: TriggerResizeProviderProps) {
    const [inneHeigth, setInneHeigth] = useState<number>(0);

    async function windowResize() {
        setInneHeigth(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            windowResize()
        })
        return () => {
            // limpa quando o componente for desmontado
            window.removeEventListener('resize', windowResize)
        }
    }, [inneHeigth])

    return (
        <ResizeContext.Provider value={{ inneHeigth, setInneHeigth }}>
            {children}
        </ResizeContext.Provider>
    );
}
export function useTriggerResize(): TriggerResizeProps {
    const context = useContext(ResizeContext);
    if (!context) {
        throw new Error('useTriggerResize deve ser usado dentro de um TriggerResizeProvider');
    }
    return context;
}