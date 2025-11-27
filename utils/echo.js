import Echo from "laravel-echo";
import { io } from "socket.io-client";
import { getSession } from "next-auth/react";

export async function initEcho() {
  if (typeof window === "undefined") return;

  window.io = io;

  // Get the JWT token from NextAuth
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) return;

  window.Echo = new Echo({
    broadcaster: "socket.io",
    host: `${process.env.NEXT_PUBLIC_REVERB_HOST}:${process.env.NEXT_PUBLIC_REVERB_PORT}`,
    client: io,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          })
            .then((res) => res.json())
            .then((data) => callback(false, data))
            .catch((err) => callback(true, err));
        },
      };
    },
  });

  return window.Echo;
}
