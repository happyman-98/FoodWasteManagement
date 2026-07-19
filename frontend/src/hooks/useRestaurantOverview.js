import { useState, useEffect, useCallback } from "react";
import { getRestaurantOverview } from "../api/restaurant";

export const useRestaurantOverview = (restaurantId) => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    setError("");
    try {
      const res = await getRestaurantOverview(restaurantId);
      setOverview(res.data?.overview || res.data || null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load restaurant overview");
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { overview, loading, error, refetch: fetch };
};