"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { request } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormContext } from "../../NewCategorySelector";
import { cn } from "@/lib/utils";
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
  title: z.string().min(1, "عنوان اگهی الزامی است"),
  brand: z.string().min(1, "برند آگهی الزامی است"),
  product_type: z.string().min(1, "نوع کالا را مشخص کنید"),
  type: z.enum(["ad", "request"]),
  kitchen_brand_id: z.number().nullable().optional(),
  kitchen_type_id: z.number().nullable().optional(),
});

const KitchenForm = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: adData?.first?.type || "ad",
    },
  });

  const { setCurrentStep, categoryID, kitchenTitle, setApiResponseData } =
    useContext(FormContext);
  const [brandOpen, setBrandOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  const dic = useTranslation();
  const k = dic.register_ad;
  const b = dic.register_ad;
  const info = dic.public.register_ad;

  const { data, isLoading } = useQuery({
    queryKey: ["kitchen"],
    queryFn: async () => {
      const response = await request({
        method: "GET",
        url: `/store/kitchen`,
      });
      return response;
    },
  });

  const KitchenMutation = useMutation({
    mutationFn: async (payload) =>
      await request({
        url: !isEditing
          ? "/store/kitchen/first"
          : `/update/kitchen/first/${adData?.first?.id}`,
        method: "post",
        data: payload,
      }),

    onSuccess: (data) => {
      if (!isEditing) {
        setApiResponseData(data?.data);
      }
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`failed to submit, try again ${err?.message}`);
    },
  });
  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  const onSubmit = (formData) => {
    const payload = {
      category_id: categoryID,
      ...formData,
    };
    console.log(payload);
    KitchenMutation.mutate(payload);
  };
  const requesterType = watch("type");
  useEffect(() => {
    if (adData?.first) {
      const first = adData.first;
      reset({
        title: first.title || "",
        brand: first.brand || "",
        product_type: first.product_type || "",
        type: first.type || "ad",
        kitchen_brand_id: first.kitchen_brand_id ?? null,
        kitchen_type_id: first.kitchen_type_id ?? null,
      });

      // Ensure both ID and name are reflected correctly
      if (first.kitchen_brand_id && data?.data?.brands) {
        const brand = data.data.brands.find(
          (b) => b.id === first.kitchen_brand_id
        );
        if (brand) setValue("brand", brand.name);
      }

      if (first.kitchen_type_id && data?.data?.models) {
        const model = data.data.models.find(
          (m) => m.id === first.kitchen_type_id
        );
        if (model) setValue("product_type", model.name);
      }
    }
  }, [adData, data, reset, setValue]);

  // Get current values for display
  const selectedBrand = watch("brand");
  const selectedType = watch("product_type");

  // Filter brands based on search
  const filteredBrands =
    data?.data?.brands?.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    ) || [];

  // Filter models based on search
  const filteredModels =
    data?.data?.models?.filter((model) =>
      model.name.toLowerCase().includes(typeSearch.toLowerCase())
    ) || [];

  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 w-full">
        <Input
          {...register("title")}
          defaultValue={kitchenTitle}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          placeholder={k.ad_title}
        />
        {errors.title && (
          <p className="text-error-main text-sm mt-1">{errors.title.message}</p>
        )}
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

      {/* Brand Selector */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium">برند</label>
        <Popover open={brandOpen} onOpenChange={setBrandOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={brandOpen}
              className="w-full justify-between py-6 rounded-xl"
            >
              {selectedBrand
                ? data?.data?.brands?.find(
                    (brand) => brand.name === selectedBrand
                  )?.name
                : k.select_brand}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-120 p-0">
            <Command>
              <CommandInput
                placeholder={k.search_brand}
                value={brandSearch}
                onValueChange={setBrandSearch}
              />
              <CommandList>
                <CommandEmpty>{k.no_brand_found}</CommandEmpty>
                <CommandGroup>
                  {filteredBrands.map((brand) => (
                    <CommandItem
                      key={brand.id}
                      value={brand.name}
                      onSelect={(currentValue) => {
                        setValue(
                          "brand",
                          currentValue === selectedBrand ? "" : currentValue
                        );
                        setBrandOpen(false);
                        setBrandSearch("");
                        setValue("kitchen_brand_id", brand.id);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedBrand === brand.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {brand.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.brand && (
          <p className="text-error-main text-sm mt-1">{errors.brand.message}</p>
        )}
      </div>

      {/* Product Type Selector */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium">{k.product_type}</label>
        <Popover open={typeOpen} onOpenChange={setTypeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={typeOpen}
              className="w-full justify-between py-6 rounded-xl"
            >
              {selectedType
                ? data?.data?.models?.find(
                    (model) => model.name === selectedType
                  )?.name
                : k.select_product_type}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-120 p-0">
            <Command>
              <CommandInput
                placeholder={k.search_product_type}
                value={typeSearch}
                onValueChange={setTypeSearch}
              />
              <CommandList>
                <CommandEmpty>{k.no_product_type_found}</CommandEmpty>
                <CommandGroup>
                  {filteredModels.map((model) => (
                    <CommandItem
                      key={model.id}
                      value={model.name}
                      onSelect={(currentValue) => {
                        setValue(
                          "product_type",
                          currentValue === selectedType ? "" : currentValue
                        );
                        setTypeOpen(false);
                        setTypeSearch("");
                        setValue("kitchen_type_id", model.id);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedType === model.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {model.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors.product_type && (
          <p className="text-error-main text-sm mt-1">
            {errors.product_type.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] hover:scale-[0.98] duration-100 transition-all w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {k.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
          disabled={KitchenMutation.isLoading}
        >
          <span className="text-alphaw-100">
            {KitchenMutation.isLoading ? k.sending : k.next}
          </span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default KitchenForm;
