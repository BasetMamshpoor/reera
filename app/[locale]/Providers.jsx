"use client";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";

const Providers = ({ children, dehydratedState, session }) => {
  const [queryClient] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          retry: 1,
        },
      },
    });

    // Only hydrate if dehydratedState exists
    if (dehydratedState) {
      hydrate(qc, dehydratedState);
    }

    return qc;
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
