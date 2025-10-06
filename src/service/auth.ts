import { getEndpoints } from "../config/config";
import { ApiError, fetchJSON } from "../helper/api-err";

export interface User {
  id: string;
  name: string;
  email: string;
  img: string;
  // level: number
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OtpResponse {
  email: string;
  otpExpiry: string;
}

const AuthService = {
  async register(name: string, email: string): Promise<User> {
    const { auth } = getEndpoints();
    const res = await fetch(`${auth}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const json = await res.json();

    if (!res.ok) {
      const errorMessage =
        json?.message || json?.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }

    return json.data;
  },

  async requestOtp(email: string): Promise<OtpResponse> {
    const { auth } = getEndpoints();
    const res = await fetch(`${auth}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        level: 1,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      const errorMessage =
        json?.message || json?.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }

    return json.data;
  },

  async verifyOtp(email: string, code: string): Promise<AuthResponse> {
    const { auth } = getEndpoints();
    const res = await fetch(`${auth}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, level: 1 }),
    });

    const json = await res.json();

    if (!res.ok) {
      const errorMessage =
        json?.message || json?.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }

    return json.data;
  },

  async getProfile(): Promise<User> {
    const { user } = getEndpoints();
    const token = localStorage.getItem("token") || "";
    try {
      const json = await fetchJSON<{ data: User }>(`${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return json.data;
    } catch (err) {
      throw err as ApiError;
    }
  },
};

export default AuthService;
