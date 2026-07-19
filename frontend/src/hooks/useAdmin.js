import { useState, useEffect, useCallback } from 'react'
import {
  getAdminStats,
  getAllUsers,
  updateAdminUser,
  deleteAdminUser,
  getAdminDonations,
  deleteAdminDonation,
  getAdminNgos,
  getAdminRestaurants,
  getAdminReports,
} from '../api/admin'

export const useAdminStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data))
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}

export const useAdminUsers = (initialQuery = {}) => {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState({ page: 1, limit: 20, q: '', role: '', status: '', ...initialQuery })

  const fetch = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAllUsers(query)
      setUsers(res.data.users)
      setTotal(res.data.total)
    } catch {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => { fetch() }, [fetch])

  const update = async (id, updates) => {
    const res = await updateAdminUser(id, updates)
    setUsers((prev) => prev.map((u) => (u._id === id ? res.data : u)))
  }

  const remove = async (id) => {
    await deleteAdminUser(id)
    setUsers((prev) => prev.filter((u) => u._id !== id))
    setTotal((t) => t - 1)
  }

  return { users, total, loading, error, query, setQuery, update, remove, refetch: fetch }
}

export const useAdminDonations = () => {
  const [donations, setDonations] = useState([])
  const [summary, setSummary] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState({ page: 1, limit: 20, status: '', category: '' })

  const fetch = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAdminDonations(query)
      setDonations(res.data.donations)
      setSummary(res.data.summary)
      setTotal(res.data.total)
    } catch {
      setError('Failed to load donations')
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => { fetch() }, [fetch])

  const remove = async (id) => {
    await deleteAdminDonation(id)
    setDonations((prev) => prev.filter((d) => d._id !== id))
  }

  return { donations, summary, total, loading, error, query, setQuery, remove, refetch: fetch }
}

export const useAdminNgos = () => {
  const [ngos, setNgos] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (q = '') => {
    setLoading(true)
    setError('')
    try {
      const res = await getAdminNgos({ q })
      setNgos(res.data.users)
      setTotal(res.data.total)
    } catch {
      setError('Failed to load NGOs')
    } finally {
      setLoading(false)
    }
  }

  return { ngos, total, loading, error, load }
}

export const useAdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (q = '') => {
    setLoading(true)
    setError('')
    try {
      const res = await getAdminRestaurants({ q })
      setRestaurants(res.data.users)
      setTotal(res.data.total)
    } catch {
      setError('Failed to load restaurants')
    } finally {
      setLoading(false)
    }
  }

  return { restaurants, total, loading, error, load }
}

export const useAdminReports = () => {
  const [reports, setReports] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminReports()
      .then((res) => setReports(res.data))
      .catch(() => setError('Failed to load reports'))
      .finally(() => setLoading(false))
  }, [])

  return { reports, loading, error }
}