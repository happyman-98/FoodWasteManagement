import axiosInstance from "./axios"; // your existing shared axios instance

export const getRestaurantOverview = async (restaurantId) => {
  const { data } = await axiosInstance.get(`/restaurant/${restaurantId}/overview`);
  return data;
};