import { createContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "meat-vanta-cart";

export const CartContext = createContext(null);

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // corrupted storage shouldn't crash the app - just start empty
  }
}

/**
 * A line is identified by the variant AND the chosen options - the same cut
 * with Tandoori marination is a different line from the same cut with Handi,
 * so they can't collapse into one row.
 */
function buildLineKey(variantId, optionIds) {
  const sorted = [...(optionIds || [])].sort((a, b) => a - b);
  return sorted.length ? `${variantId}:${sorted.join("-")}` : `${variantId}`;
}

/**
 * Guest-friendly cart - lives entirely client-side (localStorage), no backend
 * cart table. Prices here are for display only; the server recomputes every
 * line from the database at order time.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, variant, quantity, selectedOptions = []) => {
    const optionIds = selectedOptions.map((o) => o.id);
    const lineKey = buildLineKey(variant.id, optionIds);
    const optionsTotal = selectedOptions.reduce((sum, o) => sum + Number(o.extraPrice), 0);

    setItems((current) => {
      const existing = current.find((i) => i.lineKey === lineKey);
      if (existing) {
        return current.map((i) =>
          i.lineKey === lineKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...current,
        {
          lineKey,
          variantId: variant.id,
          productId: product.id,
          productName: product.name,
          imageUrl: product.imageUrl,
          variantLabel: variant.label,
          price: Number(variant.price),
          optionIds,
          optionsTotal,
          optionLabels: selectedOptions.map((o) => o.name),
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((lineKey, quantity) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.lineKey !== lineKey)
        : current.map((i) => (i.lineKey === lineKey ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((lineKey) => {
    setItems((current) => current.filter((i) => i.lineKey !== lineKey));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.price + (i.optionsTotal || 0)) * i.quantity,
    0
  );

  const value = { items, addItem, updateQuantity, removeItem, clearCart, totalCount, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
