import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/lib/mercado-pago";

export async function POST(req: NextRequest) {
  const { testeId, userEmail, items, number, name, paymentForm } = await req.json();

  try {

    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          testeId, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
          userEmail: userEmail,
          items: items,
          number: number,
          name: name,
          paymentForm: paymentForm
        },

        items: (items as any).map((product: any) => ({
          title: product.title,
          description: product.subtitle ?? "Sem descrição",
          quantity: product.qtd,
          unit_price: product.priceInCents / 100,
          currency_id: "BRL",
          category_id: "category",
        })),
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          excluded_payment_methods: [
            // {
            //   id: "bolbradesco",
            // },
            // {
            //   id: "ticket",
            // },
          ],
          //   excluded_payment_types: [
          //     {
          //       id: "debit_card",
          //     },
          //     {
          //       id: "credit_card",
          //     },
          //   ],
          installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/accompany?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
