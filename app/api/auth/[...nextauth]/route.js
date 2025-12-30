// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const request = async ({ method, url, data }) => {
    const res = await fetch(`${process.env.API_BASE_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            // اگر API_KEY نیاز دارید
            // "Authorization": `Bearer ${process.env.API_KEY}`,
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
        maxAge: 30 * 24 * 60 * 60, // 30 روز
    },
    providers: [
        // 1. Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

        // 2. Email OTP Provider (برای ثبت‌نام/ورود با ایمیل + OTP)
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
                    // سعی می‌کنیم اول register، اگر نشد login
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

                        // اگر register جواب نداد، سعی می‌کنیم login
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

        // 3. Phone OTP Provider (برای ثبت‌نام/ورود با شماره + OTP)
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
                    // سعی می‌کنیم اول register، اگر نشد login
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

                        // اگر register جواب نداد، سعی می‌کنیم login
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

        // 4. Password Login Provider (برای ورود با ایمیل + رمز عبور)
        CredentialsProvider({
            id: "password-login",
            name: "Password Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("🔐 Password Login Authorize:", credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Missing email or password");
                    return null;
                }

                try {
                    const data = await request({
                        method: "POST",
                        url: "/auth/login-password", // فرض می‌کنیم این endpoint دارید
                        data: {
                            user: credentials.email.trim(),
                            password: credentials.password,
                        },
                    });

                    console.log("✅ Password Login Response:", data);

                    if (!data?.data?.token) {
                        console.log("❌ No token in password login response");
                        return null;
                    }

                    return {
                        id: data.data.user_id.toString(),
                        accessToken: data.data.token,
                        email: credentials.email.trim(),
                    };
                } catch (err) {
                    console.error("❌ Password Login error:", err.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            console.log("🔄 JWT Callback:", {
                token: token?.sub ? "Has token" : "No token",
                user: user ? "Has user" : "No user",
                account: account?.provider,
                trigger,
            });

            // اگر user جدید لاگین کرده
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.email = user.email || token.email;
                token.mobile = user.mobile || token.mobile;

                // اگر از Google آمده
                if (account?.provider === "google") {
                    token.email = user.email;
                    token.picture = user.image;
                }
            }

            // اگر session از client آپدیت شده
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }

            console.log("✅ Final JWT Token:", {
                id: token.id,
                email: token.email,
                mobile: token.mobile,
                hasToken: !!token.accessToken,
            });

            return token;
        },

        async session({ session, token }) {
            console.log("🔄 Session Callback:", {
                sessionEmail: session.user?.email,
                tokenId: token.id,
                tokenEmail: token.email,
            });

            session.user = {
                id: token.id,
                email: token.email,
                mobile: token.mobile,
                image: token.picture,
                name: token.name,
            };

            session.accessToken = token.accessToken;
            session.error = token.error;

            console.log("✅ Final Session:", {
                user: session.user,
                hasAccessToken: !!session.accessToken,
            });

            return session;
        },

        async redirect({ url, baseUrl }) {
            console.log("🔄 Redirect Callback:", { url, baseUrl });

            // اگر callbackUrl مشخص شده باشد
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }

            // اگر callbackUrl کامل باشد
            if (url.startsWith(baseUrl)) {
                return url;
            }

            // پیش‌فرض
            return baseUrl;
        },

        async signIn({ user, account, profile, email, credentials }) {
            console.log("🔓 SignIn Callback:", {
                user: user?.id,
                account: account?.provider,
                hasCredentials: !!credentials,
            });
            return true;
        },
    },
    pages: {
        signIn: "/auth",
        signOut: "/auth",
        error: "/auth/error",
        newUser: "/auth/new-user", // برای کاربران جدید
    },
    events: {
        async signIn(message) {
            console.log("🎉 User signed in:", message.user?.email);
        },
        async signOut(message) {
            console.log("👋 User signed out:", message.session?.user?.email);
        },
        async session(message) {
            console.log("📋 Session event:", message.session?.user?.email);
        },
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    useSecureCookies: process.env.NODE_ENV === "production",
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
});

export { handler as GET, handler as POST };