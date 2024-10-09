export const API_BASE_URL = "http://localhost:3001/api";

export const AUTH_ENDPOINTS = {
  SIGN_UP: `${API_BASE_URL}/auth/sign-up`,
};

export const DEALS_ENDPOINTS = {
  DEALS: `${API_BASE_URL}/deals`,
  ENROLL: `${API_BASE_URL}/deals/enroll`,
  CREATE: `${API_BASE_URL}/deals/create`,
  UPDATE: `${API_BASE_URL}/deals/update`,
  DELETE: `${API_BASE_URL}/deals/delete`,
};
