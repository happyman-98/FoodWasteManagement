import api from "./axios";

export const loginUser = async ({ email, password, role }) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
    role: role.toLowerCase(),
  });
  return data;
};
export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};
const buildRegisterPayload = (formData) => {
  const ROLE_MAP = {
    "Individual Donor": "donor",
    "Restaurant / Hotel": "restaurant",
    "Farmer": "farmer",
    "NGO / Organisation": "ngo",
  };

  const base = {
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    city: formData.city,
    role: ROLE_MAP[formData.role],
    agreed: formData.terms,
  };

  switch (formData.role) {
    case "Individual Donor":
      return { ...base, name: `${formData.firstName} ${formData.lastName}`.trim() };
    case "Restaurant / Hotel":
      return { ...base, name: formData.businessName, fssaiNumber: formData.fssaiNumber };
    case "Farmer":
      return { ...base, name: formData.farmName };
    case "NGO / Organisation":
      return { ...base, name: formData.orgName, ngoRegNumber: formData.ngoRegNumber };
    default:
      return base;
  }
};