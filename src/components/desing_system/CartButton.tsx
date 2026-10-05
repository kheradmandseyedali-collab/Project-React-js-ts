import React from 'react';
import { useCartStore } from '../../stores/useCartStore';

type CartButtonProps = {
  onClick?: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.length ;

  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center gap-3 bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-5 py-2.5 rounded-2xl font-semibold shadow-md transition-all active:scale-95 select-none"
    >
      <span className="text-lg tracking-wider font-bold">CARD</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-black fill-none stroke-current stroke-2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-3 -right-3 bg-red-600 border-2 border-black text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md overflow-hidden">
          <span className="bg-[#2c3e91] px-1 h-full flex items-center justify-center">
            {cartCount}
          </span>
        </span>
      )}
    </button>
  );
};

export default CartButton ;