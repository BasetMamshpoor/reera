import axios from "axios";
import {getSession} from "next-auth/react";

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
        if (typeof window !== 'undefined' && window.location.pathname) {
            const [, locale] = window.location.pathname.split('/')
            if (locale) config.headers['user-lan'] = locale
        }
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
 * @param {function} [options.onUploadProgress] - برای رصد پیشرفت آپلود
 * @param {Object} [options.cancelToken] - برای کنسل کردن درخواست
 *
 * @returns {Promise<any>} - داده‌ی پاسخ API
 */
export async function request
({
     url,
     method = 'get',
     data = null,
     query = {},
     headers = {},
     onUploadProgress,
     cancelToken
 }) {
    const response = await api.request({
        url,
        method,
        params: query,
        data,
        headers: {
            ...headers,
        },
        onUploadProgress,
        cancelToken
    })
    return response.data
}
