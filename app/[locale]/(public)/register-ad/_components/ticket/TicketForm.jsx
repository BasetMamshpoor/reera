"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormContext } from "../../NewCategorySelector";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { request } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gregoria_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregoria from "react-date-object/calendars/gregorian";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی الزامی است"),
  number: z.string().min(1, "تعداد بلیت الزامی است"),
  date: z.date(),

  type: z.enum(["ad", "request"]),
});
const TicketForm = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "ad",
      date: null,
    },
  });
  const [ticketOpen, setTicketOpen] = useState(false);
  const params = useParams();
  const locale = params.locale;
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketID, setTicketID] = useState(null);
  const { setApiResponseData, setCurrentStep, categoryID } =
    useContext(FormContext);
  const { data } = useQuery({
    queryKey: ["ticket"],
    queryFn: async () =>
      await request({
        url: "/store/ticket",
        method: "get",
      }),
  });
  const dic = useTranslation();
  const t = dic.register_ad;
  const b = dic.register_ad;
  const info = dic.public.register_ad;

  const selectedTicket = watch("ticket");
  const requesterType = watch("type");
  const ticketDate = watch("date");

  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const dateObj = new DateObject(date);
    if (locale === "fa") {
      dateObj.convert(persian);
      return dateObj.format("YYYY/MM/DD");
    }
    return dateObj.format("YYYY/MM/DD");
  };
  const TicketMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/ticket/first"
          : `/update/ticket/first/${adData.first.id}`,
        method: "post",
        data,
      }),

    onSuccess: (data) => {
      if (!isEditing) {
        setApiResponseData(data?.data);
      }
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`failed to submit ${err?.message}`);
    },
  });
  const handleDateChange = (date) => {
    if (date) {
      setValue("date", date.toDate());
    } else {
      setValue("date", null);
    }
  };
  const filteredTicket =
    data?.data?.type?.filter((t) =>
      t.name.toLowerCase().includes(ticketSearch.toLowerCase())
    ) || [];
  const onSubmit = (data) => {
    const payload = {
      category_id: categoryID,
      ticket_type_id: ticketID,
      ...data,
    };
    const dateObj = new DateObject(data.date);
    const gregorianDate = dateObj.convert(gregoria);
    payload.date = gregorianDate.format("YYYY-MM-DD");
    console.log(payload);
    TicketMutation.mutate(payload);
  };
  useEffect(() => {
    if (isEditing && adData?.first && data?.data?.type?.length) {
      const first = adData?.first;
      let deliveryDate = null;
      if (first.date) {
        deliveryDate = new Date(first.date);
      }
      reset({
        title: first?.title || "",
        type: first?.ad || "ad",
        date: deliveryDate || "",
        number: first?.number || "",
      });
    }
  }, [reset, adData, isEditing, data]);

  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col w-full gap-4">
          <Input
            {...register("title")}
            className={`focus:placeholder:opacity-0 py-6 rounded-xl`}
            placeholder={t.ad_title}
          />
          {errors.title && (
            <p className="text-error-main text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Select onValueChange={(val) => setValue("number", val)}>
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={t.ticket_count} />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.number && (
            <p className="text-error-main text-sm mt-1">
              {errors.number.message}
            </p>
          )}
        </div>

        {/* FIXED: Conditional Date Picker - Single Date */}

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium dark:text-white">
            {t.delivery_date}
          </label>
          <div className="relative w-full">
            <DatePicker
              multiple={false}
              inputClass="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              containerClassName="w-full"
              style={{
                width: "100%",
              }}
              calendar={locale === "en" ? gregoria : persian}
              locale={locale === "en" ? gregoria_en : persian_fa}
              calendarPosition={
                locale === "fa" ? "bottom-center" : "bottom-right"
              }
              zIndex={1000}
              value={ticketDate ? new DateObject(ticketDate) : null}
              onChange={handleDateChange}
              render={(value, openCalendar) => (
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formatDateForDisplay(value)}
                    onClick={openCalendar}
                    placeholder={t.select_delivery_date}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer pr-10"
                  />
                </div>
              )}
            />
          </div>
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium">{t.brand}</label>
          <Popover open={ticketOpen} onOpenChange={setTicketOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={ticketOpen}
                className="w-full justify-between py-6 rounded-xl"
              >
                {selectedTicket
                  ? data?.data?.type?.find((t) => t.name === selectedTicket)
                      ?.name
                  : t.select_ticket_type}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-120 p-0">
              <Command>
                <CommandInput
                  placeholder={t.search_ticket}
                  value={ticketSearch}
                  onValueChange={setTicketSearch}
                />
                <CommandList>
                  <CommandEmpty>{t.no_ticket_found}</CommandEmpty>
                  <CommandGroup>
                    {filteredTicket.map((t) => (
                      <CommandItem
                        key={t.id}
                        value={t.name}
                        onSelect={(currentValue) => {
                          setValue(
                            "ticket",
                            currentValue === selectedTicket ? "" : currentValue
                          );
                          setTicketOpen(false);
                          setTicketSearch("");
                          setTicketID(t.id);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTicket === t.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {t.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.personal_type && (
            <p className="text-error-main text-sm mt-1">
              {errors.personal_type.message}
            </p>
          )}
        </div>
        {/* Requester Type Checkboxes */}
        <div className="w-full flex items-center gap-4 py-4">
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
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] hover:scale-[0.98] duration-100 transition-all w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span>{TicketMutation.isLoading ? t.sending : t.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
