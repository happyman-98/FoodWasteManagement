import api from './axios'

export const getAdminStats = async () => {
  const { data } = await api.get('/admin/stats')
  return data
}

export const getAllUsers = async ({ page = 1, limit = 20, q = '', role = '', status = '' } = {}) => {
  const params = new URLSearchParams({ page, limit })
  if (q) params.append('q', q)
  if (role) params.append('role', role)
  if (status) params.append('status', status)
  const { data } = await api.get(`/admin/users?${params}`)
  return data
}

export const updateAdminUser = async (id, updates) => {
  const { data } = await api.patch(`/admin/users/${id}`, updates)
  return data
}

export const deleteAdminUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}`)
  return data
}

export const getAdminDonations = async ({ page = 1, limit = 20, status = '', category = '' } = {}) => {
  const params = new URLSearchParams({ page, limit })
  if (status) params.append('status', status)
  if (category) params.append('category', category)
  const { data } = await api.get(`/admin/donations?${params}`)
  return data
}

export const deleteAdminDonation = async (id) => {
  const { data } = await api.delete(`/admin/donations/${id}`)
  return data
}

export const getAdminNgos = async ({ page = 1, limit = 20, q = '' } = {}) => {
  const params = new URLSearchParams({ page, limit })
  if (q) params.append('q', q)
  const { data } = await api.get(`/admin/ngos?${params}`)
  return data
}

export const getAdminRestaurants = async ({ page = 1, limit = 20, q = '' } = {}) => {
  const params = new URLSearchParams({ page, limit })
  if (q) params.append('q', q)
  const { data } = await api.get(`/admin/restaurants?${params}`)
  return data
}

export const getAdminReports = async () => {
  const { data } = await api.get('/admin/reports')
  return data
}