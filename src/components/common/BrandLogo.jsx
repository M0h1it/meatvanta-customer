/**
 * Drop the real logo at /public/logo.png and it appears everywhere this is used.
 * Until then a monogram stands in, so layout and spacing are already correct.
 */
export default function BrandLogo({ className = "h-10 w-10" }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/logo.png"
        alt="Meat Vanta"
        className="h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling.style.display = "flex";
        }}
      />
      <span
        style={{ display: "none" }}
        className="h-full w-full items-center justify-center rounded bg-accent text-white font-bold text-sm tracking-tight"
      >
        MV
      </span>
    </span>
  );
}
