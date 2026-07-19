import api from "./axios";

export const getAllDonations = async ({ page = 1, limit = 10, category, tag } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (category && category !== "All") params.append("category", category);
  if (tag) params.append("tag", tag);
  const { data } = await api.get(`/donations?${params}`);
  return data;
};

export const saveDonation = async (donationId) => {
  const { data } = await api.post(`/ngo/saved/${donationId}`);
  return data;
};

export const getSavedDonations = async () => {
  const { data } = await api.get("/ngo/saved");
  return data;
};

export const removeSavedDonation = async (donationId) => {
  const { data } = await api.delete(`/ngo/saved/${donationId}`);
  return data;
};

export const requestPickup = async (donationId) => {
  const { data } = await api.post(`/ngo/pickups/${donationId}`);
  return data;
};

export const getPickupRequests = async () => {
  const { data } = await api.get("/ngo/pickups");
  return data;
};

export const getNgoStats = async () => {
  const { data } = await api.get("/ngo/stats");
  return data;
};

export const getNgoProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateNgoProfile = async (updates) => {
  const { data } = await api.patch("/users/me", updates);
  return data;
};