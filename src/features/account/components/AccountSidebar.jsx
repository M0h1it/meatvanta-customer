import { NavLink } from "react-router-dom";

/**
 * Shared between AccountPage and MyOrdersPage. On a laptop-width screen a
 * single max-w-3xl column of cards leaves a lot of dead space either side;
 * this gives that space an actual job (getting between account pages)
 * instead of just widening the cards awkwardly.
 */
export default function AccountSidebar({ customer, onLogout }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-semibold transition-colors ${
      isActive ? "bg-brand/10 text-brand-dark" : "text-ink/70 hover:bg-white"
    }`;

  return (
    <aside className="md:w-56 shrink-0">
      <div className="bg-white rounded border border-hairline p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-brand-dark text-xl">person</span>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-ink text-sm truncate">{customer?.name}</p>
          <p className="text-xs text-ink/50">+91 {customer?.phone}</p>
        </div>
      </div>

      <nav className="space-y-1">
        <NavLink to="/account" end className={linkClass}>
          <span className="material-symbols-outlined text-lg">account_circle</span>
          My Account
        </NavLink>
        <NavLink to="/my-orders" className={linkClass}>
          <span className="material-symbols-outlined text-lg">receipt_long</span>
          My Orders
        </NavLink>
      </nav>

      {onLogout && (
        <button
          onClick={onLogout}
          className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-semibold text-brand hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Sign Out
        </button>
      )}
    </aside>
  );
}
