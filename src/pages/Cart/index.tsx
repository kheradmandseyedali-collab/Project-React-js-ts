import React from "react";
import { useCartStore } from "../../stores/useCartStore";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Button from "../../components/desing_system/button";

const Card: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 p-4" dir="rtl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-6">
            جزئیات سبد خرید
          </h1>

          <span className="mb-3">
            <Link to="/app/shop">
              <Button
                className="flex justify-center items-center gap-1"
                color="gray"
                icon={<ShoppingCart size={23} />}
                size="xl"
                type="button"
                text="shop"
              />
            </Link>
          </span>
        </div>
        {cartItems.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg bg-white rounded-2xl border border-gray-100 shadow-sm">
            سبد خرید شما خالی است.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {/* map */}
              {cartItems.map(({ product : p , quantity }) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-5 items-center justify-between"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-24 h-24 object-contain rounded-xl bg-gray-50 shrink-0"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 max-w-md">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                    <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
                      <Button
                        color="green_2"
                        icon={<Plus size={20} />}
                        onClick={() => increaseQuantity(p.id)}
                        size="xxl"
                        type="button"
                        className="flex justify-center items-center"
                      />

                      <span className="w-8 text-black text-center font-bold text-sm">
                        {quantity}
                      </span>
                      <Button
                        color="red_2"
                        icon={<Minus size={20} />}
                        className="flex justify-center items-center"
                        onClick={() => decreaseQuantity(p.id)}
                        type="button"
                        size="xxl"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 mb-3">
                        واحد: {p.price.toLocaleString()} دلار
                      </div>
                      <div className="font-bold text-blue-600 text-base w-30">
                        جمع: {(p.price * quantity).toFixed(2)} دلار
                      </div>
                    </div>
                    <Button
                      className="flex justify-center items-center"
                      color="red_2"
                      size="xxl"
                      icon={<Trash2 size={20} />}
                      onClick={() => removeFromCart(p.id)}
                      type="button"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex justify-center items-center font-bold">
              <Button
                color="red"
                size="lg"
                onClick={clearCart}
                type="button"
                text="خالی کردن سبد خرید"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
