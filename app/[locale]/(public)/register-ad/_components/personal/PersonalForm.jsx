import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { request } from "@/lib/api";
import { FormContext } from "../../NewCategorySelector";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی الزامی است"),
  gender: z.enum(["man", "woman"]),
  personal_type: z.string().min(1, "نوع کالا الزامی است"),
  type: z.enum(["ad", "request"]),
});

const PersonalForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "ad",
      gender: "man",
    },
  });
  const [personalOpen, setPersonalOpen] = useState(false);
  const [personalSearch, setPersonalSearch] = useState("");
  const [personalID, setPersonalID] = useState(null);
  const { setCurrentStep, categoryID, setApiResponseData } =
    useContext(FormContext);
  const requesterType = watch("type");
  const genderType = watch("gender");
  const selectedPersonal = watch("personal_type");
  const dic = useTranslation();
  const p = dic.register_ad;
  const b = dic.register_ad;
  const info = dic.public.register_ad;
  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  const handleGenderType = (type) => {
    setValue("gender", type);
  };

  const { data } = useQuery({
    queryKey: ["personal"],
    queryFn: async () =>
      await request({
        url: "/store/personal",
        method: "get",
      }),
  });
  const filteredPersonal =
    data?.data?.type?.filter((p) =>
      p.name.toLowerCase().includes(personalSearch.toLowerCase())
    ) || [];

  const PersonalFacilities = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/store/personal/first",
        method: "post",
        data,
      }),
    onSuccess: (data) => {
      setApiResponseData(data?.data);
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`failed to submit ${err?.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      category_id: categoryID,
      ...data,
      personal_ads_type_id: personalID,
    };
    PersonalFacilities.mutate(payload);
  };
  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-4">
        <Input
          {...register("title")}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          placeholder={p.ad_title}
        />

        {errors.title && (
          <p className="text-error-main text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium">{p.brand}</label>
        <Popover open={personalOpen} onOpenChange={setPersonalOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={personalOpen}
              className="w-full justify-between py-6 rounded-xl"
            >
              {selectedPersonal
                ? data?.data?.type?.find((p) => p.name === selectedPersonal)
                    ?.name
                : p.select_product_type}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-120 p-0">
            <Command>
              <CommandInput
                placeholder={p.search_product_type}
                value={personalSearch}
                onValueChange={setPersonalSearch}
              />
              <CommandList>
                <CommandEmpty>{p.no_product_type_found}</CommandEmpty>
                <CommandGroup>
                  {filteredPersonal.map((p) => (
                    <CommandItem
                      key={p.id}
                      value={p.name}
                      onSelect={(currentValue) => {
                        setValue(
                          "personal_type",
                          currentValue === selectedPersonal ? "" : currentValue
                        );
                        setPersonalOpen(false);
                        setPersonalSearch("");
                        setPersonalID(p.id);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedPersonal === p.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {p.name}
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
      <div className="w-full flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="gender"
            checked={genderType === "man"}
            onCheckedChange={(checked) => {
              if (checked) {
                handleGenderType("man");
              }
            }}
          />
          <Label htmlFor="man" className="cursor-pointer">
            {p.male}
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="woman"
            checked={genderType === "woman"}
            onCheckedChange={(checked) => {
              if (checked) {
                handleGenderType("woman");
              }
            }}
          />
          <Label htmlFor="woman" className="cursor-pointer">
            {p.female}
          </Label>
        </div>
      </div>
      <div className="w-full flex items-center gap-4 ">
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
      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] hover:scale-[0.98] duration-100 transition-all w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {p.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span className="text-alphaw-100">
            {PersonalFacilities.isLoading ? p.sending : p.next}
          </span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default PersonalForm;
