import { useState, useEffect, useCallback } from "react";
import { getMe, updateProfile } from "../api/donations";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMe();
      setProfile(res.data?.user || res.data || null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const save = async (updates) => {
    setSaving(true);
    setError("");
    try {
      const res = await updateProfile(updates);
      const updated = res.data?.user || res.data;
      setProfile((prev) => ({ ...prev, ...updated }));
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { profile, loading, saving, error, refetch: fetch, save };
};