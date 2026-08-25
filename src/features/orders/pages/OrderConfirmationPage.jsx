import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { formatWindow, formatDate, formatRupees } from "../../../lib/format";

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  const location = useLocation();

  // Coming straight from checkout, the order is handed over in router state -
  // no need to re-fetch (and no phone number needed to look it up).
  const [order] = useState(location.state?.order || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    // Page was refreshed or opened directly - we don't have the phone number
    // required to fetch it, so send them to their order list instead.
    return (
      <div className="page-x max-w-3xl mx-auto py-16 text-center">
        <p className="text-ink font-bold text-lg mb-1">Order {orderNumber}</p>
        <p className="text-ink/60 text-sm mb-6">
          This order is saved to your account.
        </p>
        <Link
          to="/my-orders"
          className="inline-block bg-brand text-white font-bold px-8 py-3 rounded-full hover:opacity-90"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  const isUpi = order.paymentMethod === "upi";

  return (
    <div className="page-x max-w-3xl mx-auto py-10 md:py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-dark/10 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-4xl text-brand-dark">check_circle</span>
        </div>
        <h1 className="font-display text-headline-lg text-ink mb-1">Order Placed!</h1>
        <p className="text-ink/60 text-sm">
          Thanks, {order.customerName}. We've received your order.
        </p>
        <p className="font-mono font-bold text-brand-dark text-lg mt-3">{order.orderNumber}</p>
        <p className="text-xs text-ink/50">Saved to your account under My Orders.</p>
      </div>

      {isUpi && (
        <div className="bg-accent/10 border border-accent/30 rounded p-4 mb-5">
          <p className="font-bold text-ink text-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-accent">hourglass_top</span>
            Payment under review
          </p>
          <p className="text-xs text-ink/70 mt-1">
            We're confirming your UPI payment. Once verified, we'll start preparing your order.
          </p>
        </div>
      )}

      <div className="bg-white rounded border border-hairline p-5 mb-5">
        <h2 className="font-bold text-ink mb-3">Delivery</h2>
        <div className="flex items-start gap-2 mb-2">
          <span className="material-symbols-outlined text-base text-brand-dark mt-0.5">event</span>
          <div>
            <p className="text-sm font-semibold text-ink">{formatDate(order.deliveryDate)}</p>
            <p className="text-xs text-ink/60">
              {formatWindow(order.deliveryStartTime, order.deliveryEndTime)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded border border-hairline p-5 mb-6">
        <h2 className="font-bold text-ink mb-3">Order Summary</h2>
        {order.items?.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-1.5">
            <span className="text-ink/70">
              {item.quantity}× {item.productName}{" "}
              <span className="text-ink/50">({item.variantLabel})</span>
              {item.selectedOptions?.length > 0 && (
                <span className="block text-xs text-brand-dark">
                  {item.selectedOptions.map((o) => o.optionName).join(", ")}
                </span>
              )}
            </span>
            <span className="font-semibold text-ink">{formatRupees(item.lineTotal)}</span>
          </div>
        ))}

        <div className="border-t border-hairline mt-3 pt-3 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-ink/70">Subtotal</span>
            <span className="font-semibold text-ink">{formatRupees(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink/70">Delivery</span>
            {order.deliveryChargeStatus === "pending" ? (
              <span className="text-ink/50 text-xs">To be confirmed</span>
            ) : (
              <span className="font-semibold text-ink">{formatRupees(order.deliveryCharge)}</span>
            )}
          </div>
        </div>

        <div className="border-t border-hairline mt-3 pt-3 flex justify-between items-center">
          <span className="font-bold text-ink">
            Total
            <span className="block text-xs font-normal text-ink/50">
              {order.paymentMethod === "cod" ? "Pay on delivery" : "Paid via UPI"}
            </span>
          </span>
          <span className="text-2xl font-bold text-ink">{formatRupees(order.total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/my-orders"
          className="flex-1 text-center bg-brand-dark text-surface font-bold py-3.5 rounded-full hover:opacity-90"
        >
          View My Orders
        </Link>
        <Link
          to="/shop"
          className="flex-1 text-center border border-ink/20 text-ink font-bold py-3.5 rounded-full hover:bg-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
