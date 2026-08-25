import { useState, useEffect, useRef } from "react";
import { useCustomerAuth } from "../../../hooks/useCustomerAuth";

const STEPS = { PHONE: "phone", OTP: "otp" };

export default function LoginSheet() {
  const { isLoginOpen, closeLogin, requestOtp, verifyOtp } = useCustomerAuth();

  const [step, setStep] = useState(STEPS.PHONE);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [needsName, setNeedsName] = useState(false);
  const [devOtp, setDevOtp] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const otpInputRef = useRef(null);

  // Reset everything when the sheet closes so the next open starts clean.
  useEffect(() => {
    if (!isLoginOpen) {
      setStep(STEPS.PHONE);
      setPhone("");
      setOtp("");
      setName("");
      setNeedsName(false);
      setDevOtp(null);
      setError(null);
      setResendIn(0);
    }
  }, [isLoginOpen]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  useEffect(() => {
    if (step === STEPS.OTP && otpInputRef.current) otpInputRef.current.focus();
  }, [step]);

  useEffect(() => {
    if (!isLoginOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") closeLogin();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLoginOpen, closeLogin]);

  if (!isLoginOpen) return null;

  async function handleSendOtp(e) {
    e?.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await requestOtp(phone);
      setDevOtp(result.devOtp || null); // only ever present in dev mode
      setStep(STEPS.OTP);
      setResendIn(60);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't send the code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await verifyOtp({ phone, otp, name: needsName ? name : undefined });
      // Sheet closes itself on success via context.
    } catch (err) {
      const data = err.response?.data;
      // Backend tells us this number has no account yet and needs a name.
      if (data?.errors?.nameRequired) {
        setNeedsName(true);
        setError(null);
      } else {
        setError(data?.message || "Couldn't verify that code.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50"
      onClick={closeLogin}
    >
      <div
        className="w-full sm:max-w-sm bg-surface rounded-t-2xl sm:rounded p-6 pb-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between mb-1">
          <h2 className="font-display text-xl font-bold text-ink">
            {step === STEPS.PHONE ? "Sign in to order" : needsName ? "Almost there" : "Enter the code"}
          </h2>
          <button onClick={closeLogin} className="text-ink/40 hover:text-ink" aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {step === STEPS.PHONE ? (
          <form onSubmit={handleSendOtp}>
            <p className="text-sm text-ink/60 mb-5">
              We'll send a 6-digit code to confirm it's you.
            </p>

            <label className="block text-sm font-semibold text-ink mb-1">Mobile Number</label>
            <div className="flex items-center rounded-sm border border-ink/15 bg-white overflow-hidden mb-1">
              <span className="px-3 text-sm font-semibold text-ink/50 border-r border-hairline py-3">
                +91
              </span>
              <input
                autoFocus
                type="tel"
                inputMode="numeric"
                maxLength={10}
                required
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 px-3 py-3 text-sm focus:outline-none"
              />
            </div>

            {error && <p className="text-xs text-brand mt-2">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting || phone.length !== 10}
              className="w-full mt-5 bg-brand text-white font-bold py-3.5 rounded-full hover:opacity-90 disabled:opacity-40"
            >
              {isSubmitting ? "Sending..." : "Send Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <p className="text-sm text-ink/60 mb-4">
              Sent to +91 {phone}.{" "}
              <button
                type="button"
                onClick={() => setStep(STEPS.PHONE)}
                className="text-brand-dark font-semibold underline"
              >
                Change
              </button>
            </p>

            {devOtp && (
              <div className="mb-4 rounded-sm bg-accent/15 border border-accent/40 px-3 py-2">
                <p className="text-xs text-ink/70">
                  Dev mode — your code is <span className="font-mono font-bold">{devOtp}</span>
                </p>
              </div>
            )}

            <label className="block text-sm font-semibold text-ink mb-1">6-Digit Code</label>
            <input
              ref={otpInputRef}
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              placeholder="------"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-center text-lg font-bold tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-brand-dark"
            />

            {needsName && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-ink mb-1">Your Name</label>
                <input
                  autoFocus
                  required
                  placeholder="So we know who's ordering"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark"
                />
                <p className="text-xs text-ink/50 mt-1">First time here — welcome!</p>
              </div>
            )}

            {error && <p className="text-xs text-brand mt-2">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 6 || (needsName && name.trim().length < 2)}
              className="w-full mt-5 bg-brand text-white font-bold py-3.5 rounded-full hover:opacity-90 disabled:opacity-40"
            >
              {isSubmitting ? "Verifying..." : needsName ? "Create Account" : "Verify & Continue"}
            </button>

            <button
              type="button"
              disabled={resendIn > 0 || isSubmitting}
              onClick={handleSendOtp}
              className="w-full mt-3 text-sm font-semibold text-ink/60 disabled:opacity-50"
            >
              {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
