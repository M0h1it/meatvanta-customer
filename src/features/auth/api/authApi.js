import apiClient from "../../../lib/apiClient";

export async function requestOtp(phone) {
  const { data } = await apiClient.post("/auth/request-otp", { phone });
  return data.data; // { expiresInMinutes, devOtp? }
}

export async function verifyOtp({ phone, otp, name }) {
  const { data } = await apiClient.post("/auth/verify-otp", { phone, otp, name });
  return data.data; // { customer, isNewCustomer }
}

export async function fetchCurrentCustomer() {
  const { data } = await apiClient.get("/auth/me");
  return data.data.customer;
}

export async function logoutRequest() {
  await apiClient.post("/auth/logout");
}
