import apiClient from "../../../lib/apiClient";

export async function fetchProduct(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data.data.product;
}
