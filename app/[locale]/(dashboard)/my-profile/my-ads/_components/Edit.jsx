"use client";
import React, { useState } from "react";

import EditPropertyInformation from "./EditPropertyInformation";
import EditLocationFacilities from "./EditLocationFacilities";
import EditImage from "./EditImage";
import EditContactInformation from "./EditContactInformation";
import { FormProvider, useForm } from "react-hook-form";
import EditConditions from "./EditConditions";
import Plus from "@/assets/icons/add.svg";
import Arrow from "@/assets/icons/arrow-down.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const Edit = () => {
  const dic = useTranslation();
  const a = dic.public.profile.my_ads;

  const methods = useForm({
    defaultValues: {
      transactionType: "خرید و فروش",
      propertyType: "آپارتمان",
      area: "120",
      yearBuilt: "1380",
      numberOfFloors: "5",
      numberOfRooms: "2",
      country: "ترکیه",
      city: "استانبول",
      Region: "شیشیلی",
      address: "استانبول، شیشیلی، میدان سوم، کوچه باغی",
      facilities: [
        "elevator",
        "parking",
        "storage",
        "balcony_terrace",
        "cooling_system",
      ],
      residencyDate: "1404/02/29",
      images: [
        {
          id: 1,
          url: "/images/city-profile.jpg",
          isMain: true,
        },
        {
          id: 2,
          url: "/images/city-profile.jpg",
          isMain: false,
        },
      ],
      contactMethods: ["chat"],
      phoneNumber: "09123456789",
      currencyType: "لیره",
      totalPrice: "200000000",
      deposit: "1500000",
      payment_method: ["installments"],
      female_only: ["female_only"],
      rules: ["no_loud_parties", "no_smoking"],
    },
    mode: "onChange",
  });

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-10 lg:gap-16 px-4 lg:px-6 py-6 lg:py-10 w-full border border-default-divider rounded-2xl bg-surface">
          <EditPropertyInformation a={a} />

          <EditLocationFacilities a={a} />

          <EditImage a={a} />

          <EditContactInformation a={a} />

          <EditConditions a={a} />
          <div className="flex items-center justify-end w-full gap-6">
            <div className="flex items-center justify-center gap-1 py-2 px-8 border border-warning-main rounded-xl w-full md:w-fit text-warning-main text-base font-bold">
              <Arrow className="fill-warning-main -rotate-90" />
              <span className="pt-1">{a.previous}</span>
            </div>
            <div className="flex items-center justify-center gap-1 py-2 px-8 bg-Primary-400 border border-Primary-400 rounded-xl w-full md:w-fit text-white text-base font-bold">
              <span className="pt-1">{a.confirm_submit}</span>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Edit;
