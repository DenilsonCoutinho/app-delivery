"use client"
import { useTriggerLoading } from "@/context/triggerLoading"

export default function Loading() {
    const { loading } = useTriggerLoading()
    return (
        loading ?
            <div className="h-screen flex justify-center items-center fixed w-full !z-[100]">
                <div className="lds-circle z-10"><div className=""></div></div>
                <div className="bg-gray-400 opacity-75 h-full w-full fixed"></div>
            </div>
            :
            <></>
    )
}