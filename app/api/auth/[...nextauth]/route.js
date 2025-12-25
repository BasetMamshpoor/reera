import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const request = async ({ method, url, data }) => {
    const res = await fetch(`${process.env.API_BASE_URL}${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
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
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "email-otp", // مهم!
            name: "Email OTP",
            credentials: {
                email: { label: "Email", type: "text" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.otp) return null;

                try {
                    const data = await request({
                        method: "POST",
                        url: "/auth/login",
                        data: {
                            email: credentials.email.trim(),
                            otp: credentials.otp.trim(),
                        },
                    });

                    if (!data?.data?.token) return null;

                    return {
                        id: data.data.user_id,
                        accessToken: data.data.token,
                    };
                } catch (err) {
                    console.error("Authorize error:", err.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = { id: token.id };
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };