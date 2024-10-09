export const API_BASE_URL = 'http://localhost:3001/api';

export const AUTH_ENDPOINTS = {
  SIGN_UP: `${API_BASE_URL}/auth/sign-up`,
  SIGN_IN: `${API_BASE_URL}/auth/sign-in`
};

export const DEALS_ENDPOINTS = {
  DEALS: `${API_BASE_URL}/deals`,
  ENROLL: `${API_BASE_URL}/deals/enroll`,
};
