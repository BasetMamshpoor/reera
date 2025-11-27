"use client";
import React from "react";

const RemainingDays = ({ createdAt }) => {
    if (!createdAt) return null;

    const createdDate = new Date(createdAt);

    const expireDate = new Date(createdDate);
    expireDate.setDate(expireDate.getDate() + 30);

    const now = new Date();

    const diffTime = expireDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 0;

    return <>{diffDays}</>;
};

export default RemainingDays;
