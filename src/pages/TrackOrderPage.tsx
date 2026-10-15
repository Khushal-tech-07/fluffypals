import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, AlertCircle } from 'lucide-react';
import { useCart, Order } from '../context/CartContext';

interface TrackOrderPageProps {
  initialOrderId?: string;
  navigate: (route: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ initialOrderId, navigate }) => {
  const { getOrderById, recentOrders } = useCart();
  const [orderQuery, setOrderQuery] = useState(initialOrderId || (recentOrders[0]?.orderId ?? 'FP-IN-78491'));
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>(() => getOrderById(orderQuery));
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      setOrderQuery(initialOrderId);
      setCurrentOrder(getOrderById(initialOrderId));
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = getOrderById(orderQuery);
    setCurrentOrder(found);
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Track Your FluffyPal</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Enter your Order ID (e.g.{' '}
            <button
              onClick={() => {
                setOrderQuery('FP-IN-78491');
                setCurrentOrder(getOrderById('FP-IN-78491'));
              }}
              className="font-mono text-pink-400 underline font-semibold"
            >
              FP-IN-78491
            </button>
            ) to view real-time delivery status across India.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mt-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter Order ID..."
              value={orderQuery}
              onChange={e => setOrderQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/60 border border-white/10 text-xs font-mono uppercase text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 shadow-md"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Track
            </button>
          </form>
        </div>

        {/* Order Details / Timeline */}
        {currentOrder ? (
          <div className="space-y-6">
            {/* Status Summary Card */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Tracking Number: <span className="text-white font-mono">{currentOrder.trackingNumber}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Status:{' '}
                  <span className="text-pink-400">{currentOrder.status}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Placed on {currentOrder.createdAt} · Courier Partner: BlueDart Express Air
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400">Expected Delivery</div>
                <div className="text-lg font-bold text-emerald-400">
                  {currentOrder.estimatedDeliveryDate}
                </div>
              </div>
            </div>

            {/* Visual Tracking Stepper */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-6">
              <h3 className="text-base font-bold text-white">Delivery Timeline</h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                {currentOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Stepper Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                        step.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                          : step.current
                          ? 'bg-pink-500 border-white text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-600'
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4
                          className={`text-sm font-bold ${
                            step.completed || step.current ? 'text-white' : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Address & Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="p-5 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Destination Address</span>
                </div>
                <div className="text-xs text-slate-300 space-y-0.5 leading-relaxed pt-1">
                  <p className="font-bold text-white">{currentOrder.shippingAddress.fullName}</p>
                  <p>{currentOrder.shippingAddress.streetAddress}</p>
                  {currentOrder.shippingAddress.landmark && <p>Near: {currentOrder.shippingAddress.landmark}</p>}
                  <p>
                    {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} -{' '}
                    {currentOrder.shippingAddress.pincode}
                  </p>
                  <p className="text-slate-400">Phone: +91 {currentOrder.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Package Summary */}
              <div className="p-5 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Package className="w-4 h-4 text-purple-400" />
                  <span>Package Content</span>
                </div>
                <div className="divide-y divide-white/[0.06] pt-1">
                  {currentOrder.items.map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{item.productName}</div>
                        <div className="text-[11px] text-pink-400">
                          {item.size} · Qty: {item.quantity}
                        </div>
                      </div>
                      <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center rounded-3xl bg-slate-900/30 border border-white/[0.06] space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Order Not Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find an order with ID "{orderQuery}". Please check your order confirmation SMS or email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
