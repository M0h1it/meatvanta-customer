import apiClient from "../../../lib/apiClient";

/** Guest tracking - phone required alongside the order number so orders
 *  can't be enumerated by guessing sequential numbers. */
export async function trackOrder(orderNumber, phone) {
  const { data } = await apiClient.get("/orders/track", { params: { orderNumber, phone } });
  return data.data.order;
}

/** Signed-in customers: no order number needed. */
export async function fetchMyOrders(page = 1) {
  const { data } = await apiClient.get("/my-orders", { params: { page } });
  return data.data; // { orders, total, page, totalPages }
}

export async function fetchMyOrder(orderNumber) {
  const { data } = await apiClient.get(`/my-orders/${orderNumber}`);
  return data.data.order;
}
