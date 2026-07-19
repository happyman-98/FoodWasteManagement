import api from "./axios";

export const createDonation = async (payload) => {
  const { data } = await api.post("/donations", payload);
  return data;
};

export const updateDonation = async (id, updates) => {
  const { data } = await api.patch(`/donations/${id}`, updates);
  return data;
};

export const getMyDonations = async ({ page = 1, limit = 10 } = {}) => {
  const { data } = await api.get(`/donations/my?page=${page}&limit=${limit}`);
  return data;
};

export const getFeaturedDonations = async (limit = 8) => {
  const { data } = await api.get(`/donations?page=1&limit=${limit}&status=Active`);
  return data;
};

export const getDonationById = async (id) => {
  const { data } = await api.get(`/donations/${id}`);
  return data;
};

export const deleteDonation = async (id) => {
  const { data } = await api.delete(`/donations/${id}`);
  return data;
};

export const updateProfile = async (updates) => {
  const { data } = await api.patch("/users/me", updates);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const uploadAvatar = async (formData) => {
  const { data } = await api.patch("/users/avatar", formData);
  return data;
};