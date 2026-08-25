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

export async function placeOrder(payload) {
  const { data } = await apiClient.post("/orders", payload);
  return data.data.order;
}
