import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/global/ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const fetchProducts = async () : Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products?limit=20");
  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات از سرور");
  }
  const data = await response.json();
  return data.products;
};

const Shop: React.FC = () => {
  const { data: products, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl font-bold">
        در حال دریافت محصولات...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        خطا: {(error as Error).message} (لطفاً اتصال اینترنت/فیلترشکن را بررسی کنید)
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        محصولی برای نمایش یافت نشد.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dir-rtl" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6">محصولات فروشگاه</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    </div>
  );
};

export default Shop ;