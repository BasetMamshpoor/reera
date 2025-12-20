"use client";
import React, {useContext, useEffect, useState} from "react";
import Arrow from "@/assets/icons/arrow-down.svg";
import {Input} from "@/components/ui/input";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {useQuery, useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useForm, Controller} from "react-hook-form";
import {FormContext} from "../../NewCategorySelector";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";

const DigitalForm = ({adData, isEditing = false}) => {
    const dic = useTranslation();
    const a = dic.public.register_ad.digital;
    const {setCurrentStep, setApiResponseData} = useContext(FormContext);
    const b = dic.register_ad;
    const info = dic.public.register_ad;
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            type: adData?.first?.ad && "ad",
        },
    });

    const {data: brandsData} = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            const res = await request({url: "/store/digital", method: "get"});
            return res.data.brands;
        },
    });
    const requesterType = watch("type");
    const handleRequesterTypeChange = (type) => {
        setValue("type", type);
    };
    const [selectedBrand, setSelectedBrand] = useState("");

    const {data: modelsData} = useQuery({
        queryKey: ["models", selectedBrand],
        queryFn: async () => {
            if (!selectedBrand) return [];
            const res = await request({
                url: "/store/digital",
                method: "get",
                query: {brand: selectedBrand},
            });
            return res.data.models;
        },
        enabled: !!selectedBrand,
    });

    const mutation = useMutation({
        mutationFn: async (formData) =>
            await request({
                url: !isEditing
                    ? "/store/digital/first"
                    : `/update/digital/first/${adData.first.id}`,
                method: "post",
                data: formData,
            }),

        onSuccess: (data) => {
            setCurrentStep((prev) => prev + 1);
            if (!isEditing) {
                setApiResponseData(data?.data);
            }
        },
        onError: (err) => toast.error(`ارسال فرم ناموفق بود! ${err?.message}`),
    });

    const {categoryID} = useContext(FormContext);
    useEffect(() => {
        if (isEditing && adData?.first && brandsData?.length) {
            const first = adData.first;

            // 1️⃣ Set selectedBrand before resetting
            const brandId = first.digital_brand_id
                ? String(first.digital_brand_id)
                : "";
            setSelectedBrand(brandId);

            // 2️⃣ Immediately reset partial data
            reset({
                title: first.title || "",
                brand: brandId,
                model: "", // wait for model data before setting this
                condition: first.condition || "",
                duration: first.view_time ? String(first.view_time) : "",
                type: first.type || "ad",
            });
        }
    }, [isEditing, adData, brandsData, reset]);

    // 3️⃣ After model data loads (because brand is now set)
    useEffect(() => {
        if (isEditing && adData?.first && modelsData?.length) {
            const first = adData.first;
            const modelId = first.digital_model_id
                ? String(first.digital_model_id)
                : "";

            reset((prev) => ({
                ...prev,
                model: modelId,
            }));
        }
    }, [isEditing, adData, modelsData, reset]);
    const onSubmit = (dataForm) => {
        const payload = {
            category_id: categoryID,
            title: dataForm.title,
            digital_brand_id: Number(dataForm.brand),
            digital_model_id: Number(dataForm.model),
            view_time: dataForm.duration,
            condition: dataForm.condition,
            type: dataForm.type,
        };
        mutation.mutate(payload);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between w-full h-screen lg:h-full bg-surface"
        >
            <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-6 lg:gap-y-10 w-full py-12 ltr:pl-12 ltr:pr-6 rtl:pr-12 rtl:pl-6">
                <div className="flex items-center gap-2 lg:col-span-2">
                    <Arrow className="!w-6 !h-6 fill-Primary-400 rotate-90 rtl:-rotate-90"/>
                    <p className="text-sm font-bold text-Primary-400 pt-1">{a.back}</p>
                </div>

                <div className="lg:col-span-2">
                    <Controller
                        name="title"
                        control={control}
                        rules={{required: a.enter_ad_title}}
                        render={({field}) => (
                            <Input
                                {...field}
                                placeholder={a.ad_title}
                                className={`w-full border-default-divider rounded-lg py-6 ${
                                    errors.title ? "border-error-main" : ""
                                }`}
                            />
                        )}
                    />
                    {errors.title && (
                        <p className="text-error-main text-xs mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div>
                    <Controller
                        name="brand"
                        control={control}
                        rules={{required: a.select_brand}}
                        render={({field}) => (
                            <Select
                                value={field.value}
                                onValueChange={(val) => {
                                    field.onChange(val);
                                    setSelectedBrand(val); // برای مدل‌ها
                                }}
                            >
                                <SelectTrigger
                                    className={`w-full border border-default-divider rounded-lg py-6 ${
                                        errors.brand ? "border-error-main" : ""
                                    }`}
                                >
                                    <SelectValue placeholder={a.brand}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {brandsData?.map((b) => (
                                            <SelectItem key={b.id} value={String(b.id)}>
                                                {b.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.brand && (
                        <p className="text-error-main text-xs mt-1">
                            {errors.brand.message}
                        </p>
                    )}
                </div>

                <div>
                    <Controller
                        name="model"
                        control={control}
                        rules={{required: a.select_model}}
                        render={({field}) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={!selectedBrand}
                            >
                                <SelectTrigger
                                    className={`w-full border border-default-divider rounded-lg py-6 ${
                                        errors.model ? "border-error-main" : ""
                                    }`}
                                >
                                    <SelectValue placeholder={a.model_type}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {modelsData?.map((m) => (
                                            <SelectItem key={m.id} value={String(m.id)}>
                                                {m.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.model && (
                        <p className="text-error-main text-xs mt-1">
                            {errors.model.message}
                        </p>
                    )}
                </div>

                <div>
                    <Controller
                        name="condition"
                        control={control}
                        rules={{required: a.select_product_condition}}
                        render={({field}) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger
                                    className={`w-full border border-default-divider rounded-lg py-6 ${
                                        errors.condition ? "border-error-main" : ""
                                    }`}
                                >
                                    <SelectValue placeholder={a.product_condition}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="new">{a.new}</SelectItem>
                                        <SelectItem value="almost_new">{a.almost_new}</SelectItem>
                                        <SelectItem value="used">{a.used}</SelectItem>
                                        <SelectItem value="needs_repair">
                                            {a.needs_repair}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.condition && (
                        <p className="text-error-main text-xs mt-1">
                            {errors.condition.message}
                        </p>
                    )}
                </div>

                {/* مدت نمایش */}
                <div>
                    <Controller
                        name="duration"
                        control={control}
                        rules={{required: a.select_ad_duration}}
                        render={({field}) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger
                                    className={`w-full border border-default-divider rounded-lg py-6 ${
                                        errors.duration ? "border-error-main" : ""
                                    }`}
                                >
                                    <SelectValue placeholder={a.ad_duration}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="7">{a.days_7}</SelectItem>
                                        <SelectItem value="30">{a.days_30}</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.duration && (
                        <p className="text-error-main text-xs mt-1">
                            {errors.duration.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="w-full flex items-center gap-4 lg:px-12 py-4">
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
                                <Warning className="fill-Primary-400"/>
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
                                <Warning className="fill-Primary-400"/>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className={`rtl:text-right`}>
                            {info.select_to_publish_ad}
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>

            <div className="flex flex-row items-center rounded-xl w-full justify-end gap-6 mt-auto py-6 px-4">
                <button
                    type="button"
                    className="py-2 lg:w-32 border-2 w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
                >
                    <p className="ltr:pt-1">{a.cancel}</p>
                </button>
                <button
                    type="submit"
                    className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32 rounded-lg"
                >
                    <span className="ltr:pt-1">{a.next}</span>
                    <Arrow className="fill-white rotate-90 ltr:-rotate-90"/>
                </button>
            </div>
        </form>
    );
};

export default DigitalForm;
