import { create } from "zustand";

export type FavoriteProduct = {
  id : number;
  title : string;
  price : number;
  image ?: string;
  thumbnail ?: string;
  description ?: string;
}

type FavoriteState = {
  favorites: FavoriteProduct[];
  toggleFavorite: (product: FavoriteProduct) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  toggleFavorite: (product) => {
    const { favorites } = get();
    const exists = favorites.some((p) => p.id === product.id);

    if (exists) {
      set({ favorites: favorites.filter((p) => p.id !== product.id) });
    } else {
      set({ favorites: [...favorites, product] });
    }
  },
  isFavorite: (productId) => {
    return get().favorites.some((p) => p.id === productId);
  },
}));
