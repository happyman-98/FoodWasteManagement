import { useState, useEffect, useCallback } from "react";
import {
  getAllDonations,
  getSavedDonations,
  removeSavedDonation,
  getPickupRequests,
  requestPickup,
  saveDonation,
  getNgoStats,
} from "../api/ngo";

export const useBrowseDonations = (activeFilter) => {
  const [donations, setDonations] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [donationsRes, savedRes] = await Promise.all([
        getAllDonations({ category: activeFilter }),
        getSavedDonations(),
      ]);
      setDonations(donationsRes.data?.donations || []);
      const ids = (savedRes.data?.saved || []).map((s) => s._id);
      setSavedIds(new Set(ids));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load donations");
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  const toggleSave = async (donationId) => {
    const isSaved = savedIds.has(donationId);
    setSavedIds((prev) => {
      const next = new Set(prev);
      isSaved ? next.delete(donationId) : next.add(donationId);
      return next;
    });

    try {
      if (isSaved) {
        await removeSavedDonation(donationId);
      } else {
        await saveDonation(donationId);
      }
    } catch (err) {
      setSavedIds((prev) => {
        const next = new Set(prev);
        isSaved ? next.add(donationId) : next.delete(donationId);
        return next;
      });
      setError(err.response?.data?.message || "Failed to update saved donation");
    }
  };

  const request = async (donationId) => {
    try {
      await requestPickup(donationId);
      await fetch();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request pickup");
    }
  };

  return { donations, savedIds, loading, error, toggleSave, request, refetch: fetch };
};

export const useSavedDonations = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getSavedDonations();
      setSaved(res.data?.saved || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load saved donations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const remove = async (donationId) => {
    try {
      await removeSavedDonation(donationId);
      setSaved((prev) => prev.filter((s) => s._id !== donationId && s.donationId !== donationId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove saved donation");
    }
  };

  const request = async (donationId) => {
    try {
      await requestPickup(donationId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request pickup");
    }
  };

  return { saved, loading, error, remove, request };
};

export const usePickupRequests = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPickupRequests();
      setPickups(res.data?.pickups || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pickup requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { pickups, loading, error, refetch: fetch };
};

export const useNgoStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getNgoStats();
        setStats(res.data);
      } catch {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { stats, loading, error };
};