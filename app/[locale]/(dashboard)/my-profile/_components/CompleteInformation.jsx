import React, {useEffect} from "react";
import Image from "next/image";
import Profile from "@/assets/icons/profile.svg";
import Gallery from "@/assets/icons/GalleryAdd.svg";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Tick from "@/assets/icons/tick-circle.svg";
import {useMutation, useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {useParams, useRouter} from "next/navigation";
import Spinner from "@/components/Spinner";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const schema = z.object({
    first_name: z.string().min(1, "نام خود را وارد کنید"),
    last_name: z.string().min(1, "نام خانوادگی خود را وارد کنید"),
    mobile: z.string().min(1, "شماره تماس ضروری است"),
    national_code: z.string().min(1, "کد ملی ضروری است"),
    language_id: z.number().optional(),
    nationality_id: z.number().optional(),
});

const CompleteInformation = ({
                                 preview,
                                 handleFileChange,
                                 CompleteInformationData,
                                 isLoading,
                             }) => {
    const router = useRouter();
    const {locale} = useParams();
    const dic = useTranslation();
    const c = dic.dashboard.myprofile.edit_information;

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            first_name: "",
            last_name: "",
            mobile: "",
            national_code: "",
            language_id: undefined,
            nationality_id: undefined,
        },
    });

    // Use useEffect to set form values when data is loaded
    useEffect(() => {
        if (CompleteInformationData?.data && !isLoading) {
            const data = CompleteInformationData.data;

            setValue("first_name", data.first_name || "");
            setValue("last_name", data.last_name || "");
            setValue("mobile", data.mobile || "");
            setValue("national_code", data.national_code || "");

            // Set select values if they exist
            if (data.language_id) {
                setValue("language_id", data.language_id);
            }
            if (data.nationality_id) {
                setValue("nationality_id", data.nationality_id);
            }
        }
    }, [CompleteInformationData, isLoading, setValue]);

    const mutation = useMutation({
        mutationFn: async (data) =>
            await request({
                url: "/profile/update",
                method: "post",
                data,
            }),
        onSuccess: (data) => {
            toast.success(data?.message || "Your profile has been saved");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message || `Failed to update: ${err?.message}`
        );
        },
    });

    const {data} = useQuery({
        queryFn: async () =>
            await request({
                url: "/info",
                method: "get",
            }),
    });

    const onSubmit = (data) => {
        console.log("Submitting data:", data);

        // Convert string values to numbers for IDs
        const payload = {
            ...data,
            language_id: data.language_id ? Number(data.language_id) : undefined,
            nationality_id: data.nationality_id
                ? Number(data.nationality_id)
                : undefined,
        };

        mutation.mutate(payload);
    };

    // Handle select changes properly - store the ID as number
    const handleLanguageChange = (value) => {
        setValue("language_id", Number(value), {shouldValidate: true});
    };

    const handleNationalityChange = (value) => {
        setValue("nationality_id", Number(value), {shouldValidate: true});
    };

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Spinner/>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full flex flex-col gap-4 rtl:items-end`}
        >
            <div className="flex flex-col gap-6 w-24 h-24 ">
                <div
                    className=" relative  flex items-center justify-center p-4 border border-[#D1D5DB] rounded-xl w-full h-full">
                    <div
                        className=" flex items-center justify-center rounded-full overflow-hidden bg-[#F6F6F7] w-full h-full ">
                        <Profile className="fill-gray-800 !w-10 !h-10"/>
                        <div
                            className="absolute bottom-4 right-4  flex p-1 items-center justify-center border bg-white border-[#D1D5DB] rounded-md">
                            <Gallery className=" !w-3 !h-3 fill-gray-800"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col items-center gap-6 w-full lg:rtl:flex-row-reverse">
                <div className="w-full">
                    <Input
                        id="name"
                        type="text"
                        {...register("first_name")}
                        placeholder={c.first_name}
                        className="rtl:text-right w-full rounded-xl px-3 py-5 text-sm lg:text-base"
                    />
                    {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.first_name.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <Input
                        id="last-name"
                        type="text"
                        {...register("last_name")}
                        placeholder={c.last_name}
                        className="rtl:text-right w-full rounded-xl px-3 py-5 text-sm lg:text-base"
                    />
                    {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.last_name.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex lg:flex-row rtl:flex-row-reverse flex-col items-center gap-6 w-full">
                <div className="w-full">
                    <Input
                        id="mobile"
                        type="text"
                        {...register("mobile")}
                        placeholder={c.mobile_number}
                        className="rtl:text-right w-full rounded-xl px-3 py-5 text-sm lg:text-base"
                    />
                    {errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <Input
                        id="national_code"
                        type="text"
                        {...register("national_code")}
                        placeholder={c.national_code}
                        className="rtl:text-right w-full rounded-xl px-3 py-5 text-sm lg:text-base"
                    />
                    {errors.national_code && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.national_code.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex lg:flex-row rtl:flex-row-reverse flex-col items-center gap-6 w-full">
                <div className="w-full">
                    <Select onValueChange={handleLanguageChange}>
                        <SelectTrigger
                            className="border py-5 border-default-divider cursor-pointer w-full rounded-xl px-3 text-gray-500 text-sm lg:text-base">
                            <SelectValue placeholder={c.language}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {data?.data?.languages?.map((language) => {
                                    return (
                                        <SelectItem
                                            key={language.id}
                                            value={language.id.toString()}
                                        >
                                            {language.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.language_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.language_id.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <Select onValueChange={handleNationalityChange}>
                        <SelectTrigger
                            className="w-full border cursor-pointer py-5 border-default-divider rounded-xl px-3 text-gray-500">
                            <SelectValue placeholder={c.nationality}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {data?.data?.nationalities?.map((nationality) => {
                                    return (
                                        <SelectItem
                                            key={nationality.id}
                                            value={nationality.id.toString()}
                                        >
                                            {nationality.title}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.nationality_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.nationality_id.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full rtl:items-end ">
                <p className="text-gray-700 dark:text-gray-300 text-base">
                    {c.upload_identification_document}
                </p>
                {preview ? (
                    <div className="relative flex items-center gap-6 w-full rtl:justify-end">
                        <div
                            className="flex items-center justify-center px-3 py-1 bg-[#DCFCE8] rounded-md text-sm text-[#16A34A]">
                            {c.verified}
                        </div>
                        <Image
                            src={preview}
                            alt="Preview"
                            width={176}
                            height={176}
                            unoptimized
                            className="rounded-md max-w-44 max-h-44"
                        />
                        <input
                            id="picture01"
                            type="file"
                            accept="image/*"
                            className="absolute w-full h-full top-0 bottom-0 text-transparent cursor-pointer"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <label
                        htmlFor="picture"
                        className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-[#374151] bg-[#F6F6F7] dark:bg-[#14181D] rounded-xl cursor-pointer overflow-hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-[#3498db]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4-4m0 0l4 4m-4-4v12"
                            />
                        </svg>
                        <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                )}
            </div>

            <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
                <button
                    type="submit"
                    disabled={isSubmitting || mutation.isPending}
                    className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    {isSubmitting || mutation.isPending ? (
                        <Spinner size="small"/>
                    ) : (
                        <>
                            <Tick className="fill-white dark:fill-black w-5 h-5"/>
                            <p>{c.save_info}</p>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default CompleteInformation;
