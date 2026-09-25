import apiClient from "../../../lib/apiClient";

/**
 * Returns only dates the customer may actually pick, plus the delivery window,
 * charge and enabled payment methods. All rules are applied server-side - this
 * page just renders what it's told.
 */
export async function fetchDeliveryAvailability() {
  const { data } = await apiClient.get("/delivery-availability");
  return data.data;
}

/**
 * Prices and validates the cart. For paymentMethod "cod" this is the whole
 * checkout and `order` comes back already created. For "razorpay", nothing
 * is created yet - `order` is null and the response instead carries
 * razorpayOrderId/razorpayKeyId/amount, which is all CheckoutPage needs to
 * open the Razorpay widget. The real order only comes into existence once
 * verifyRazorpayPayment succeeds below.
 */
export async function placeOrder(payload) {
  const { data } = await apiClient.post("/orders", payload);
  return data.data; // { order, razorpayOrderId, razorpayKeyId, amount }
}

/**
 * Called right after Razorpay's widget reports a successful payment. This is
 * the call that actually creates the order on our side - identified by
 * razorpayOrderId, since there's no order number yet until this succeeds.
 */
export async function verifyRazorpayPayment(payload) {
  const { data } = await apiClient.post("/orders/razorpay/verify", payload);
  return data.data.order;
}       