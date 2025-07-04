"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
interface TriggerLoadingProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoadinContext = createContext<TriggerLoadingProps | undefined>(undefined);
interface TriggerLoadingProviderProps {
    children: ReactNode;
}
export function TriggerLoadingProvider({ children }: TriggerLoadingProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadinContext.Provider value={{ loading,setLoading }}>
            {children}
        </LoadinContext.Provider>
    );
}
export function useTriggerLoading(): TriggerLoadingProps {
    const context = useContext(LoadinContext);
    if (!context) {
        throw new Error('useTriggerResize deve ser usado dentro de um TriggerResizeProvider');
    }
    return context;
}