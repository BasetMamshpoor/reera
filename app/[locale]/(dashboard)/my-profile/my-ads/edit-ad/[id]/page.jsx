"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { categoryFlows } from "@/app/[locale]/(public)/register-ad/categoryFlow";
import { request } from "@/lib/api";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { FormContext } from "@/app/[locale]/(public)/register-ad/NewCategorySelector";

export default function EditAdPage() {
  const { id } = useParams();
  const [adData, setAdData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [apiSlug, setApiSlug] = useState(null);

  // ✅ Load slug safely from localStorage
  useEffect(() => {
    const storedSlug = localStorage.getItem("slug");
    if (storedSlug) {
      try {
        setApiSlug(JSON.parse(storedSlug));
      } catch (err) {
        console.error("Invalid slug in localStorage:", err);
      }
    }
  }, []);

  // ✅ Fetch only when slug exists
  const { data, isLoading } = useQuery({
    queryKey: ["edit-ad", apiSlug],
    queryFn: async () =>
      await request({
        url: `/update/${apiSlug}/${id}`,
        method: "get",
      }),
    enabled: !!apiSlug,
  });

  useEffect(() => {
    if (data?.data) {
      setAdData(data.data);
      // optional: update slug if necessary
      setApiSlug(data.data.slug);
    }
  }, [data]);

  if (isLoading || !adData || !apiSlug)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  const flow = categoryFlows[apiSlug];
  if (!flow) return <p className="text-center mt-10">Invalid category slug</p>;

  const Step = flow[currentStep - 1]?.component;
  const props = flow[currentStep - 1]?.props || {};

  return (
    <FormContext.Provider
      value={{
        setCurrentStep,
        setApiResponseData: setAdData,
      }}
    >
      <div className="max-w-[1024px] mx-auto h-180 mt-10">
        <Step
          {...props}
          adData={adData}
          setAdData={setAdData}
          setCurrentStep={setCurrentStep}
          isEditing
        />
      </div>
    </FormContext.Provider>
  );
}
