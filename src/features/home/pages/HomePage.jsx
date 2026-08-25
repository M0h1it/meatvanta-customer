import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../shop/api/shopApi";
import { productImage, categoryImage, HERO_IMAGE } from "../../../lib/images";
import { useShopInfo } from "../../../hooks/useShopInfo";

const TRUST_POINTS = [
  { icon: "content_cut", title: "Cut After You Order", text: "Never frozen, always fresh." },
  { icon: "schedule", title: "Morning Delivery", text: "6 AM – 11 AM slots available." },
  { icon: "verified", title: "Halal Certified", text: "100% authentic & verified." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose Your Cut", text: "Pick the meat, weight and preparation you want." },
  { step: "02", title: "Pick Your Slot", text: "Select a delivery date that suits you." },
  { step: "03", title: "We Cut Fresh", text: "Your order is prepared the same morning." },
  { step: "04", title: "Delivered", text: "At your door between 6 and 11 AM." },
];

function lowestPrice(product) {
  if (!product?.variants?.length) return null;
  return Math.min(...product.variants.map((v) => Number(v.price)));
}

export default function HomePage() {
  const { shopInfo } = useShopInfo();
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const years = shopInfo?.yearsInBusiness || 35;

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
    fetchProducts()
      .then((all) => setBestSellers(all.slice(0, 8)))
      .catch(() => setBestSellers([]));
  }, []);

  return (
    <div>
      {/* HERO - full bleed, no gutter */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Freshly cut premium meat on a butcher's block"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/50 to-ink/70" />

        <div className="relative page-x text-center max-w-3xl mx-auto py-20">
          <span className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/40 text-accent text-label-sm font-semibold uppercase px-4 py-1.5 rounded-full mb-6">
            <span className="material-symbols-outlined text-sm">verified</span>
            {years}+ Years of Trust
          </span>

          <h1 className="font-display text-display-sm md:text-display-lg text-white mb-4">
            <span className="text-brand-soft">Fresh</span> Every Morning
          </h1>

          <p className="text-white/85 text-base md:text-lg mb-8 max-w-xl mx-auto">
            {shopInfo?.tagline
              ? `${shopInfo.tagline} — premium heritage cuts delivered from our block to your kitchen.`
              : "Premium heritage cuts delivered from our block to your kitchen."}
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-dark transition-colors"
          >
            Shop Now
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-hairline">
        <div className="page-x py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:divide-x sm:divide-hairline">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="flex items-center gap-4 sm:justify-center sm:px-4">
                <span className="w-12 h-12 rounded-full bg-brand/8 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-brand">{point.icon}</span>
                </span>
                <div>
                  <p className="font-semibold text-ink text-sm">{point.title}</p>
                  <p className="text-xs text-ink/60 mt-0.5">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="page-x py-14 md:py-section">
        <div className="mb-8">
          <h2 className="font-display text-headline-lg text-ink">Shop by Category</h2>
          <p className="text-ink/60 text-sm mt-1">Every cut prepared fresh, the morning it's delivered.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative rounded overflow-hidden aspect-[4/3] border border-hairline"
            >
              <img
                src={categoryImage(category.slug)}
                alt={`${category.name} — fresh cuts from Meat Vanta`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-2xl text-white font-bold">{category.name}</h3>
                <p className="text-white/75 text-sm mt-0.5">
                  {category._count?.products ?? 0} items available
                </p>
                <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold mt-2">
                  Shop now
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      {bestSellers.length > 0 && (
        <section className="bg-white border-y border-hairline">
          <div className="page-x py-14 md:py-section">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-headline-lg text-ink">Popular This Week</h2>
                <p className="text-ink/60 text-sm mt-1">What Gurugram kitchens are ordering.</p>
              </div>
              <Link to="/shop" className="text-sm font-semibold text-brand hover:underline whitespace-nowrap">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {bestSellers.slice(0, 4).map((product) => {
                const from = lowestPrice(product);
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-white rounded border border-hairline overflow-hidden hover:border-brand/40 transition-colors"
                  >
                    <div className="relative aspect-square overflow-hidden bg-surface-alt">
                      <img
                        src={productImage(product)}
                        alt={`${product.name} — ${product.category?.name} at Meat Vanta`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-sm">
                        {product.category?.name}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-ink leading-snug">{product.name}</h3>
                      {from !== null && (
                        <p className="text-sm text-ink/70 mt-1">
                          from <span className="font-bold text-ink">₹{from}</span>
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="page-x py-14 md:py-section">
        <h2 className="font-display text-headline-lg text-ink text-center mb-2">How It Works</h2>
        <p className="text-ink/60 text-sm text-center mb-10">From our block to your kitchen in four steps.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="bg-white rounded border border-hairline p-6">
              <span className="font-display text-3xl text-accent font-bold">{item.step}</span>
              <h3 className="font-semibold text-ink mt-3">{item.title}</h3>
              <p className="text-sm text-ink/60 mt-1 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-brand-dark text-white">
        <div className="page-x py-14 md:py-section text-center">
          <h2 className="font-display text-headline-lg mb-3">Taste the difference freshness makes</h2>
          <p className="text-white/75 mb-8 max-w-lg mx-auto">
            {shopInfo?.addressLine
              ? "Order online, or visit us at the shop."
              : "Delivered fresh across Gurugram, every morning."}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-brand-dark font-semibold px-8 py-3.5 rounded-full hover:bg-accent hover:text-ink transition-colors"
          >
            Order Fresh
          </Link>
        </div>
      </section>
    </div>
  );
}
