import { useState, useEffect, useCallback } from "react";
import {
  getMyDonations,
  deleteDonation,
  getDonationById,
  createDonation,
  updateDonation,
} from "../api/donations";

export const useDonations = (id) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [donation, setDonation] = useState(null);
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationError, setDonationError] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyDonations();
      setDonations(res.data?.donations || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load donations");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOne = useCallback(async (donationId) => {
    if (!donationId) return;
    setDonationLoading(true);
    setDonationError("");
    try {
      const res = await getDonationById(donationId);
      setDonation(res.data || null);
    } catch (err) {
      setDonationError(err.response?.data?.message || "Failed to load donation");
    } finally {
      setDonationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchOne(id);
    } else {
      fetch();
    }
  }, [id, fetch, fetchOne]);

  const remove = async (donationId) => {
    try {
      await deleteDonation(donationId);
      setDonations((prev) => prev.filter((d) => d._id !== donationId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete donation");
    }
  };

  const create = async (payload) => {
    try {
      const res = await createDonation(payload);
      const newDonation = res.data?.donation || res.data;
      if (newDonation) {
        setDonations((prev) => [newDonation, ...prev]);
      }
      return newDonation;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create donation");
      throw err;
    }
  };

  const update = async (donationId, updates) => {
    try {
      const res = await updateDonation(donationId, updates);
      const updated = res.data?.donation || res.data;
      setDonations((prev) =>
        prev.map((d) => (d._id === donationId ? { ...d, ...updated } : d))
      );
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update donation");
      throw err;
    }
  };

  return {
    donations, loading, error, refetch: fetch, remove, create, update,
    donation, donationLoading, donationError, refetchOne: fetchOne,
  };
};