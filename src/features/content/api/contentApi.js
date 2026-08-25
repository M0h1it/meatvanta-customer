import apiClient from "../../../lib/apiClient";

export async function fetchShopInfo() {
  const { data } = await apiClient.get("/shop-info");
  return data.data.shopInfo;
}

/** Reused from checkout - the Delivery Info page shows the same live rules
 *  the customer will actually get, so the two can never contradict. */
export async function fetchDeliveryAvailability() {
  const { data } = await apiClient.get("/delivery-availability");
  return data.data;
}
