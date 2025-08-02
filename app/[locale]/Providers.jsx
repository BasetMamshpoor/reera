"use client";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";
import React, { useState } from "react";

const Providers = ({ children, dehydratedState }) => {
  const [queryClient] = useState(() => {
    const qc = new QueryClient();
    hydrate(qc, dehydratedState);
    return qc;
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default Providers;
