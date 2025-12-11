import {Textarea} from "@/components/ui/textarea";
import {request} from "@/lib/api";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import React, {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import z from "zod";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import {FormContext} from "../../NewCategorySelector";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const schema = z.object({
    description: z.string().min(1, "توضیحات الزامی است"),
});

const BusinessFacilities = ({isEditing, adData}) => {
    const dic = useTranslation();
    const b = dic.register_ad;
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            description: isEditing ? adData?.third?.description : "",
        },
    });

    const {setCurrentStep, apiResponseData} = useContext(FormContext);
    const mutation = useMutation({
        mutationFn: async (data) => {
            if (!isEditing) {
                await request({
                    url: "/store/business/third",
                    method: "post",
                    data,
                });
            } else {
                await request({
                    url: `/update/business/third/${adData?.first.id}`,
                    method: "post",
                    data,
                });
            }
        },

        onSuccess: () => {
            setCurrentStep((prev) => prev + 1);
        },
        onError: (err) => {
            toast.error(`خطایی رخ داد` || err);
        },
    });

    const onSubmit = (data) => {
        const payload = {ad_id: apiResponseData, ...data};
        mutation.mutate(payload);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
        >
            <Textarea
                {...register("description")}
                className="rtl:placeholder:text-right p-4"
                placeholder={b.description}
            />
            {errors.description && (
                <p className="text-error-main text-md">{errors.description.message}</p>
            )}

            {/* buttons */}
            <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
                <button
                    type="button"
                    className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
                >
                    {b.cancel}
                </button>
                <button
                    type="submit"
                    className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
                >
                    <span>{mutation.isLoading ? b.sending : b.next}</span>
                    <Arrowleft className="fill-alphaw-100 ltr:rotate-180"/>
                </button>
            </div>
        </form>
    );
};

export default BusinessFacilities;
