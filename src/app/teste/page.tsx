"use client";

import useMercadoPago from "@/hooks/useMercadoPago";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Comprar
      </button>
    </div>
  );
}