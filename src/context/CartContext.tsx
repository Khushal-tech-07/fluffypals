import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PlushSize, SIZE_PRICES, PRODUCTS } from '../data/products';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  colourId: string;
  size: PlushSize;
  price: number;
  originalPrice: number;
  quantity: number;
  giftWrap: boolean;
  giftMessage?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  estimatedDeliveryDate: string;
  status: 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  deliveryFee: number;
  discount: number;
  giftWrapFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber: string;
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  couponCode: string;
  couponDiscountPercent: number;
  appliedCouponError: string;
  addToCart: (product: Product, size: PlushSize, quantity?: number, giftWrap?: boolean, giftMessage?: string, customColourId?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  gstAmount: number;
  deliveryFee: number;
  giftWrapTotal: number;
  discountAmount: number;
  total: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  totalItemsCount: number;
  recentOrders: Order[];
  placeOrder: (address: ShippingAddress, paymentMethod: string) => Order;
  getOrderById: (orderId: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = 'fluffypals_cart_v1';
const WISHLIST_STORAGE_KEY = 'fluffypals_wishlist_v1';
const ORDERS_STORAGE_KEY = 'fluffypals_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);

      // Default mock initial order for demonstration so tracking works right away if tested
      const defaultOrder: Order = {
        orderId: 'FP-IN-78491',
        createdAt: '14 Oct 2026, 04:30 PM',
        estimatedDeliveryDate: '18 Oct 2026',
        status: 'Shipped',
        items: [
          {
            id: 'demo-1',
            productId: 'fp-lavender-original',
            productName: 'Mochi the Lavender Dream',
            colourId: 'lavender-purple',
            size: 'Medium 25 cm',
            price: 899,
            originalPrice: 1299,
            quantity: 1,
            giftWrap: true,
            giftMessage: 'Happy 4th Birthday Kabir! Lots of love from Maasi & Fufa ji ❤️'
          }
        ],
        subtotal: 899,
        gstAmount: 108,
        deliveryFee: 0,
        discount: 90,
        giftWrapFee: 49,
        total: 966,
        shippingAddress: {
          fullName: 'Priya Sharma',
          phone: '9876543210',
          streetAddress: 'Flat 402, Sunshine Heights, Indiranagar',
          landmark: 'Near 100ft Road Metro',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038'
        },
        paymentMethod: 'UPI (Google Pay)',
        trackingNumber: 'BLUEDART-IND-9928174',
        timeline: [
          { title: 'Order Placed', description: 'Order confirmed & paid via UPI', timestamp: '14 Oct, 04:30 PM', completed: true },
          { title: 'Quality Inspection & Sanitization', description: 'Double-checked seam strength & sanitized with baby-safe UV box', timestamp: '14 Oct, 06:15 PM', completed: true },
          { title: 'Shipped via BlueDart Air', description: 'Dispatched from Bengaluru fulfillment center', timestamp: '15 Oct, 09:40 AM', completed: true, current: true },
          { title: 'Out for Delivery', description: 'Delivery executive assigned', timestamp: 'Pending', completed: false },
          { title: 'Delivered', description: 'Direct handoff at your doorstep', timestamp: 'Est. 18 Oct', completed: false }
        ]
      };
      return [defaultOrder];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [appliedCouponError, setAppliedCouponError] = useState<string>('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Unable to persist wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch (e) {
      console.warn('Unable to persist orders to localStorage', e);
    }
  }, [recentOrders]);

  const addToCart = (
    product: Product,
    size: PlushSize,
    quantity = 1,
    giftWrap = false,
    giftMessage = '',
    customColourId?: string
  ) => {
    const finalColourId = customColourId || product.colourId;
    const priceDetails = SIZE_PRICES[size] || { price: product.price, originalPrice: product.originalPrice };
    const cartItemId = `${product.id}-${finalColourId}-${size}-${giftWrap ? 'gift' : 'std'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          productName: product.name,
          colourId: finalColourId,
          size,
          price: priceDetails.price,
          originalPrice: priceDetails.originalPrice,
          quantity,
          giftWrap,
          giftMessage
        }
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    setAppliedCouponError('');
    if (clean === 'FLUFFY10') {
      setCouponCode(clean);
      setCouponDiscountPercent(10);
      return true;
    } else if (clean === 'DIWALI20' || clean === 'RAKHI20') {
      setCouponCode(clean);
      setCouponDiscountPercent(20);
      return true;
    } else {
      setAppliedCouponError('Invalid coupon code. Try FLUFFY10 or DIWALI20');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    setAppliedCouponError('');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const giftWrapTotal = cart.reduce((acc, item) => (item.giftWrap ? acc + 49 * item.quantity : acc), 0);
  const freeDeliveryThreshold = 999;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 99;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  // 12% GST standard for toys/plush in India
  const gstAmount = Math.round(taxableAmount * 0.12);
  const total = taxableAmount + gstAmount + deliveryFee + giftWrapTotal;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = (address: ShippingAddress, paymentMethod: string): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `FP-IN-${randomSuffix}`;
    const dateNow = new Date();
    const estDate = new Date();
    estDate.setDate(dateNow.getDate() + 4);

    const formattedCreatedAt = `${dateNow.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}, ${dateNow.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
    const formattedEstDelivery = estDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder: Order = {
      orderId,
      createdAt: formattedCreatedAt,
      estimatedDeliveryDate: formattedEstDelivery,
      status: 'Placed',
      items: [...cart],
      subtotal,
      gstAmount,
      deliveryFee,
      discount: discountAmount,
      giftWrapFee: giftWrapTotal,
      total,
      shippingAddress: address,
      paymentMethod,
      trackingNumber: `BD-IN-${Math.floor(1000000 + Math.random() * 9000000)}`,
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          description: `Paid via ${paymentMethod}. Order received by Mumbai fulfillment hub.`,
          timestamp: formattedCreatedAt,
          completed: true,
          current: true
        },
        {
          title: 'Sanitization & Packaging',
          description: 'Hygienic lint-free wrapping & baby-safe sealing box',
          timestamp: 'Scheduled today',
          completed: false
        },
        {
          title: 'Dispatched with Express Courier',
          description: 'Handed over to BlueDart / Delhivery Surface Express',
          timestamp: 'Within 24 hours',
          completed: false
        },
        {
          title: 'Out for Delivery',
          description: `Direct delivery to ${address.city}, ${address.state}`,
          timestamp: `Expected ${formattedEstDelivery}`,
          completed: false
        },
        {
          title: 'Delivered',
          description: 'Package delivered with OTP verification',
          timestamp: `Expected by ${formattedEstDelivery}`,
          completed: false
        }
      ]
    };

    setRecentOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return recentOrders.find(o => o.orderId.trim().toUpperCase() === orderId.trim().toUpperCase());
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        couponCode,
        couponDiscountPercent,
        appliedCouponError,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        subtotal,
        gstAmount,
        deliveryFee,
        giftWrapTotal,
        discountAmount,
        total,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        totalItemsCount,
        recentOrders,
        placeOrder,
        getOrderById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
