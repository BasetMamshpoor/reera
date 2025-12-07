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
                                 // profile props from parent
                                 profilePreview,
                                 setProfilePreview,
                                 profileFile,
                                 setProfileFile,
                                 handleProfileChange,

                                 // identity (document) props from parent
                                 identityPreview,
                                 setIdentityPreview,
                                 identityFile,
                                 setIdentityFile,
                                 handleIdentityChange,

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

    // set initial text/select values when data arrives
    useEffect(() => {
        if (CompleteInformationData?.data && !isLoading) {
            const data = CompleteInformationData.data;

            setValue("first_name", data.first_name || "");
            setValue("last_name", data.last_name || "");
            setValue("mobile", data.mobile || "");
            setValue("national_code", data.national_code || "");

            // select defaults
            if (data.language_id) setValue("language_id", data.language_id);
            if (data.nationality_id) setValue("nationality_id", data.nationality_id);

            // Note: previews are controlled in parent (EditInformation) — parent already set profilePreview/identityPreview from API
        }
    }, [CompleteInformationData, isLoading, setValue]);

    // mutation: send FormData (including files if present)
    const mutation = useMutation({
        mutationFn: async (formData) =>
            await request({
                url: "/profile/update",
                method: "post",
                headers: {"Content-Type": "multipart/form-data"},
                data: formData,
            }),
        onSuccess: (res) => {
            toast.success(res?.message || "اطلاعات با موفقیت ذخیره شد");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message || "خطا در ذخیره اطلاعات");
        },
    });

    const {data} = useQuery({
        queryFn: async () =>
            await request({
                url: "/info",
                method: "get",
            }),
    });

    const onSubmit = (formValues) => {
        // build FormData
        const formData = new FormData();

        formData.append("first_name", formValues.first_name || "");
        formData.append("last_name", formValues.last_name || "");
        formData.append("mobile", formValues.mobile || "");
        formData.append("national_code", formValues.national_code || "");

        if (formValues.language_id !== undefined && formValues.language_id !== null) {
            formData.append("language_id", String(formValues.language_id));
        }
        if (formValues.nationality_id !== undefined && formValues.nationality_id !== null) {
            formData.append("nationality_id", String(formValues.nationality_id));
        }

        // attach files only if user selected them (we use profileFile/identityFile from parent)
        if (profileFile) {
            formData.append("profile", profileFile);
        }
        if (identityFile) {
            formData.append("identity_document", identityFile);
        }
        mutation.mutate(formData);
    };

    // helper setters in case user selects file directly inside this component (we also accept parent handlers)
    const localHandleProfileChange = (e) => {
        // prefer parent's handler if provided
        if (handleProfileChange) {
            handleProfileChange(e);
            // parent sets profileFile and profilePreview
            return;
        }
        // otherwise, local fallback (not used since parent passes handler)
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile?.(file);
            const reader = new FileReader();
            reader.onloadend = () => setProfilePreview?.(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const localHandleIdentityChange = (e) => {
        if (handleIdentityChange) {
            handleIdentityChange(e);
            return;
        }
        const file = e.target.files?.[0];
        if (file) {
            setIdentityFile?.(file);
            const reader = new FileReader();
            reader.onloadend = () => setIdentityPreview?.(reader.result);
            reader.readAsDataURL(file);
        }
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
                        {/* show uploaded preview if user picked a new profile file,
                            else show backend profile url if exists, else icon */}
                        {profilePreview ? (
                            // profilePreview may be a data URL or a remote URL
                            <Image src={profilePreview} alt="profile" fill
                                   className="object-cover w-full h-full rounded-full"/>
                        ) : CompleteInformationData?.data?.profile ? (
                            <Image src={CompleteInformationData?.data?.profile} alt="profile" fill
                                   className="object-cover w-full h-full rounded-full"/>
                        ) : (
                            <Profile className="fill-gray-800 !w-10 !h-10"/>
                        )}

                        <div
                            className="absolute bottom-4 right-4  flex p-1 items-center justify-center border bg-white border-[#D1D5DB] rounded-md">
                            <Gallery className=" !w-3 !h-3 fill-gray-800"/>
                        </div>
                    </div>

                    {/* transparent input overlay for profile upload (same spot) */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={localHandleProfileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
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
                    <Select
                        onValueChange={(v) => setValue("language_id", Number(v))}>
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
                    <Select
                        onValueChange={(v) => setValue("nationality_id", Number(v))}
                    >
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
                <p className="text-Gray-700 text-base">
                    {c.upload_identification_document}
                </p>

                {/* identity document area - show user's selected preview first, else backend url, else upload placeholder */}
                {identityPreview ? (
                    <div className="relative flex items-center gap-6 w-full rtl:justify-end">
                        <div
                            className="flex items-center justify-center px-3 py-1 bg-[#DCFCE8] rounded-md text-sm text-[#16A34A]">
                            {c.verified}
                        </div>
                        <Image
                            src={identityPreview}
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
                            onChange={localHandleIdentityChange}
                        />
                    </div>
                ) : CompleteInformationData?.data?.identity_document ? (
                    <div className="relative flex items-center gap-6 w-full rtl:justify-end">
                        <div
                            className="flex items-center justify-center px-3 py-1 bg-[#DCFCE8] rounded-md text-sm text-[#16A34A]">
                            {c.verified}
                        </div>
                        <Image
                            src={CompleteInformationData.data.identity_document}
                            alt="identity_document"
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
                            onChange={localHandleIdentityChange}
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
                            onChange={localHandleIdentityChange}
                        />
                    </label>
                )}
            </div>

            <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
                <button
                    type="submit"
                    disabled={isSubmitting || mutation.isLoading}
                    className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    {isSubmitting || mutation.isLoading ? (
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
