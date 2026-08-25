import { Link } from "react-router-dom";
import { useShopInfo } from "../../hooks/useShopInfo";
import BrandLogo from "../common/BrandLogo";

export default function Footer() {
  const { shopInfo } = useShopInfo();

  const shopName = shopInfo?.shopName || "Meat Vanta";
  const whatsappDigits = (shopInfo?.whatsappNumber || "").replace(/\D/g, "");

  return (
    <footer className="bg-ink text-white/70 mt-section">
      <div className="page-x py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <BrandLogo className="h-9 w-9" />
              <span className="font-display text-xl font-bold text-white">{shopName}</span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium halal butcher bringing quality cuts directly to your kitchen.
            </p>
            {shopInfo?.yearsInBusiness > 0 && (
              <p className="text-xs text-accent font-semibold mt-2 tracking-wide uppercase">
                {shopInfo.yearsInBusiness}+ Years of Trust
              </p>
            )}
          </div>

          <div>
            <p className="text-accent font-bold text-sm mb-3 tracking-wide uppercase">Shop</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=1" className="hover:text-accent transition-colors">Chicken</Link></li>
              <li><Link to="/shop?category=2" className="hover:text-accent transition-colors">Mutton</Link></li>
              <li><Link to="/shop?category=3" className="hover:text-accent transition-colors">Special Items</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-accent font-bold text-sm mb-3 tracking-wide uppercase">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/delivery" className="hover:text-accent transition-colors">Delivery Info</Link></li>
              <li><Link to="/my-orders" className="hover:text-accent transition-colors">My Orders</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-accent font-bold text-sm mb-3 tracking-wide uppercase">Support</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              {shopInfo?.phone && (
                <li>
                  <a href={`tel:${shopInfo.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <span className="material-symbols-outlined text-base">call</span>
                    {shopInfo.phone}
                  </a>
                </li>
              )}
              {whatsappDigits && (
                <li>
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-accent transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {shopName}. All rights reserved.
          </p>
          {shopInfo?.fssaiNumber && (
            <p className="text-xs text-white/50">FSSAI Licence No. {shopInfo.fssaiNumber}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
