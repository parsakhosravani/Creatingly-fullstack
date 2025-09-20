import axios from "axios";
import { SumRequest, SumResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const sumAPI = {
  calculateSum: async (request: SumRequest): Promise<SumResponse> => {
    try {
      const response = await api.post<SumResponse>("/api/sum", request);
      return response.data;
    } catch (error: any) {
      // Handle different error types
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        throw new Error("Network error - please check your connection");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  },

  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get("/health");
    return response.data;
  },
};

export default api;
