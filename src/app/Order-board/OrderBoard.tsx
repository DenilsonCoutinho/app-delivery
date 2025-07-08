// components/OrderBoard.tsx
'use client';

import { formatToBrl } from '@/lib/formatToBrl';
import GetOrderByUser from '@/services/getOrderByUser';
import { useEffect, useState } from 'react';
import Button from '../components/ui/button/button';
import UpdateOrder from '@/services/updateOrder';

type OrderStatus = 'NEW' | 'PENDING' | 'FINISHED' | 'CANCELLED';

interface Order {
  id: number;
  total: number;
  user: {
    name: string;
    number: string;
  };
  payment_form: string
  status: OrderStatus;
}

export default function OrderBoard({ getOrders }: { getOrders: { orders: Order[] } | undefined }) {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    // async function fetchOrders() {
    // const res = await GetOrderByUser() // você cria essa rota
    // console.log(res)
    if (!getOrders?.orders) return
    setOrders(getOrders?.orders);
    // }

    // fetchOrders();
  }, [getOrders]);

  const statusMap = {
    NEW: 'Em análise',
    PENDING: 'Em produção',
    FINISHED: 'Pronto para entrega',
    CANCELLED: 'Cancelado'
  };

  const colors = {
    NEW: 'bg-red-300',
    PENDING: 'bg-orange-500',
    FINISHED: 'bg-green-100',
    CANCELLED: 'bg-gray-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {(['NEW', 'PENDING', 'FINISHED', 'CANCELLED'] as OrderStatus[]).map((status) => (
        <div key={status} className="rounded shadow p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">{statusMap[status]}</h2>
          <div className="space-y-2">
            {orders?.filter((order) => order.status === status)
              ?.map((order) => (
                <div key={order.id} className={`rounded p-4 ${colors[status]} shadow`}>
                  <p className="text-sm font-bold">Pedido #{order.id}</p>
                  <p>Cliente: {order.user.name}</p>
                  <p>WhatsApp: {order.user.number}</p>
                  <p>Total: {formatToBrl(order.total)}</p>
                  <p>Forma de pagamento: {order.payment_form}</p>

                  {status !== 'FINISHED' && (
                    <Button
                      onClick={() => handleAdvance(order)}
                      className="mt-2 cursor-pointer bg-green-500 text-white px-3 py-1 rounded"
                    >
                      {status === 'NEW' ? 'Aceitar pedido' : 'Avançar pedido'}
                    </Button>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  async function handleAdvance(order: Order) {
    try {
      const status = order.status === "NEW" ? "PENDING" : order.status === "PENDING" ? "FINISHED" : "CANCELLED"
      await UpdateOrder(order.id, status)
      await fetch('https://n8n-app-geli.fly.dev/webhook/d79a1391-4e64-4ff8-af61-f6edf2fe8084', {
        method: 'POST', // ou 'GET' dependendo de como você configurou o webhook
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusOrder: status,
          number: order?.user?.number,
          name: order?.user?.name
        }),
      });
    } catch (error) {
      alert(error)
    }

  }
}
