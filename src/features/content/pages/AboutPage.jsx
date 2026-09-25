import { Link } from "react-router-dom";
import { useShopInfo } from "../../../hooks/useShopInfo";
import { useDocumentMeta } from "../../../hooks/useDocumentMeta";
import { STORY_IMAGE } from "../../../lib/images";

const PILLARS = [
  {
    icon: "wb_sunny",
    title: "Fresh Every Morning",
    text: "Raw material is bought fresh at market each morning. Nothing sits in a freezer waiting for an order.",
  },
  {
    icon: "content_cut",
    title: "Cut After You Order",
    text: "Your meat is prepared once the order comes in, not portioned days ahead and wrapped.",
  },
  {
    icon: "verified_user",
    title: "Halal, Always",
    text: "Sourced and prepared to halal standards, the same way for decades.",
  },
];

export default function AboutPage() {
  const { shopInfo, isLoading } = useShopInfo();

  const years = shopInfo?.yearsInBusiness || 35;
  const shopName = shopInfo?.shopName || "Meat Vanta";

  useDocumentMeta({
    title: "Our Story",
    description: `For more than ${years} years, ${shopName} has cut fresh halal chicken, mutton and kebabs every morning and delivered them across Gurugram. Learn what makes our meat different.`,
    path: "/about",
  });

  // Blank lines separate paragraphs in the admin editor.
  const storyParagraphs = (shopInfo?.aboutStory || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div>
      <section className="relative bg-brand-dark text-surface overflow-hidden">
        <img
          src={STORY_IMAGE}
          alt="Meat Vanta butcher shop"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative page-x max-w-3xl mx-auto py-16 md:py-24 text-center">
          <span className="inline-block bg-accent/20 text-accent text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-4">
            {years}+ Years of Trust
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">Our Story</h1>
          <p className="text-surface/80 text-base md:text-lg">
            {shopInfo?.tagline || "Fresh Every Morning"}
          </p>
        </div>
      </section>

      <section className="page-x max-w-3xl mx-auto py-12">
        {isLoading ? (
          <p className="text-sm text-ink/60">Loading...</p>
        ) : storyParagraphs.length > 0 ? (
          <div className="space-y-4">
            {storyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-ink/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          // Sensible fallback until the owner writes the real story in the admin.
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>
              For more than {years} years, {shopName} has been a name families in Gurugram trust for
              fresh chicken, mutton and kebabs.
            </p>
            <p>
              What started as a neighbourhood meat shop has stayed exactly that at heart — the same
              standards, the same early mornings at market, the same care with every cut. The only thing
              that's changed is that you can now order from home.
            </p>
          </div>
        )}

        {shopInfo?.qualityPromise && (
          <div className="mt-8 bg-white rounded border border-hairline p-6">
            <h2 className="font-bold text-ink text-lg mb-2">Our Quality Promise</h2>
            <p className="text-ink/80 leading-relaxed whitespace-pre-line">{shopInfo.qualityPromise}</p>
          </div>
        )}
      </section>

      <section className="bg-white border-y border-hairline">
        <div className="page-x max-w-5xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <span className="material-symbols-outlined text-4xl text-accent mb-2">{pillar.icon}</span>
              <p className="font-bold text-ink">{pillar.title}</p>
              <p className="text-sm text-ink/60 mt-1">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-x max-w-3xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-ink mb-2">Taste the difference</h2>
        <p className="text-ink/60 text-sm mb-6">Delivered fresh across Gurugram.</p>
        <Link
          to="/shop"
          className="inline-block bg-brand text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90"
        >
          Order Fresh
        </Link>
      </section>
    </div>
  );
}
