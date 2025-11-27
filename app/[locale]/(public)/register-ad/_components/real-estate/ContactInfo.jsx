import React, { useState, useContext } from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import ArrowRight from "@/assets/icons/arrow-right.svg";

import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { FormContext } from "../../NewCategorySelector";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

const ContactInfo = ({ apiUrl, isEditing, adData }) => {
  const { apiResponseData, setCurrentStep, slug } = useContext(FormContext);
  const [siteMessage, setSiteMessage] = useState(false);
  const [myPhone, setMyPhone] = useState(false);
  const [otherPhone, setOtherPhone] = useState(false);
  const [otherPhoneNumber, setOtherPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dic = useTranslation();
  const router = useRouter();
  const { locale } = useParams();
  const c = dic.public.register_ad.contact;
  const handleOtherPhoneClick = () => {
    setOtherPhone(!otherPhone);
    if (!otherPhone) {
      setMyPhone(false);
    }
  };

  const handleMyPhoneClick = () => {
    setMyPhone(!myPhone);

    if (!myPhone) {
      setOtherPhone(false);
    }
  };

  const ContactMutation = useMutation({
    mutationFn: async (data) => {
      if (!isEditing) {
        await request({
          url: apiUrl,
          method: "post",
          data,
        });
      } else {
        await request({
          url: `/update/${adData.slug}/fifth/${adData.first.id}`,
          method: "post",
          data,
        });
      }
    },

    onSuccess: () => {
      if (slug !== "visa") {
        setCurrentStep((prev) => prev + 1);
      } else {
        router.push(`/${locale}/register-ad/successfull-ad`);
      }
    },
    onError: (err) => {
      toast.error(`Failed to submit + ${err?.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ad_id: apiResponseData,
      site_massage: siteMessage,
      my_phone: myPhone,
      other_phone: otherPhone,
      other_phone_number: otherPhone ? otherPhoneNumber : null,
    };
    ContactMutation.mutate(payload);
  };

  return (
    <div className="bg-surface px-10 py-12 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
        <h2 className="text-lg font-medium mb-4">{c.contact_type}</h2>

        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            id="site_message"
            checked={siteMessage}
            onCheckedChange={(checked) => setSiteMessage(checked)}
          />
          <Label
            htmlFor="site_message"
            className="dark:text-white text-xs cursor-pointer"
          >
            {c.rira_chat}
          </Label>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            id="my_phone"
            checked={myPhone}
            onCheckedChange={handleMyPhoneClick}
          />
          <Label
            htmlFor="my_phone"
            className="dark:text-white text-xs cursor-pointer"
          >
            {c.call_number} 09128745954
          </Label>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            id="other_phone"
            checked={otherPhone}
            onCheckedChange={handleOtherPhoneClick}
          />
          <Label
            htmlFor="other_phone"
            className="dark:text-white text-xs cursor-pointer"
            onClick={handleOtherPhoneClick}
          >
            {c.call_other_number}
          </Label>
        </div>

        {otherPhone && (
          <div className="flex flex-col gap-2 mt-2">
            <Label className="dark:text-white text-xs">
              {c.call_other_number}
            </Label>
            <input
              type="text"
              value={otherPhoneNumber}
              onChange={(e) => setOtherPhoneNumber(e.target.value)}
              className="border rounded-lg p-2 bg-surface"
              placeholder="09121234567"
            />
          </div>
        )}

        <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-8">
          <button
            type="button"
            className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
          >
            {c.cancel}
          </button>
          <button
            type="submit"
            className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32 rounded-lg disabled:opacity-50"
          >
            <span className="text-alphaw-100">{c.next}</span>
            <ArrowRight className="fill-alphaw-100 rtl:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
