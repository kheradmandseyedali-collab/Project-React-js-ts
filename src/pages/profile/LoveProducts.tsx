// import { useState } from "react";
// import { Heart , Trash2 } from "lucide-react";

// type Product = {
//   id : number;
//   title : string;
//   price : number;
//   image ?: string;
//   thumbnail ?: string;
//   description ?: string;
// }

// type FavoritesTabProps = {
//   products: Product[];
// }

// export const LoveProducts  : React.FC<FavoritesTabProps> = ({ products }) => {

//   const [favorites , setFavorites] = useState<number[]>([]);

//   const isFavorite = (id: number): boolean => {
//     return favorites.includes(id);
//   };

//   const toggleFavorite = (id: number): void => {
//     if (isFavorite(id)) {
//       setFavorites(favorites.filter((favId) => favId !== id));
//     } else {
//       setFavorites([...favorites, id]);
//     }
//   };

// console.log("نوع و محتوای products : ", typeof products , products);


//   const favoriteProducts = products?.filter((p) => favorites.includes(p.id)) || [];

//   // const favoriteProducts = Array.isArray(products)
//   // ? products.filter((p) => favorites?.includes(p?.id))
//   // : [];


//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
//         <div className="flex items-center gap-2">
//           <Heart className="text-rose-500 fill-rose-500" size={24} />
//           <h3 className="text-lg font-bold text-slate-100">لیست علاقه‌مندی‌های من</h3>
//         </div>
//         <span className="text-xs bg-slate-800 text-rose-300 px-3 py-1.5 rounded-xl border border-slate-700">
//           {favoriteProducts.length} محصول
//         </span>
//       </div>
//       {favoriteProducts.length === 0 ? (
//         <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/40">
//           <Heart className="mx-auto text-slate-600 mb-3" size={48} />
//           <p className="text-slate-300 font-medium">لیست علاقه‌مندی‌های شما خالی است!</p>
//           <p className="text-slate-500 text-xs mt-1">
//             با کلیک روی آیکون قلب در کنار محصولات، آن‌ها را به این لیست اضافه کنید.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {favoriteProducts.map((product) => (
//             <div
//               key={product.id}
//               className="group bg-slate-900/80 rounded-2xl border border-slate-700/60 overflow-hidden flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-md"
//             >
//               {/* تصویر و دکمه حذف سریع */}
//               <div className="relative w-full h-44 bg-slate-950/50 p-4 flex items-center justify-center">
//                 <img
//                   src={product.thumbnail || product.image}
//                   alt={product.title}
//                   className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
//                 />
//                 <button
//                   onClick={() => toggleFavorite(product.id)}
//                   title="حذف از لیست"
//                   className="absolute top-3 right-3 p-2 bg-slate-800/80 hover:bg-rose-900/40 text-rose-400 rounded-xl transition-colors"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>

//               {/* متن و مشخصات */}
//               <div className="p-4 flex flex-col gap-3">
//                 <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">
//                   {product.title}
//                 </h4>
//                 <div className="flex items-center justify-between pt-2 border-t border-slate-800">
//                   <span className="text-xs text-slate-400">قیمت:</span>
//                   <span className="text-sm font-bold text-emerald-400">
//                     ${product.price.toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoveProducts ;


























import React from "react";
import { Heart, Trash2 } from "lucide-react";
import { useFavoriteStore } from "../../stores/favorite.store";

export const LoveProducts: React.FC = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500 fill-rose-500" size={24} />
          <h3 className="text-lg font-bold text-slate-100">لیست علاقه‌مندی‌های من</h3>
        </div>
        <span className="text-xs bg-slate-800 text-rose-300 px-3 py-1.5 rounded-xl border border-slate-700">
          {favorites.length} محصول
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-700/40">
          <Heart className="mx-auto text-slate-600 mb-3 stroke-[1.5]" size={48} />
          <p className="text-slate-300 font-medium">لیست علاقه‌مندی‌های شما خالی است!</p>
          <p className="text-slate-500 text-xs mt-1">
            با کلیک روی آیکون قلب در محصولات، آن‌ها را به این بخش اضافه کنید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-900/80 rounded-2xl border border-slate-700/60 overflow-hidden flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-md"
            >
              <div className="relative w-full h-44 bg-slate-950/50 p-4 flex items-center justify-center">
                <img
                  src={product.thumbnail || product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  title="حذف از لیست"
                  className="absolute top-3 right-3 p-2 bg-slate-800/80 hover:bg-rose-900/50 text-rose-400 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 size={19} />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400">قیمت:</span>
                  <span className="text-sm font-bold text-emerald-400">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoveProducts ;