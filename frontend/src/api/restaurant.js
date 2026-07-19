import axiosInstance from "./axios"; // your existing shared axios instance

export const getRestaurantOverview = (restaurantId) =>
  axiosInstance.get(`/restaurant/${restaurantId}/overview`);