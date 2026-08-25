import apiClient from "../../../lib/apiClient";

export async function fetchAddresses() {
  const { data } = await apiClient.get("/auth/addresses");
  return data.data.addresses;
}

export async function createAddress(payload) {
  const { data } = await apiClient.post("/auth/addresses", payload);
  return data.data.address;
}

export async function updateAddress(id, payload) {
  const { data } = await apiClient.put(`/auth/addresses/${id}`, payload);
  return data.data.address;
}

export async function deleteAddress(id) {
  const { data } = await apiClient.delete(`/auth/addresses/${id}`);
  return data.data;
}

export async function setDefaultAddress(id) {
  const { data } = await apiClient.patch(`/auth/addresses/${id}/default`);
  return data.data.address;
}
