import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";

import { toast } from "sonner";
const SignUp = () => {
  const FormMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "",
        method: "post",
        data,
      }),

    onSuccess: () => {
      sonner.toasts("Successfully loged in");
    },
    onError: (err) => {
      sonner.toasts(
        err?.response?.data?.message || err.message || "Upload failed"
      );
    },
  });
  return (
    <div className="bg-surface w-full h-full max-h-140 max-w-200 rounded-2xl border border-default-divider lg:p-8 p-4">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  );
};

export default SignUp;
