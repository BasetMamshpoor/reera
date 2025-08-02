// lib/api.js
import axios from "axios";

// 1. baseURL از متغیر محیطی
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 2. ساخت یک Axios instance پایه
const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

// 3. interceptor برای افزودن Authorization و user_lan
api.interceptors.request.use(
  (config) => {
    // افزدون توکن JWT در Heder
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    // استخراج locale از URL و افزودن به user_lan
    // if (typeof window !== 'undefined' && window.location.pathname) {
    //     const [, locale] = window.location.pathname.split('/')
    //     if (locale) config.headers['user_lan'] = locale
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * تابع اصلی ارسال درخواست
 *
 * @param {Object} options
 * @param {string} options.url
 * @param {'get'|'post'|'put'|'delete'} [options.method='get']
 * @param {Object|FormData|null} [options.data=null]
 * @param {Object} [options.query={}]
 * @param {Object} [options.headers={}]
 *
 * @returns {Promise<any>} - داده‌ی پاسخ API
 */
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
    headers: {
      ...headers,
    },
  });
  return response.data;
}
