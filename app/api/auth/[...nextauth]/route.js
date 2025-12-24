import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
            name: "Email OTP",
            credentials: {
                email: { label: "Email", type: "text" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                console.log("Authorize credentials:", credentials);
                try {
                    const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            otp: credentials?.otp,
                        }),
                    });

                    console.log("Authorize status:", res.status);
                    const data = await res.json();
                    console.log("Authorize data:", data);

                    if (!res.ok || !data?.data?.token) {
                        console.log("Authorize failed");
                        return null;
                    }

                    return {
                        id: data.data.user_id,
                        accessToken: data.data.token,
                    };
                } catch (err) {
                    console.error("Authorize error:", err);
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
        error: "/login", // redirect back to login on error
    },
    secret: process.env.NEXTAUTH_SECRET,
});

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
