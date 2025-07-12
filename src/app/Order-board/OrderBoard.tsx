'use client';

import { formatToBrl } from '@/lib/formatToBrl';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/ui/button/button';
import UpdateOrder from '@/services/updateOrder';
import { Modal } from '../components/ui/modal';
import { useModal } from '@/lib/zustand/useModal';
import { Clock, Package, CheckCircle, XCircle, User, Phone, CreditCard, ShoppingBag, ArrowRight, Hamburger, MenuIcon } from 'lucide-react';
import { useTriggerLoading } from '@/context/triggerLoading';

type OrderStatus = 'NEW' | 'PENDING' | 'FINISHED' | 'CANCELLED';

interface Order {
  id: number;
  total: number;
  user: {
    name: string;
    number: string;
  };
  items: {
    title: string
    qtd: number
    priceInCents: number
  }[]
  payment_form: string
  status: OrderStatus;
}

export default function OrderBoard({ getOrders }: { getOrders: { orders: Order[] } | undefined }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersToModal, setOrdersToModal] = useState<Order>();
  const { isClosed, setIsClosed } = useModal()
  const { setLoading } = useTriggerLoading()

  useEffect(() => {
    if (!getOrders?.orders) return
    setOrders(getOrders?.orders);
  }, [getOrders]);

  const statusConfig = {
    NEW: {
      label: 'Novos Pedidos',
      icon: Clock,
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      cardBg: 'bg-blue-50',
      cardBorder: 'border-blue-200',
      iconColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      badgeBg: 'bg-blue-100 text-blue-800'
    },
    PENDING: {
      label: 'Em Produção',
      icon: Package,
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      cardBg: 'bg-orange-50',
      cardBorder: 'border-orange-200',
      iconColor: 'text-orange-600',
      buttonBg: 'bg-orange-600 hover:bg-orange-700',
      badgeBg: 'bg-orange-100 text-orange-800'
    },
    FINISHED: {
      label: 'Prontos para Entrega',
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      borderColor: 'border-green-200',
      cardBg: 'bg-green-50',
      cardBorder: 'border-green-200',
      iconColor: 'text-green-600',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      badgeBg: 'bg-green-100 text-green-800'
    },
    CANCELLED: {
      label: 'Cancelados',
      icon: XCircle,
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      cardBg: 'bg-gray-50',
      cardBorder: 'border-gray-200',
      iconColor: 'text-gray-600',
      buttonBg: 'bg-gray-600 hover:bg-gray-700',
      badgeBg: 'bg-gray-100 text-gray-800'
    }
  };
  const divRef = useRef<(HTMLDivElement | null)[]>([]);
  const divContainerRef = useRef<(HTMLDivElement | null)[]>([]);
  function modalOpenIfIsNotButton() {
    const element = document.getElementById(`button-advance`)
    if (element?.classList.contains("button-advance")) return
    setIsClosed(!isClosed);
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel de Pedidos</h1>
            <p className="text-gray-600">Gerencie seus pedidos de forma eficiente</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {(['NEW', 'PENDING', 'FINISHED', 'CANCELLED'] as OrderStatus[]).map((status, indexStatus) => {
              const config = statusConfig[status];
              const StatusIcon = config.icon;
              const statusOrders = orders?.filter((order) => order.status === status) || [];
              return (
                <div key={status} className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${config.cardBg}`}>
                          <StatusIcon className={`w-6 h-6 ${config.iconColor}`} />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">{config.label}</h2>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.badgeBg}`}>
                            {statusOrders.length} pedido{statusOrders.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {statusOrders.map((order, index) => (
                        <div
                          key={order.id}
                          onClick={() => {
                            setOrdersToModal(order);

                          }}
                          className={`${config.cardBg} ${config.cardBorder} border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] group`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-gray-900">Pedido #{order.id}</span>
                            </div>
                            <div className='flex flex-col items-end'>
                              <div className="text-lg font-bold text-gray-900">
                                {formatToBrl(order.total)}
                              </div>
                              <MenuIcon onClick={() => modalOpenIfIsNotButton()} className='text-black w-10 h-10 text-4xl' />
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="truncate">{order.user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span>{order.user.number}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-gray-500" />
                              <span className="truncate">{order.payment_form}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ShoppingBag className="w-4 h-4 text-gray-500" />
                              <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          <div className='flex flex-col gap-3 Button-adjust-Status'>
                            {status !== 'FINISHED' && status !== 'CANCELLED' && (
                              <div
                                ref={(el) => { (divRef.current[index] = el) }}
                                className="mt-4 pt-3 cursor-pointer border-t border-gray-200">
                                <Button
                                  id={`button-advance-${index}`}
                                  onClick={() => {
                                    handleAdvance(order)
                                  }}
                                  className={`w-full ${config.buttonBg} cursor-pointer button-advance text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-md`}
                                >
                                  <span>{status === 'NEW' ? 'Aceitar Pedido' : 'Avançar Status'}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            {
                              status !== "FINISHED" && status !== "CANCELLED" && <>
                                <Button
                                  id={`button-advance-${index}`}
                                  onClick={() => {
                                    handleAdvance({ ...order, status: "CANCELLED" })
                                  }}
                                  className={`w-full cursor-pointer button-advance bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-md`}
                                >
                                  <span>{'Cancelar'}</span>
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </>
                            }
                          </div>

                        </div>
                      ))}

                      {statusOrders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <StatusIcon className={`w-12 h-12 mx-auto mb-3 ${config.iconColor} opacity-50`} />
                          <p className="text-sm">Nenhum pedido neste status</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal.Root>
        <Modal.Content>
          <Modal.Close onClose={() => setIsClosed(!isClosed)} />

          {ordersToModal && (
            <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pedido #{ordersToModal.id}</h2>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[ordersToModal.status].badgeBg}`}>
                    {statusConfig[ordersToModal.status].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-semibold text-gray-900">{ordersToModal.user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">WhatsApp</p>
                      <p className="font-semibold text-gray-900">{ordersToModal.user.number}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Pagamento</p>
                      <p className="font-semibold text-gray-900">{ordersToModal.payment_form}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">R$</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-green-600 text-lg">{formatToBrl(ordersToModal.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Itens do Pedido</span>
                </h3>
                <div className="space-y-3">
                  {ordersToModal.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">{item.qtd}</span>
                        </div>
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatToBrl(item.priceInCents * item.qtd)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Content>
      </Modal.Root>
    </>
  );

  async function handleAdvance(order: Order) {
    try {
      setLoading(true)
      const status = order.status === "NEW" ? "PENDING" : order.status === "PENDING" ? "FINISHED" : "CANCELLED"
      await UpdateOrder(order.id, status)
      await fetch('https://n8n-app-geli.fly.dev/webhook/d79a1391-4e64-4ff8-af61-f6edf2fe8084', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusOrder: status,
          number: order?.user?.number,
          name: order?.user?.name
        }),
      });
      setLoading(false)
    } catch (error) {
      setLoading(true)
      alert(error)
    }
  }
}