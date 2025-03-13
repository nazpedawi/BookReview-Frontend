export const API_BASE_URL = "http://localhost";

export const API_ENDPOINTS = {
  books: `${API_BASE_URL}/books`,
  reviews: `${API_BASE_URL}/reviews`,
  genres: `${API_BASE_URL}/genres`,
  users: {
    signup: `${API_BASE_URL}/users/signup`,
    login: `${API_BASE_URL}/users/login`,
    me: `${API_BASE_URL}/users/me`,
  }
};
