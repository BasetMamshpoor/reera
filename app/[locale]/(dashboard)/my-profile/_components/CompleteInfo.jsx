import React, {useMemo, useEffect} from "react";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {useTranslation} from "../../../TranslationContext";
import {useParams} from "next/navigation";
import Tick from "@/assets/icons/tick-circle.svg";
import {useMutation, useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import Spinner from "@/components/Spinner";

const CompleteInfo = () => {
        const dic = useTranslation();
        const c = dic.dashboard.myprofile.edit_information;
        const params = useParams();
        const locale = params?.locale;
        const dir = locale === "fa" ? "rtl" : "ltr";

        const {data, isLoading} = useQuery({
            queryKey: ["attributes"],
            queryFn: async () =>
                await request({
                    url: "/profile/attributes",
                    method: "get",
                }),
        });

        const {
            formState: {errors, isSubmitting},
            watch,
            handleSubmit,
            setValue,
            reset,
        } = useForm({
            defaultValues: {
                sleepHabits: "",
                smokingStatus: "",
                eatingHabits: "",
                organization: "",
                noisePreference: "",
                petStatus: "",
            },
        });

        // Map API attribute values to form fields
        useEffect(() => {
            if (data?.data?.attributes) {
                const attributes = data.data.attributes;

                // Create a mapping from attribute values to form field values
                const attributeMap = {
                    organized: {field: "organization", value: "organized"},
                    quiet: {field: "noisePreference", value: "quiet"},
                    // Add more mappings as needed based on your API response values
                    earlyRiser: {field: "sleepHabits", value: "earlyRiser"},
                    nightOwl: {field: "sleepHabits", value: "nightOwl"},
                    smoker: {field: "smokingStatus", value: "smoker"},
                    nonSmoker: {field: "smokingStatus", value: "nonSmoker"},
                    homeCook: {field: "eatingHabits", value: "homeCook"},
                    eatsOut: {field: "eatingHabits", value: "eatsOut"},
                    notOrganized: {field: "organization", value: "notOrganized"},
                    loud: {field: "noisePreference", value: "loud"},
                    hasPets: {field: "petStatus", value: "hasPets"},
                    noPets: {field: "petStatus", value: "noPets"},
                };

                // Set form values based on API data
                attributes.forEach((attr) => {
                    const mapping = attributeMap[attr.value];
                    if (mapping) {
                        setValue(mapping.field, mapping.value);
                    }
                });
            }
        }, [data, setValue]);

        const mutation = useMutation({
            mutationFn: async (data) =>
                await request({
                    url: "/profile/update/attributes",
                    method: "post",
                    data,
                }),
            onSuccess: (data) => {
                toast.success(data?.message || "Updated Successfully");
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || err.message || `${err?.message} Failed to Update`);
            }
        });

        // Watch all form values
        const formValues = watch();

        // Handle checkbox changes
        const handleCheckboxChange = (group, value) => {
            setValue(group, formValues[group] === value ? "" : value);
        };

        const onSubmit = (formData) => {
            // Convert form values to attributes array matching API format
            const attributes = Object.entries(formData)
                .filter(([_, value]) => value !== "" && value !== undefined)
                .map(([_, value]) => value);

            const payload = {
                attributes,
            };

            mutation.mutate(payload);
        };
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Spinner/>
                </div>
            );
        }

        return (
            <div dir={dir} className="flex flex-col gap-6">
                <h2 className="text-Text-Secondary font-semibold text-lg">
                    {c.personal_characteristics}:
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-6 rtl:justify-start"
                >
                    <div className="grid grid-cols-2 w-full gap-6 max-w-lg">
                        {/* Sleep Habits */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.sleepHabits === "earlyRiser"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("sleepHabits", "earlyRiser")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.early_riser}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.sleepHabits === "nightOwl"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("sleepHabits", "nightOwl")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.night_owl}</Label>
                        </div>

                        {/* Smoking Status */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.smokingStatus === "smoker"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("smokingStatus", "smoker")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.smoker}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.smokingStatus === "nonSmoker"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("smokingStatus", "nonSmoker")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.non_smoker}</Label>
                        </div>

                        {/* Eating Habits */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.eatingHabits === "homeCook"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("eatingHabits", "homeCook")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.home_cook}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.eatingHabits === "eatsOut"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("eatingHabits", "eatsOut")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.eats_out}</Label>
                        </div>

                        {/* Organization */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.organization === "organized"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("organization", "organized")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.organized_person}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.organization === "notOrganized"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("organization", "notOrganized")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.not_too_organized}</Label>
                        </div>

                        {/* Noise Preference */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.noisePreference === "quiet"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("noisePreference", "quiet")
                                }
                                className="cursor-pointer transition-all duration-200  ease-in-out"
                            />
                            <Label>{c.quiet_space_lover}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.noisePreference === "loud"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("noisePreference", "loud")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.loud_music_lover}</Label>
                        </div>

                        {/* Pet Status */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.petStatus === "hasPets"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("petStatus", "hasPets")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.has_pets}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formValues.petStatus === "noPets"}
                                onCheckedChange={() =>
                                    handleCheckboxChange("petStatus", "noPets")
                                }
                                className="cursor-pointer transition-all duration-200 ease-in-out"
                            />
                            <Label>{c.no_pets}</Label>
                        </div>
                    </div>

                    <div className=" flex items-center gap-6 self-end">
                        <button
                            type="submit"
                            className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                            {isSubmitting || mutation.isPending ? (
                                <Spinner size="small"/>
                            ) : (
                                <>
                                    <p>{c.save_info}</p>
                                    <Tick className="fill-white dark:fill-black w-5 h-5"/>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
;

export default CompleteInfo;
