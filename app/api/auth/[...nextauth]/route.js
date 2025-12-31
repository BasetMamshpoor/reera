// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const request = async ({ method, url, data }) => {
    const res = await fetch(`${process.env.API_BASE_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    const resData = await res.json();
    if (!res.ok) {
        throw new Error(resData?.message || "درخواست ناموفق بود");
    }
    return resData;
};

const handler = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // 1. Email OTP Provider
        CredentialsProvider({
            id: "email-otp",
            name: "Email OTP",
            credentials: {
                email: { label: "Email", type: "text" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                console.log("🔐 Email OTP Authorize:", credentials);

                if (!credentials?.email || !credentials?.otp) {
                    console.log("❌ Missing email or OTP");
                    return null;
                }

                try {
                    const data = await request({
                        method: "POST",
                        url: "/auth/register",
                        data: {
                            user: credentials.email.trim(),
                            otp: credentials.otp.trim(),
                        },
                    });

                    console.log("✅ Email Register Response:", data);

                    if (!data?.data?.token) {
                        console.log("❌ No token in register response, trying login");

                        const loginData = await request({
                            method: "POST",
                            url: "/auth/login",
                            data: {
                                user: credentials.email.trim(),
                                otp: credentials.otp.trim(),
                            },
                        });

                        if (!loginData?.data?.token) {
                            console.log("❌ No token in login response");
                            return null;
                        }

                        return {
                            id: loginData.data.user_id.toString(),
                            accessToken: loginData.data.token,
                            email: credentials.email.trim(),
                        };
                    }

                    return {
                        id: data.data.user_id.toString(),
                        accessToken: data.data.token,
                        email: credentials.email.trim(),
                    };
                } catch (err) {
                    console.error("❌ Email OTP Authorize error:", err.message);
                    return null;
                }
            },
        }),

        // 2. Phone OTP Provider
        CredentialsProvider({
            id: "phone-otp",
            name: "Phone OTP",
            credentials: {
                mobile: { label: "Mobile", type: "text" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                console.log("🔐 Phone OTP Authorize:", credentials);

                if (!credentials?.mobile || !credentials?.otp) {
                    console.log("❌ Missing mobile or OTP");
                    return null;
                }

                try {
                    const data = await request({
                        method: "POST",
                        url: "/auth/register",
                        data: {
                            user: credentials.mobile.trim(),
                            otp: credentials.otp.trim(),
                        },
                    });

                    console.log("✅ Phone Register Response:", data);

                    if (!data?.data?.token) {
                        console.log("❌ No token in register response, trying login");

                        const loginData = await request({
                            method: "POST",
                            url: "/auth/login",
                            data: {
                                user: credentials.mobile.trim(),
                                otp: credentials.otp.trim(),
                            },
                        });

                        if (!loginData?.data?.token) {
                            console.log("❌ No token in login response");
                            return null;
                        }

                        return {
                            id: loginData.data.user_id.toString(),
                            accessToken: loginData.data.token,
                            mobile: credentials.mobile.trim(),
                        };
                    }

                    return {
                        id: data.data.user_id.toString(),
                        accessToken: data.data.token,
                        mobile: credentials.mobile.trim(),
                    };
                } catch (err) {
                    console.error("❌ Phone OTP Authorize error:", err.message);
                    return null;
                }
            },
        }),

        // 3. Password Login Provider (ایمیل + رمز)
        CredentialsProvider({
            id: "password-login",
            name: "Password Login",
            credentials: {
                identifier: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("🔐 Password Login Authorize:", credentials);

                if (!credentials?.identifier || !credentials?.password) {
                    console.log("❌ Missing identifier or password");
                    return null;
                }

                try {
                    // استفاده از endpoint لاگین با رمز
                    const data = await request({
                        method: "POST",
                        url: "/auth/login",
                        data: {
                            user: credentials.identifier.trim(),
                            password: credentials.password,
                        },
                    });

                    console.log("✅ Password Login Response:", data);

                    if (!data?.data?.token) {
                        console.log("❌ No token in password login response");
                        return null;
                    }

                    const isEmail = credentials.identifier.includes('@');

                    return {
                        id: data.data.user_id.toString(),
                        accessToken: data.data.token,
                        email: isEmail ? credentials.identifier.trim() : null,
                        mobile: !isEmail ? credentials.identifier.trim() : null,
                    };
                } catch (err) {
                    console.error("❌ Password Login error:", err.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("🔄 JWT Callback - User:", user ? "Exists" : "None");

            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.email = user.email;
                token.mobile = user.mobile;
            }

            console.log("✅ Final JWT Token:", {
                id: token.id,
                email: token.email,
                mobile: token.mobile,
            });

            return token;
        },

        async session({ session, token }) {
            console.log("🔄 Session Callback - Token ID:", token.id);

            session.user = {
                id: token.id,
                email: token.email,
                mobile: token.mobile,
            };
            session.accessToken = token.accessToken;

            console.log("✅ Final session:", session.user);
            return session;
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        },
    },
    pages: {
        signIn: "/auth",
        error: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };