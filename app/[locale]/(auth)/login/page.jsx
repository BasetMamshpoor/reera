"use client";
import React from "react";

// import Login from "../_components/Login";
import GoogleLogin from "@/app/[locale]/(auth)/_components/GoogleLogin";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      {/*<Login />*/}
        <GoogleLogin />
    </div>
  );
};

export default Page;
