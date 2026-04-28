import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface Toast {
  id: string;
  message: string;
  productName?: string;
}

interface StoreState {
  // Cart
  cartItems: CartItem[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  setCartOpen: (open: boolean) => void;
  cartItemCount: () => number;
  cartSubtotal: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Toast
  toasts: Toast[];
  addToast: (message: string, productName?: string) => void;
  removeToast: (id: string) => void;

  // UI
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cartItems: [],
      cartOpen: false,
      addToCart: (item) => {
        const { cartItems } = get();
        const existing = cartItems.find(
          ci => ci.productId === item.productId && ci.color === item.color && ci.size === item.size
        );
        if (existing) {
          set({
            cartItems: cartItems.map(ci =>
              ci.productId === item.productId && ci.color === item.color && ci.size === item.size
                ? { ...ci, quantity: Math.min(ci.quantity + 1, 5) }
                : ci
            ),
          });
        } else {
          set({ cartItems: [...cartItems, { ...item, quantity: 1 }] });
        }
        set({ cartOpen: true });
        get().addToast('Added to cart', item.name);
      },
      removeFromCart: (productId, color, size) => {
        set({ cartItems: get().cartItems.filter(ci => !(ci.productId === productId && ci.color === color && ci.size === size)) });
      },
      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, color, size);
        } else {
          set({
            cartItems: get().cartItems.map(ci =>
              ci.productId === productId && ci.color === color && ci.size === size
                ? { ...ci, quantity: Math.min(quantity, 5) }
                : ci
            ),
          });
        }
      },
      setCartOpen: (open) => set({ cartOpen: open }),
      cartItemCount: () => get().cartItems.reduce((sum, ci) => sum + ci.quantity, 0),
      cartSubtotal: () => get().cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const { wishlist } = get();
        if (wishlist.includes(productId)) {
          set({ wishlist: wishlist.filter(id => id !== productId) });
        } else {
          set({ wishlist: [...wishlist, productId] });
        }
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // Toast
      toasts: [],
      addToast: (message, productName) => {
        const id = Date.now().toString();
        set({ toasts: [...get().toasts, { id, message, productName }] });
        setTimeout(() => get().removeToast(id), 3000);
      },
      removeToast: (id) => set({ toasts: get().toasts.filter(t => t.id !== id) }),

      // UI
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      sizeGuideOpen: false,
      setSizeGuideOpen: (open) => set({ sizeGuideOpen: open }),
    }),
    {
      name: 'gridiron-gear-store',
      partialize: (state) => ({ cartItems: state.cartItems, wishlist: state.wishlist }),
    }
  )
);
