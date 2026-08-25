import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { useCustomerAuth } from "../../../hooks/useCustomerAuth";
import { productImage } from "../../../lib/images";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const { isAuthenticated, openLogin } = useCustomerAuth();
  const navigate = useNavigate();

  // Sign-in is asked for here rather than at "Place Order" - better to know
  // who the customer is before they fill in a whole checkout form.
  function handleProceedToCheckout() {
    if (!isAuthenticated) {
      openLogin(() => navigate("/checkout"));
      return;
    }
    navigate("/checkout");
  }

  if (items.length === 0) {
    return (
      <div className="page-x py-20 text-center">
        <span className="material-symbols-outlined text-6xl text-ink/20 mb-3">shopping_bag</span>
        <p className="text-ink font-bold text-lg mb-1">Your cart is empty</p>
        <p className="text-ink/60 text-sm mb-6">Fresh cuts are waiting for you.</p>
        <Link
          to="/shop"
          className="inline-block bg-brand text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page-x max-w-4xl mx-auto py-8 md:py-12">
      <h1 className="font-display text-headline-lg text-ink mb-6">Your Cart</h1>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div
            key={item.lineKey}
            className="bg-white rounded border border-hairline p-3 flex items-center gap-3"
          >
            <div className="w-16 h-16 rounded-sm bg-surface flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={item.imageUrl || productImage({ id: item.productId }, 200)}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-ink text-sm leading-snug truncate">{item.productName}</p>
              <p className="text-xs text-ink/60">{item.variantLabel}</p>
              {item.optionLabels?.length > 0 && (
                <p className="text-xs text-brand-dark font-medium">{item.optionLabels.join(", ")}</p>
              )}
              <p className="text-sm font-bold text-ink mt-0.5">
                ₹{item.price + (item.optionsTotal || 0)}
                {item.optionsTotal > 0 && (
                  <span className="text-[11px] font-normal text-ink/50"> (₹{item.price} + ₹{item.optionsTotal})</span>
                )}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center border border-ink/15 rounded-full">
                <button
                  onClick={() => updateQuantity(item.lineKey, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-ink hover:text-brand"
                  aria-label="Decrease quantity"
                >
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <span className="w-6 text-center text-sm font-bold text-ink">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.lineKey, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-ink hover:text-brand"
                  aria-label="Increase quantity"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
              </div>
              <button
                onClick={() => removeItem(item.lineKey)}
                className="text-xs text-ink/50 hover:text-brand"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="bg-white rounded border border-hairline p-5">
        <h2 className="font-bold text-ink mb-3">Order Summary</h2>
        <div className="flex justify-between text-sm text-ink/70 mb-1.5">
          <span>Subtotal</span>
          <span className="font-semibold text-ink">₹{totalPrice.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm text-ink/70 mb-3">
          <span>Delivery</span>
          <span className="text-ink/50">Calculated at checkout</span>
        </div>
        <div className="border-t border-hairline pt-3 flex justify-between items-center">
          <span className="font-bold text-ink">Total</span>
          <span className="text-2xl font-bold text-ink">₹{totalPrice.toFixed(0)}</span>
        </div>

        <button
          onClick={handleProceedToCheckout}
          className="block w-full mt-4 text-center bg-brand-dark text-surface font-bold py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          {isAuthenticated ? "Proceed to Checkout" : "Sign In & Checkout"}
        </button>
      </div>

      <Link to="/shop" className="inline-block mt-4 text-sm font-bold text-brand-dark underline">
        Continue shopping
      </Link>
    </div>
  );
}
