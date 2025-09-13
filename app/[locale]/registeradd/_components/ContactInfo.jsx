import React from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

// Define the form schema
const contactInfoSchema = z.object({
  site_message: z.boolean(),
  my_phone: z.boolean(),
  other_phone: z.boolean(),
  other_phone_number: z.string().optional(),
});

const ContactInfo = ({ setCurrentStep, adId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      site_message: false,
      my_phone: false,
      other_phone: false,
      other_phone_number: "",
    },
  });

  const otherPhoneChecked = watch("other_phone");

  const submitContactInfo = async (data) => {
    const payload = {
      ad_id: adId,
      site_massage: data.site_message,
      my_phone: data.my_phone,
      other_phone: data.other_phone,
      other_phone_number: data.other_phone ? data.other_phone_number : null,
    };

    // Commented out the API call and replaced with console.log
    console.log("Form data to be submitted:", payload);

    // const response = await fetch("/store/category/fifth", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to submit contact info");
    // }

    // return response.json();
    return Promise.resolve(payload); // Return a resolved promise with the payload
  };

  const mutation = useMutation({
    mutationFn: submitContactInfo,
    onSuccess: (data) => {
      console.log("Form submitted successfully:", data);
      setCurrentStep((prev) => prev + 1);
    },
    onError: (error) => {
      console.error("Error submitting contact info:", error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-surface px-10 py-12 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 h-full"
      >
        <h2>نوع ارتباط:</h2>

        <div className="flex flex-row gap-4 items-center">
          <Checkbox id="site_message" {...register("site_message")} />
          <Label htmlFor="site_message" className={`dark:text-white text-xs`}>
            پیام از چت ریرا
          </Label>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Checkbox id="my_phone" {...register("my_phone")} />
          <Label htmlFor="my_phone" className={`dark:text-white text-xs`}>
            تماس با شماره 09128745954
          </Label>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Checkbox id="other_phone" {...register("other_phone")} />
          <Label htmlFor="other_phone" className={`dark:text-white text-xs`}>
            تماس با شماره دیگر
          </Label>
        </div>

        {otherPhoneChecked && (
          <div className="flex flex-col gap-2">
            <Label className={`dark:text-white text-xs`}>شماره تماس دیگر</Label>
            <input
              type="text"
              {...register("other_phone_number")}
              className="border rounded-lg p-2 bg-Gray-700 dark:text-white"
              placeholder="09121234567"
            />
            {errors.other_phone_number && (
              <span className="text-error-main text-xs">
                {errors.other_phone_number.message}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
          <button
            type="button"
            className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warningborder-warning-main rounded-lg"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32 rounded-lg disabled:opacity-50"
          >
            <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span>
            <Arrowleft className="fill-white ltr:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
