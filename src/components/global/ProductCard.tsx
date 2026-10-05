import React from "react";
import { useCartStore } from "../../stores/useCartStore";
import type { Product } from "../../types/general";
import Button from "../desing_system/button";
import { Minus , Plus , Trash2 } from "lucide-react"; 

type ProductCardProps = {
  product : Product | any ;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0

  const handelShop = () => {
  if (product && product.id !== undefined) {
    addToCart(product as any);
  }
};

  const handelPlus = () => {

    increaseQuantity(product.id)

  }

  const handelMinus = () => {

    decreaseQuantity(product.id)
    
  }

  const handelTrash = () => {
    removeFromCart(product.id)

  }
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-contain rounded-xl bg-gray-50 mb-3"
        />
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
          {product.category}
        </span>
        <h3 className="font-bold text-gray-800 mt-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">{product.price} دلار</span>
        </div>
        <div>
          {quantity === 0 ? (
          <Button
            color="blue_2"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition flex justify-center items-center gap-2"
            type="button"
            onClick={handelShop}
            size="xxl"
            text="افزودن به سبد خرید"
          />
        ) : (
          <div className="flex items-center justify-center rounded-xl p-1 bg-blue-50/40 gap-x-3">
            <Button
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center cursor-pointer"
              color="green"
              icon={<Plus size={18} />}
              size="md"
              type="button"
              onClick={handelPlus}
            />

            <span className="font-bold text-blue-800 text-base px-2 border border-blue-700 w-20 flex justify-center items-center">
              {quantity}
            </span>
            {quantity === 1 ? (
              <Button
                onClick={handelTrash}
                type="button"
                icon={<Trash2 size={18} />}
                color="red"
                size="md"
              />
            ) : (
              <Button
                onClick={handelMinus}
                type="button"
                icon={<Minus size={18} />}
                size="md"
              />
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard ;