import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const API = "http://localhost:5000/api";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${API}/cart/`, { credentials: "include" });
      if (!res.ok) { setCart([]); return; }
      const data = await res.json();
      if (data.CartItems) {
        const mapped = data.CartItems.map(item => ({
          id: item.ProductId,
          cartItemId: item.id,
          name: item.Product?.name,
          brand: item.Product?.brand,
          price: item.price,
          image: item.Product?.image,
          stock: item.Product?.stock,
          category: item.Product?.category,
          quantity: item.quantity,
        }));
        setCart(mapped);
      } else {
        setCart([]);
      }
    } catch (err) {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product) => {
    try {
      const res = await fetch(`${API}/cart/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur");
      await fetchCart();
    } catch (err) {
      console.error("Erreur addToCart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API}/cart/`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur");
      await fetchCart();
    } catch (err) {
      console.error("Erreur removeFromCart:", err);
    }
  };

  const changeQty = async (productId, delta) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    if (item.quantity + delta <= 0) {
      await removeFromCart(productId);
      return;
    }
    try {
      const res = await fetch(`${API}/cart/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: delta }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur");
      await fetchCart();
    } catch (err) {
      console.error("Erreur changeQty:", err);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cart) {
        await fetch(`${API}/cart/`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.id }),
        });
      }
      setCart([]);
    } catch (err) {
      console.error("Erreur clearCart:", err);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, changeQty, clearCart,
      total, itemCount, loading, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}