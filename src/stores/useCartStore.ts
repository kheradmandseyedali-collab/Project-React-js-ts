import { create } from 'zustand';
import type { Product , CartItem } from '../types/general';

type CartState = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId : number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product: Product) => {
    set((state) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (cartIndex > -1) {
        const updated = [...state.cartItems];
        updated[cartIndex].quantity += 1;
        return { cartItems: updated };
      }

      return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    }));
  },

  increaseQuantity: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },

  decreaseQuantity: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  clearCart: () => set({ cartItems: [] }),

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
})) ;