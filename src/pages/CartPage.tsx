import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
  Truck,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart, ShippingAddress } from '../context/CartContext';
import { PLUSH_COLOURS } from '../data/colours';

interface CartPageProps {
  navigate: (route: string) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Chandigarh',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry'
];

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    gstAmount,
    deliveryFee,
    giftWrapTotal,
    discountAmount,
    total,
    couponCode,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    appliedCouponError,
    amountNeededForFreeDelivery,
    placeOrder
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    streetAddress: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!/^\d{10}$/.test(formData.phone.trim())) errors.phone = 'Please enter a valid 10-digit Indian phone number';
    if (!formData.streetAddress.trim()) errors.streetAddress = 'Please enter complete house/street address';
    if (!formData.city.trim()) errors.city = 'Please enter city';
    if (!/^\d{6}$/.test(formData.pincode.trim())) errors.pincode = 'Please enter a valid 6-digit PIN code';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmittingOrder(true);

    setTimeout(() => {
      let methodLabel = 'UPI (Instant)';
      if (paymentMethod === 'card') methodLabel = 'Debit/Credit Card (RuPay/Visa)';
      if (paymentMethod === 'netbanking') methodLabel = 'Net Banking';
      if (paymentMethod === 'cod') methodLabel = 'Cash on Delivery';

      const order = placeOrder(formData, methodLabel);
      setConfirmedOrder(order);
      setIsSubmittingOrder(false);

      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }, 1200);
  };

  // 1. Order Confirmed View
  if (confirmedOrder) {
    return (
      <div className="min-h-screen py-12 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Payment & Order Confirmed!
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Your FluffyPal is on its Way!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Order ID:{' '}
                <span className="font-mono font-bold text-pink-400 text-base">{confirmedOrder.orderId}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Estimated Delivery:</span>
                <span className="font-bold text-white">{confirmedOrder.estimatedDeliveryDate}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Deliver to:</span>
                <span className="font-medium text-white">
                  {confirmedOrder.shippingAddress.fullName}, {confirmedOrder.shippingAddress.city} (
                  {confirmedOrder.shippingAddress.pincode})
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Amount:</span>
                <span className="font-bold text-pink-400">₹{confirmedOrder.total}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Payment Mode:</span>
                <span className="text-slate-400">{confirmedOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate(`#/track?id=${confirmedOrder.orderId}`)}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/25 transition-all"
              >
                Track Live Order
              </button>

              <button
                onClick={() => navigate('#/shop')}
                className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-sm transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 rounded-3xl bg-slate-900/30 border border-white/[0.06] space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto text-3xl">
            🧸
          </div>
          <h2 className="text-2xl font-bold text-white">Your Bag is Empty</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Looks like you haven't picked a soft companion yet! Explore our 16 vibrant colours and find your child's favorite plush pal.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('#/shop')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Cart & Checkout Form View
  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-8">
          {isCheckingOut ? 'Checkout & Shipping' : 'Shopping Bag'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items OR Shipping Form */}
          <div className="lg:col-span-7 space-y-6">
            {!isCheckingOut ? (
              // Items List
              <div className="space-y-4">
                {amountNeededForFreeDelivery > 0 ? (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>
                        Add ₹{amountNeededForFreeDelivery} more to get <strong>FREE Express Delivery</strong>!
                      </span>
                    </span>
                    <button
                      onClick={() => navigate('#/shop')}
                      className="font-bold underline text-amber-300 hover:text-white"
                    >
                      Add items
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Congratulations! You have unlocked <strong>FREE Express Delivery</strong>.</span>
                  </div>
                )}

                <div className="rounded-3xl bg-slate-900/40 border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
                  {cart.map(item => {
                    const colour = PLUSH_COLOURS.find(c => c.id === item.colourId) || PLUSH_COLOURS[0];

                    return (
                      <div key={item.id} className="p-4 sm:p-5 flex items-start gap-4">
                        {/* Colour swatch circle representation */}
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-white/20 shrink-0 flex items-center justify-center shadow-inner relative overflow-hidden"
                          style={{ backgroundColor: colour.baseColor }}
                        >
                          <span
                            className="w-8 h-8 rounded-full border border-white/40 shadow-md"
                            style={{ backgroundColor: colour.tipColor }}
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                                {item.productName}
                              </h3>
                              <div className="text-xs text-pink-400 font-medium">
                                {colour.name} · {item.size}
                              </div>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Gift Wrap Notice */}
                          {item.giftWrap && (
                            <div className="mt-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded inline-block border border-amber-500/20">
                              🎁 Festive Gift Wrapped (+₹49)
                              {item.giftMessage && <span className="text-slate-400"> · "{item.giftMessage}"</span>}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3 pt-2">
                            {/* Quantity Stepper */}
                            <div className="flex items-center bg-slate-950/80 border border-white/10 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-slate-400 hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-slate-400 hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="text-sm sm:text-base font-bold text-white">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-pink-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Proceed to Shipping & Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Checkout Shipping & Address Form
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Item List</span>
                </button>

                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
                  <h3 className="text-base font-bold text-white">Shipping Address</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Parent Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                      />
                      {formErrors.fullName && <p className="text-[11px] text-rose-400 mt-1">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Mobile Number (+91) *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                      />
                      {formErrors.phone && <p className="text-[11px] text-rose-400 mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Flat / House No. & Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 402 Sunshine Apts, 5th Cross Road"
                      value={formData.streetAddress}
                      onChange={e => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                    {formErrors.streetAddress && (
                      <p className="text-[11px] text-rose-400 mt-1">{formErrors.streetAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="6-digit PIN"
                        value={formData.pincode}
                        onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                      />
                      {formErrors.pincode && <p className="text-[11px] text-rose-400 mt-1">{formErrors.pincode}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bengaluru"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                      />
                      {formErrors.city && <p className="text-[11px] text-rose-400 mt-1">{formErrors.city}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                      >
                        {INDIAN_STATES.map(s => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
                  <h3 className="text-base font-bold text-white">Payment Method (Simulation Demo)</h3>

                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI / QR (Google Pay, PhonePe, Paytm, BHIM)', tag: 'Recommended' },
                      { id: 'card', label: 'Debit / Credit Card (Visa, MasterCard, RuPay)' },
                      { id: 'netbanking', label: 'Net Banking (All Major Indian Banks)' },
                      { id: 'cod', label: 'Cash on Delivery (Pay at Doorstep)' }
                    ].map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'bg-pink-600/15 border-pink-500/50 text-white'
                            : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id as any)}
                            className="accent-pink-500"
                          />
                          <span className="text-xs font-medium">{method.label}</span>
                        </div>
                        {method.tag && (
                          <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-semibold">
                            {method.tag}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-pink-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmittingOrder ? (
                    <span>Confirming Safe Order...</span>
                  ) : (
                    <span>Place Order · Total ₹{total}</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-5">
              <h3 className="text-base font-bold text-white">Price Summary</h3>

              {/* Coupon Box */}
              <div className="space-y-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. FLUFFY10)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {couponCode && (
                  <div className="flex items-center justify-between text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{couponCode} applied ({couponDiscountPercent}% off)</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-white underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {appliedCouponError && (
                  <p className="text-[11px] text-rose-400">{appliedCouponError}</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-white/[0.06]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                {giftWrapTotal > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Festive Gift Wrap</span>
                    <span>₹{giftWrapTotal}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (12% Toys Tax)</span>
                  <span className="text-white">₹{gstAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex justify-between items-baseline text-base font-extrabold text-white">
                  <span>Grand Total</span>
                  <span className="text-xl text-pink-400">₹{total}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <p>✓ All prices inclusive of 12% GST</p>
                <p>✓ Free returns within 7 days of delivery</p>
                <p>✓ Safe sanitized packaging compliant with child safety</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
