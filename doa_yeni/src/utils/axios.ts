import axios from "axios";
import { getSession } from "next-auth/react";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getSession();

    if (token) {
      config.headers.Authorization = `Bearer ${token.user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
