import apiInstance from "./apiInstance.js";

class AuthService {
  constructor() {
    this.api = apiInstance;
  }

  signup(data) {
    return this.api.post("/auth/signup", data);
  }

  login(data) {
    return this.api.post(`/auth/login`, data);
  }

  verify(token) {
    return this.api.get(`/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  changePassword(userId, currentPassword, newPassword) {
    return this.api.put(`/auth/change-password/${userId}`, {
      currentPassword,
      newPassword,
    });
  }
}

const authService = new AuthService();

export default authService;
