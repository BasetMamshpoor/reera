import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";
import gregoria_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregoria from "react-date-object/calendars/gregorian";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import NumberInput from "./NumberInput";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CountrySelect from "../../_components/common/CountrySelect";
import CitySelect from "../../_components/common/CitySelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormContext } from "../../NewCategorySelector";
import Warning from "@/assets/icons/warning.svg";

const schema = z
  .object({
    title: z.string().min(1, "عنوان الزامی است"),
    text: z.string().min(1, "توضیحات الزامی است"),
    luggage_weight: z.coerce.number().min(1, "وزن بار الزامی است"),
    price: z.coerce.number().min(1, "قیمت الزامی است"),
    departureDate: z
      .date()
      .min(new Date(), "تاریخ رفت نمی‌تواند در گذشته باشد"),
    returnDate: z.date().optional(),
    trip_way: z.string().min(1, "نوع سفر الزامی است"),
    currency_id: z.string().min(1, "ارز الزامی است"),
    type: z.enum(["ad", "request"]),
  })
  .refine(
    (data) => {
      if (data.returnDate && data.departureDate) {
        return data.returnDate >= data.departureDate;
      }
      return true;
    },
    {
      message: "تاریخ برگشت باید بعد از تاریخ رفت باشد",
      path: ["returnDate"],
    }
  );

const TripForm = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      luggage_weight: "",
      price: "",
      trip_way: "",
      currency_id: "",
      departureDate: null,
      returnDate: null,
      type: "ad",
    },
  });

  const dic = useTranslation();
  const d = dic.public.register_ad.trip;
  const c = dic.public.register_ad.contact;
  const s = dic.all_ads.sidebar;
  const l = dic.public.register_ad.location_form;
  const { locale } = useParams();
  const b = dic.register_ad;
  const info = dic.public.register_ad;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [siteMessage, setSiteMessage] = useState(false);
  const [myPhone, setMyPhone] = useState(false);
  const [otherPhone, setOtherPhone] = useState(false);
  const [otherPhoneNumber, setOtherPhoneNumber] = useState("");
  const { setCurrentStep, setApiResponseData, categoryID } =
    useContext(FormContext);
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");
  const selectedCountryId = watch("country_id");
  const selectedCityId = watch("city_id");
  const selectedCountryDestinationID = watch("country_destination_id");
  const selectedCityDestinationID = watch("city_destination_id");

  const { data: currenciesData } = useQuery({
    queryKey: ["currencies-data"],
    queryFn: async () => {
      const res = await request({ url: "/currency" });
      return res?.data || [];
    },
  });

  const mutation = useMutation({
    mutationFn: async (tripData) => {
      const res = await request({
        url: "/store/trip/first",
        method: "POST",
        data: tripData,
      });
      return res;
    },
    onSuccess: (data) => {
      toast.success("اطلاعات سفر با موفقیت ذخیره شد");
      if (!isEditing) {
        setApiResponseData(data?.data);
      }
      setCurrentStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error("خطا در ذخیره اطلاعات سفر");
      console.error("Error saving trip data:", error);
    },
  });

  const handleMyPhoneClick = () => {
    setMyPhone(!myPhone);
    if (!myPhone) {
      setOtherPhone(false);
    }
  };

  const handleOtherPhoneClick = () => {
    setOtherPhone(!otherPhone);
    if (!otherPhone) {
      setMyPhone(false);
    }
  };

  const getToday = () => {
    if (locale === "fa") {
      return new DateObject({ calendar: persian });
    } else {
      return new DateObject();
    }
  };

  const handleDepartureDateChange = (date) => {
    if (date) {
      const jsDate = date.toDate();
      setValue("departureDate", jsDate, { shouldValidate: true });
      if (returnDate && jsDate > returnDate) {
        setValue("returnDate", null, { shouldValidate: true });
      }
    } else {
      setValue("departureDate", null, { shouldValidate: true });
    }
  };

  const handleReturnDateChange = (date) => {
    if (date) {
      const jsDate = date.toDate();
      setValue("returnDate", jsDate, { shouldValidate: true });
    } else {
      setValue("returnDate", null, { shouldValidate: true });
    }
  };
  const requesterType = watch("type");
  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  const onSubmit = (data) => {
    const formatDate = (date) => {
      if (!date) return null;

      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    };

    const tripData = {
      category_id: categoryID,
      title: data.title,
      type: data.type,
      price: data.price,
      start_date: formatDate(data.departureDate),
      end_date: formatDate(data.returnDate),
      weight: data.luggage_weight,
      trip_way: data.trip_way,
      text: data.text,
      origin_country_id: selectedCountryId,
      origin_city_id: selectedCityId,
      destination_country_id: selectedCountryDestinationID,
      destination_city_id: selectedCityDestinationID,
      site_massage: siteMessage,
      my_phone: myPhone,
      other_phone: otherPhone,
      other_phone_number: otherPhone ? otherPhoneNumber : null,
      currencies_id: data.currency_id,
    };
    sessionStorage.setItem("price", data.price);
    sessionStorage.setItem("start_date", formatDate(data.departureDate));
    sessionStorage.setItem("end_date", formatDate(data.returnDate));

    mutation.mutate(tripData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-surface w-full p-6">
      <div className="flex flex-col gap-4 w-full">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            {d.title || "عنوان سفر"}
          </label>
          <Input
            {...register("title")}
            placeholder={d.title_placeholder || "عنوان سفر خود را وارد کنید"}
            className="w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Location Sections */}
        <div className="flex flex-col gap-4 lg:flex-row w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{d.where_are_you_now}</label>
            <CountrySelect
              value={selectedCountryId}
              onChange={(val) => {
                setValue("country_id", val, { shouldValidate: true });
                setValue("city_id", ""); // reset city
              }}
              label={l.location_country}
              translations={l}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">
              {d.where_are_you_traveling}
            </label>
            <CitySelect
              countryId={selectedCountryId}
              value={selectedCityId}
              onChange={(val) =>
                setValue("city_id", val, { shouldValidate: true })
              }
              label={l.location_city}
              translations={l}
            />
          </div>
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-4 lg:flex-row w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">
              {d.your_country_destionation}
            </label>
            <CountrySelect
              value={selectedCountryDestinationID}
              onChange={(val) => {
                setValue("country_destination_id", val, {
                  shouldValidate: true,
                });
                setValue("city_destination_id", "");
              }}
              label={l.location_country}
              translations={l}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">
              {d.your_city_destionation}
            </label>
            <CitySelect
              countryId={selectedCountryDestinationID}
              value={selectedCityDestinationID}
              onChange={(val) =>
                setValue("city_destination_id", val, { shouldValidate: true })
              }
              label={l.location_city}
              translations={l}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{d.departure_date}</label>
            <div className="relative w-full">
              <DatePicker
                multiple={false}
                inputClass="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                containerClassName="w-full"
                style={{ width: "100%" }}
                calendar={locale === "en" ? gregoria : persian}
                locale={locale === "en" ? gregoria_en : persian_fa}
                calendarPosition={
                  locale === "fa" ? "bottom-center" : "bottom-right"
                }
                zIndex={1000}
                value={departureDate}
                onChange={handleDepartureDateChange}
                minDate={getToday()}
                placeholder={d.select_departure_date}
                format={locale === "fa" ? "YYYY/MM/DD" : "YYYY/MM/DD"}
              />
            </div>
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {d.return_date_optional}
            </label>
            <div className="relative w-full">
              <DatePicker
                multiple={false}
                inputClass="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                containerClassName="w-full"
                style={{ width: "100%" }}
                calendar={locale === "en" ? gregoria : persian}
                locale={locale === "en" ? gregoria_en : persian_fa}
                calendarPosition={
                  locale === "fa" ? "bottom-center" : "bottom-right"
                }
                zIndex={1000}
                value={returnDate}
                onChange={handleReturnDateChange}
                minDate={departureDate || getToday()}
                placeholder={d.select_return_date}
                format={locale === "fa" ? "YYYY/MM/DD" : "YYYY/MM/DD"}
              />
            </div>
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.returnDate.message}
              </p>
            )}
          </div>
        </div>
        {/* Requester Type Checkboxes */}
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="request"
              checked={requesterType === "request"}
              onCheckedChange={(checked) =>
                checked && handleRequesterTypeChange("request")
              }
            />
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-Primary-700">{b.requester}</span>
                  <Warning className="fill-Primary-400" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className={`rtl:text-right`}>
                {info.select_to_be_requester}
              </HoverCardContent>
            </HoverCard>
            {/* <Label htmlFor="request" className="cursor-pointer">
              {r.requester}
            </Label> */}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="ad"
              checked={requesterType === "ad"}
              onCheckedChange={(checked) =>
                checked && handleRequesterTypeChange("ad")
              }
            />

            <HoverCard>
              <HoverCardTrigger>
                {" "}
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-Primary-700">{b.post_ad}</span>
                  <Warning className="fill-Primary-400" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className={`rtl:text-right`}>
                {info.select_to_publish_ad}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {/* Trip Way */}
        <div className="flex flex-col lg:flex-row gap-2 w-full">
          {/* Currency */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{d.currency || "ارز"}</label>
            <Select onValueChange={(value) => setValue("currency_id", value)}>
              <SelectTrigger className="w-full border border-default-divider rounded-lg">
                <SelectValue placeholder={d.select_currency || "انتخاب ارز"} />
              </SelectTrigger>
              <SelectContent>
                {currenciesData?.map((currency) => (
                  <SelectItem key={currency.id} value={currency.id.toString()}>
                    {currency.title} ({currency.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.currency_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currency_id.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">
              {d.trip_way || "نوع سفر"}
            </label>
            <Select onValueChange={(value) => setValue("trip_way", value)}>
              <SelectTrigger className="w-full border border-default-divider rounded-lg">
                <SelectValue
                  placeholder={d.select_trip_way || "انتخاب نوع سفر"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one_way">
                  {d.one_way || "یک طرفه"}
                </SelectItem>
                <SelectItem value="round_trip">
                  {d.round_trip || "رفت و برگشت"}
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.trip_way && (
              <p className="text-red-500 text-sm mt-1">
                {errors.trip_way.message}
              </p>
            )}
          </div>
        </div>

        {/* Price and Weight */}
        <div className="flex flex-col gap-4 lg:flex-row w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{d.price}</label>
            <NumberInput
              name="price"
              control={control}
              placeholder={d.desired_price}
              farsiDigits={locale === "fa"}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">{d.luggage_weight}</label>
            <NumberInput
              name="luggage_weight"
              control={control}
              placeholder={d.luggage_weight}
              farsiDigits={locale === "fa"}
              prefix={
                locale === "fa" ? (
                  <span className="text-gray-500">کیلوگرم</span>
                ) : (
                  <span className="text-gray-500">KG</span>
                )
              }
            />
            {errors.luggage_weight && (
              <p className="text-red-500 text-sm mt-1">
                {errors.luggage_weight.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <h2 className="text-lg font-medium mb-2">{c.contact_type}</h2>

        <div className="flex flex-col gap-3">
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
            >
              {c.call_other_number}
            </Label>
            {otherPhone && (
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  value={otherPhoneNumber}
                  onChange={(e) => setOtherPhoneNumber(e.target.value)}
                  className="border rounded-lg p-2 bg-surface flex-1"
                  placeholder="09121234567"
                />
              </div>
            )}
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            {d.description || "توضیحات"}
          </label>
          <Textarea
            {...register("text")}
            placeholder={
              d.description_placeholder || "توضیحات سفر خود را وارد کنید"
            }
            className="w-full min-h-[100px]"
          />
          {errors.text && (
            <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? "در حال ذخیره..." : d.register_travel_info}
      </button>
    </form>
  );
};

export default TripForm;
