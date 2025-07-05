// app/api/mercadopago-webhook/route.js

import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import mpClient, { verifyMercadoPagoSignature } from "@/lib/mercado-pago";
import { handleMercadoPagoPayment } from "@/server/mercado-pago/handle-payment";
import CreateOrder from "../../../../../actions/createOrder";
import { Product } from "@/lib/zustand/useOrder";

export async function POST(request: Request) {
  try {
    verifyMercadoPagoSignature(request);

    const body = await request.json();

    const { type, data } = body;

    switch (type) {
      case "payment":
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id: data.id });
        if (
          paymentData.status === "approved" || // Pagamento por cartão OU
          paymentData.date_approved !== null // Pagamento por Pix
        ) {

          const rawItems = paymentData.metadata.items;
          const number = paymentData.metadata.number;
          const orders = rawItems.map((item: any) => ({
            title: item.title,
            subtitle: item.subtitle,
            qtd: item.qtd,
            price: item.price,
            priceInCents: item?.price_in_cents,
            final_price: item.final_price,
          }));
          const OnlyNumber = number?.replace(/[ \-\(\)]/g, "")

          const priceInCents = orders?.map((i: any) => {
            return i?.priceInCents * i.qtd
          })
          const priceReduce = priceInCents.reduce((acumulador: any, numero: any) => acumulador + numero, 0);
          await CreateOrder(orders, OnlyNumber, priceReduce)
          // await handleMercadoPagoPayment(paymentData);
        }
        break;
      // case "subscription_preapproval": Eventos de assinatura
      //   console.log("Subscription preapproval event");
      //   console.log(data);
      //   break;
      default:
        console.log("Unhandled event type:", type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
