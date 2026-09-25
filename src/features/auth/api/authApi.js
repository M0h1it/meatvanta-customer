import apiClient from "../../../lib/apiClient";

/**
 * Confirms the access-token the MSG91 OTP Widget handed back after the
 * customer entered the right code (see LoginSheet.jsx, which drives the
 * widget itself - sending/matching the OTP never touches our backend).
 */
export async function verifyOtp({ accessToken, name }) {
  const { data } = await apiClient.post("/auth/verify-otp", { accessToken, name });
  return data.data; // { customer, isNewCustomer }
}

export async function fetchCurrentCustomer() {
  const { data } = await apiClient.get("/auth/me");
  return data.data.customer;
}

export async function logoutRequest() {
  await apiClient.post("/auth/logout");
}