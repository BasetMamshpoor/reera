import { request } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
const schema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  service: z.string().min(1, "تخصص را انتخاب کنید"),
  type: z.enum(["ad", "request"]),
});
const ServicesForm = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "ad",
    },
  });

  const { categoryID, setApiResponseData, setCurrentStep } =
    useContext(FormContext);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [servideID, setServiceID] = useState(null);
  const dic = useTranslation();
  const s = dic.register_ad;
  const b = dic.register_ad;
  const info = dic.public.register_ad;

  const ServicesMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/services/first"
          : `/update/services/first/${adData?.first.id}`,
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
      toast.error(`${err?.message} error occured`);
    },
  });
  const selectedService = watch("service");
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () =>
      await request({
        url: "/store/services",
        method: "get",
      }),
  });
  const requesterType = watch("type");
  // const selectedServiceID = watch("service_expertise_id");
  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  const filteredServices =
    data?.data?.type?.filter((s) =>
      s.name.toLowerCase().includes(serviceSearch.toLowerCase())
    ) || [];

  useEffect(() => {
    if (isEditing && adData?.first && data?.data?.type?.length) {
      const first = adData?.first;
      reset({
        title: first.title || "",
        type: first.type || "ad",
        service:
          data?.data?.type?.find((s) => s.id === first.service_expertise_id)
            ?.name || "",
      });
    }
  }, [reset, isEditing, adData]);

  const onSubmit = (data) => {
    const payload = {
      category_id: categoryID,
      ...data,
      service_expertise_id: servideID,
    };
    ServicesMutation.mutate(payload);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160"
    >
      <div className="w-full">
        <Input
          {...register("title")}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          placeholder={s.ad_title}
        />
      </div>

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

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium">{s.service_type}</label>
        <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={serviceOpen}
              className="w-full justify-between py-6 rounded-xl"
            >
              {selectedService
                ? data?.data?.type?.find((s) => s.name === selectedService)
                    ?.name
                : s.select_specialty}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-120 p-0">
            <Command>
              <CommandInput
                placeholder={s.search_specialty}
                value={serviceSearch}
                onValueChange={setServiceSearch}
              />
              <CommandList>
                <CommandEmpty>{s.no_specialty_found}</CommandEmpty>
                <CommandGroup>
                  {filteredServices.map((s) => (
                    <CommandItem
                      key={s.id}
                      value={s.name}
                      onSelect={(currentValue) => {
                        setValue(
                          "service",
                          currentValue === selectedService ? "" : currentValue
                        );
                        setServiceOpen(false);
                        setServiceSearch("");
                        setServiceID(s.id);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedService === s.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {s.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.service && (
          <p className="text-error-main text-sm mt-1">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] hover:scale-[0.98] duration-100 transition-all w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {s.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span>{ServicesMutation.isLoading ? s.sending : s.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default ServicesForm;
