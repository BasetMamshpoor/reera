"use client";
import React, {useState, useEffect} from "react";
import Tick from "@/assets/icons/tick-circle.svg";
import {useTranslation} from "../../../TranslationContext";

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import Spinner from "@/components/Spinner";
import {useParams} from "next/navigation";

const ResidencyState = () => {
    const dic = useTranslation();
    const c = dic.consultor.edit;
    const {locale} = useParams()
    const {handleSubmit} = useForm({});
    const queryClient = useQueryClient();

    const [selectedOption, setSelectedOption] = useState("");

    const options = [
        {id: "option1", value: "permanent", label: c.permanent_resident},
        {id: "option2", value: "temporary", label: c.new_resident},
        {id: "option3", value: "student", label: c.student},
        {id: "option4", value: "asylum_seeker", label: c.refugee},
        {id: "option5", value: "other", label: c.other},
    ];

    const {data, isLoading} = useQuery({
        queryKey: ["residency-profile"],
        queryFn: async () =>
            await request({
                url: "/profile/getResidencyStatus",
            }),
    });

    // Set default value when data is loaded
    useEffect(() => {
        if (data?.data?.residency_status) {
            setSelectedOption(data.data.residency_status);
        }
    }, [data]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const mutation = useMutation({
        mutationFn: async (data) =>
            await request({
                url: "/profile/updateResidencyStatus",
                method: "post",
                data,
            }),
        onSuccess: () => {
            toast.success("Your Residency information has been saved");
            queryClient.invalidateQueries(["residency-profile"]);
        },
        onError: (e) => {
            toast.error(`${e?.message} Failed to Update`);
        },
    });

    const onSubmit = (data) => {
        const payload = {
            ...data,
            residency_status: selectedOption,
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full h-full "
        >
            <div
                dir={locale === "fa" ? "rtl" : locale === "en" && "ltr"}
                className="grid grid-cols-2 lg:grid-cols-3 items-center w-full">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`flex items-center gap-3 p-4 rounded-lg  transition-all duration-200 cursor-pointer`}
                        onClick={() => setSelectedOption(option.value)}
                    >
                        <div className="flex items-center h-5">
                            <input
                                id={option.id}
                                name="radio-group"
                                type="radio"
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={handleOptionChange}
                                className="w-4 h-4 text-indigo-600  focus:ring-indigo-500 cursor-pointer"
                            />
                        </div>
                        <label
                            htmlFor={option.id}
                            className=" block text-Gray-700 cursor-pointer select-none"
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex gap-2 items-center justify-center max-w-48 w-full px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    <p className="pt-1">{c.save_information}</p>
                    {mutation.isPending ?
                        <Spinner size={20} color="white"/> :
                        <Tick className="fill-white dark:fill-black w-5 h-5"/>
                    }
                </button>
            </div>
        </form>
    );
};

export default ResidencyState;
