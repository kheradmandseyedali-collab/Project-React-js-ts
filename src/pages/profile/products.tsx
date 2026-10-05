import { Heart, Package2 } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { useProfileStore } from "../../stores/sidebarProfile.store";
import { useFavoriteStore } from "../../stores/favorite.store";
import { toast } from "react-toastify";

const ShowProducts = () => {
  const { cartItems } = useCartStore();
  const activeTab = useProfileStore((state) => state.activeTab);

  // ۱. گرفتن خود آرایه favorites تا با هر تغییر، کامپوننت بلافاصله دوباره رندر بشه
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  // ۲. بررسی سریع اینکه آیا این محصول در لیست هست یا نه
  const checkIsFavorite = (productId: number) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const handleLove = (product: any) => {
    const isCurrentlyLoved = checkIsFavorite(product.id);
    
    // تغییر وضعیت در استور
    toggleFavorite(product);

    if (isCurrentlyLoved) {
      toast.info(`«${product.title}» از علاقه‌مندی‌ها حذف شد`);
    } else {
      toast.success(`«${product.title}» به علاقه‌مندی‌ها اضافه شد`);
    }
  };

  return (
    <>
      {activeTab === "orders" && (
        <section className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-700/50 shadow-xl">
          {/* هدر بخش گالری */}
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
                <Package2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  گالری سفارش‌های من
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  محصولاتی که در سبد خرید یا سفارش‌ها دارید
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900/80 text-indigo-300 border border-slate-700">
              تعداد آیتم‌ها: {cartItems.length}
            </span>
          </div>

          {/* حالت سبد خالی */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3 text-slate-400">
              <Package2 size={56} className="text-slate-600 stroke-[1.5]" />
              <p className="text-base">
                سبد خرید و لیست سفارش‌های شما در حال حاضر خالی است.
              </p>
            </div>
          ) : (
            /* شبکه کارت‌ها */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map(({ product: p, quantity }) => {
                // بررسی وضعیت برای هر کارت
                const isLoved = checkIsFavorite(p.id);

                return (
                  <div
                    key={p.id}
                    className="group bg-slate-900/80 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 shadow-md hover:shadow-indigo-500/10 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative w-full h-48 bg-slate-950/60 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-indigo-700/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                        {quantity} عدد
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLove(p)}
                        className={`absolute top-3 right-3 backdrop-blur-md p-2.5 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
                          isLoved
                            ? "bg-rose-500/20 border border-rose-500/40 shadow-lg shadow-rose-500/20"
                            : "bg-slate-800/80 hover:bg-slate-700 border border-slate-600/50"
                        }`}
                        title={isLoved ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                      >
                        <Heart
                          size={22}
                          className={`transition-colors duration-200 ${
                            isLoved
                              ? "fill-rose-500 text-rose-500"
                              : "text-slate-300 hover:text-white"
                          }`}
                        />
                      </button>
                    </div>

                    {/* جزئیات کارت */}
                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm md:text-base line-clamp-1 group-hover:text-indigo-300 transition-colors">
                          {p.title}
                        </h4>
                        {p.description && (
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                        )}
                      </div>
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-sm text-slate-400">قیمت کل:</span>
                        <span className="text-base font-extrabold text-emerald-400">
                          ${(p.price * quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ShowProducts ;