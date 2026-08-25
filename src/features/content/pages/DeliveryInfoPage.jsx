import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDeliveryAvailability } from "../api/contentApi";
import { formatWindow, formatDate, formatRupees } from "../../../lib/format";

const DAY_ORDER = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const DAY_LABELS = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

export default function DeliveryInfoPage() {
  const [availability, setAvailability] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDeliveryAvailability()
      .then(setAvailability)
      .catch(() => setAvailability(null))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="page-x max-w-3xl mx-auto py-12 text-sm text-ink/60">Loading...</div>;
  }

  // The available dates the API returns tell us which weekdays are live, so
  // this page can never claim a delivery day that checkout would reject.
  const activeDays = new Set((availability?.dates || []).map((d) => d.dayName));

  return (
    <div className="page-x max-w-3xl mx-auto py-8 md:py-12">
      <h1 className="font-display text-headline-lg text-ink mb-1">Delivery Information</h1>
      <p className="text-ink/60 text-sm mb-6">
        {availability?.deliveryAreaNote || "We deliver across Gurugram."}
      </p>

      {/* Window */}
      <section className="bg-white rounded border border-hairline p-5 mb-4">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-brand">schedule</span>
          </span>
          <div>
            <h2 className="font-bold text-ink">Morning Delivery</h2>
            <p className="text-sm text-ink/70 mt-0.5">
              {availability
                ? formatWindow(
                    availability.deliveryWindow.startTime,
                    availability.deliveryWindow.endTime
                  )
                : "6:00 AM – 11:00 AM"}
            </p>
            <p className="text-xs text-ink/50 mt-1">
              Your order is cut fresh that morning and delivered within this window.
            </p>
          </div>
        </div>
      </section>

      {/* Days */}
      <section className="bg-white rounded border border-hairline p-5 mb-4">
        <h2 className="font-bold text-ink mb-3">Delivery Days</h2>
        <div className="grid grid-cols-2 gap-y-2">
          {DAY_ORDER.map((day) => {
            const isActive = activeDays.has(day);
            return (
              <div key={day} className="flex items-center gap-2 text-sm">
                <span
                  className={`material-symbols-outlined text-base ${
                    isActive ? "text-brand-dark" : "text-ink/25"
                  }`}
                >
                  {isActive ? "check_circle" : "cancel"}
                </span>
                <span className={isActive ? "text-ink" : "text-ink/40"}>{DAY_LABELS[day]}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-ink/50 mt-3">
          Only days we're currently delivering appear as available at checkout.
        </p>
      </section>

      {/* Next available slots */}
      {availability?.dates?.length > 0 && (
        <section className="bg-white rounded border border-hairline p-5 mb-4">
          <h2 className="font-bold text-ink mb-3">Next Available Slots</h2>
          <div className="flex flex-wrap gap-2">
            {availability.dates.map((d) => (
              <span
                key={d.date}
                className="text-sm font-semibold px-3 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark border border-brand-dark/15"
              >
                {d.label || formatDate(d.date)}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Charges */}
      <section className="bg-white rounded border border-hairline p-5 mb-4">
        <h2 className="font-bold text-ink mb-2">Delivery Charge</h2>
        {availability?.deliveryChargeMode === "flat" ? (
          <p className="text-sm text-ink/70">
            A flat{" "}
            <span className="font-bold text-ink">
              {formatRupees(availability.flatDeliveryCharge)}
            </span>{" "}
            is added at checkout.
          </p>
        ) : (
          <p className="text-sm text-ink/70">
            Confirmed after we check your address — you'll see the final amount on your order.
          </p>
        )}
      </section>

      {/* Payment */}
      <section className="bg-white rounded border border-hairline p-5 mb-6">
        <h2 className="font-bold text-ink mb-2">Payment</h2>
        <ul className="text-sm text-ink/70 space-y-1.5">
          {availability?.payment?.codEnabled && (
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-base text-brand-dark">payments</span>
              Cash on delivery — pay when your order arrives.
            </li>
          )}
          {availability?.payment?.upiEnabled && (
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-base text-brand-dark">qr_code</span>
              UPI — pay at checkout, then share your receipt. We confirm it before preparing.
            </li>
          )}
        </ul>
      </section>

      <div className="text-center">
        <Link
          to="/shop"
          className="inline-block bg-brand text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90"
        >
          Start Your Order
        </Link>
      </div>
    </div>
  );
}
