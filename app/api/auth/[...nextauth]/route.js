import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Email Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const res = await fetch(
                        `${process.env.API_BASE_URL}/auth/login-email`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    if (!res.ok) return null;

                    const data = await res.json();
                    if (!data?.data?.token) return null;

                    return {
                        id: data.data.user_id,
                        token: data.data.token,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.accessToken =
                    user.token || account?.access_token || null;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id || null,
            };
            session.accessToken = token.accessToken || null;
            return session;
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return `${baseUrl}/en`;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import TwitterProvider from "next-auth/providers/twitter";
// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET,
//       version: "2.0",
//     }),
//
//     CredentialsProvider({
//       name: "OTP Login",
//       credentials: {
//         mobile: { label: "Mobile", type: "text" },
//         otp: { label: "OTP Code", type: "text" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               mobile: credentials?.mobile,
//               otp: credentials?.otp,
//             }),
//           });
//
//           const data = await res.json();
//
//           if (!res.ok || !data?.data?.token) return null;
//
//           return {
//             id: data.data.user_id,
//             token: data.data.token,
//           };
//         } catch (err) {
//           console.error("Login error:", err);
//           return null;
//         }
//       },
//     }),
//   ],
//
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id || token.id;
//         token.accessToken =
//           user.token || account?.access_token || token.accessToken || null;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = { id: token.id || null };
//       session.accessToken = token.accessToken || null;
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // If the user tries to access a protected route, keep them there after login
//       if (url.startsWith("/")) return `${baseUrl}${url}`;
//
//       // ✅ Default: send them to your main page
//       return `${baseUrl}/en`;
//     },
//   },
//
//   secret: process.env.NEXTAUTH_SECRET,
// });
//
// export { handler as GET, handler as POST };
