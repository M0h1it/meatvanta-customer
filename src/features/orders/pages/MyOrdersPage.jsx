import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../api/ordersApi";
import { useCustomerAuth } from "../../../hooks/useCustomerAuth";
import { formatDate, formatRupees } from "../../../lib/format";
import AccountSidebar from "../../account/components/AccountSidebar";

const STATUS_LABELS = {
  placed: "Order Placed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE = {
  placed: "bg-accent/20 text-ink",
  preparing: "bg-accent/20 text-ink",
  out_for_delivery: "bg-brand-dark/15 text-brand-dark",
  delivered: "bg-brand-dark/15 text-brand-dark",
  cancelled: "bg-brand/15 text-brand",
};

export default function MyOrdersPage() {
  const { customer, isAuthenticated, isLoading: authLoading, openLogin, logout } = useCustomerAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchMyOrders(page)
      .then((result) => {
        setOrders(result.orders);
        setTotalPages(result.totalPages);
      })
      .catch(() => setError("Couldn't load your orders."))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, page]);

  if (authLoading) {
    return <div className="page-x max-w-3xl mx-auto py-12 text-sm text-ink/60">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="page-x max-w-3xl mx-auto py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-ink/20 mb-3">receipt_long</span>
        <p className="text-ink font-bold text-lg mb-1">Sign in to see your orders</p>
        <p className="text-ink/60 text-sm mb-6">
          Your order history stays with your mobile number.
        </p>
        <button
          onClick={() => openLogin()}
          className="bg-brand text-white font-bold px-8 py-3 rounded-full hover:opacity-90"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="page-x max-w-5xl mx-auto py-8 md:py-12">
      <h1 className="font-display text-headline-lg text-ink mb-6">My Orders</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <AccountSidebar customer={customer} onLogout={handleLogout} />

        <div className="flex-1 min-w-0 w-full">
          {error && (
            <div className="mb-4 rounded-sm bg-brand/10 border border-brand/30 text-brand text-sm px-4 py-3">
              {error}
            </div>
          )}

          {isLoading ? (
            <p className="text-sm text-ink/60">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded border border-hairline">
              <span className="material-symbols-outlined text-5xl text-ink/20 mb-3">shopping_bag</span>
              <p className="text-ink font-bold mb-1">No orders yet</p>
              <p className="text-ink/60 text-sm mb-5">Your first fresh delivery is a few taps away.</p>
              <Link
                to="/shop"
                className="inline-block bg-brand text-white font-bold px-8 py-3 rounded-full hover:opacity-90"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {orders.map((order) => (
                  <Link
                    key={order.orderNumber}
                    to={`/my-orders/${order.orderNumber}`}
                    className="block bg-white rounded border border-hairline p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-mono font-bold text-brand-dark text-sm">{order.orderNumber}</p>
                        <p className="text-xs text-ink/50">Placed {formatDate(order.createdAt)}</p>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          STATUS_STYLE[order.status] || ""
                        }`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>

                    <p className="text-sm text-ink/70 line-clamp-2">
                      {order.items.map((i) => `${i.quantity}× ${i.productName}`).join(", ")}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline">
                      <span className="text-xs text-ink/60">
                        Delivery {formatDate(order.deliveryDate)}
                      </span>
                      <span className="font-bold text-ink">{formatRupees(order.total)}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 text-sm">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 rounded-full border border-ink/20 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-ink/60">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-full border border-ink/20 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
