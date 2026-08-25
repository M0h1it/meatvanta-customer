import { useShopInfo } from "../../../hooks/useShopInfo";

export default function ContactPage() {
  const { shopInfo, isLoading } = useShopInfo();

  if (isLoading) {
    return <div className="page-x max-w-3xl mx-auto py-12 text-sm text-ink/60">Loading...</div>;
  }

  const hasPhone = !!shopInfo?.phone;
  const hasWhatsapp = !!shopInfo?.whatsappNumber;
  const hasEmail = !!shopInfo?.email;
  const hasAddress = !!shopInfo?.addressLine;

  // Strip anything that isn't a digit so the wa.me link works regardless of
  // how the owner typed the number.
  const whatsappDigits = (shopInfo?.whatsappNumber || "").replace(/\D/g, "");

  return (
    <div className="page-x max-w-3xl mx-auto py-8 md:py-12">
      <h1 className="font-display text-headline-lg text-ink mb-1">Contact Us</h1>
      <p className="text-ink/60 text-sm mb-6">
        Questions about an order, or want to place a bulk order? Reach us directly.
      </p>

      <div className="space-y-3">
        {hasPhone && (
          <a
            href={`tel:${shopInfo.phone}`}
            className="flex items-center gap-4 bg-white rounded border border-hairline p-4 hover:shadow-md transition-shadow"
          >
            <span className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-brand">call</span>
            </span>
            <span>
              <span className="block text-xs text-ink/50">Call us</span>
              <span className="block font-bold text-ink">{shopInfo.phone}</span>
            </span>
          </a>
        )}

        {hasWhatsapp && (
          <a
            href={`https://wa.me/${whatsappDigits}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-white rounded border border-hairline p-4 hover:shadow-md transition-shadow"
          >
            <span className="w-11 h-11 rounded-full bg-brand-dark/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-brand-dark">chat</span>
            </span>
            <span>
              <span className="block text-xs text-ink/50">WhatsApp</span>
              <span className="block font-bold text-ink">{shopInfo.whatsappNumber}</span>
            </span>
          </a>
        )}

        {hasEmail && (
          <a
            href={`mailto:${shopInfo.email}`}
            className="flex items-center gap-4 bg-white rounded border border-hairline p-4 hover:shadow-md transition-shadow"
          >
            <span className="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-accent">mail</span>
            </span>
            <span>
              <span className="block text-xs text-ink/50">Email</span>
              <span className="block font-bold text-ink break-all">{shopInfo.email}</span>
            </span>
          </a>
        )}

        {hasAddress && (
          <div className="bg-white rounded border border-hairline p-4">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-brand">location_on</span>
              </span>
              <div className="flex-1">
                <span className="block text-xs text-ink/50">Visit the shop</span>
                <p className="font-bold text-ink whitespace-pre-line">{shopInfo.addressLine}</p>
                {shopInfo.shopHours && (
                  <p className="text-sm text-ink/60 mt-1">{shopInfo.shopHours}</p>
                )}
                {shopInfo.mapUrl && (
                  <a
                    href={shopInfo.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-brand mt-2"
                  >
                    Get directions
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {!hasPhone && !hasWhatsapp && !hasEmail && !hasAddress && (
          <p className="text-sm text-ink/60">Contact details are being updated. Please check back shortly.</p>
        )}
      </div>

      {shopInfo?.fssaiNumber && (
        <p className="text-xs text-ink/50 mt-8 text-center">
          FSSAI Licence No. {shopInfo.fssaiNumber}
        </p>
      )}
    </div>
  );
}
