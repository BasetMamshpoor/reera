import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

// Attach token from NextAuth session
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function request({
  url,
  method = "get",
  data = null,
  query = {},
  headers = {},
}) {
  const response = await api.request({
    url,
    method,
    params: query,
    data,
    headers,
  });
  return response.data;
}
