"use client";

import useMercadoPago from "@/hooks/useMercadoPago";

export default function Home() {
  const { createMercadoPagoCheckout } = useMercadoPago();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() =>
          createMercadoPagoCheckout({
            testeId: "123",
            userEmail: "contac.denilsoncoutinho@gmail.com",
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Comprar
      </button>
    </div>
  );
}