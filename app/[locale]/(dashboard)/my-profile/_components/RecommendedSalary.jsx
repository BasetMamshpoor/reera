import {Input} from "@/components/ui/input";
import React from "react";
import {useTranslation} from "../../../TranslationContext";
import Tick from "@/assets/icons/tick-circle.svg";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useForm} from "react-hook-form";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";

const schema = z
    .object({
        min_salary: z.coerce.number().min(1, "حداقل حقوق الزامی است"),
        max_salary: z.coerce.number().min(1, "حداکثر حقوق الزامی است"),
    })
    .refine(
        (data) => {
            return data.min_salary <= data.max_salary;
        },
        {
            message: "حداقل حقوق باید کمتر یا مساوی با حداکثر حقوق باشد",
            path: ["min_salary"],
        }
    );

const RecommendedSalary = () => {
    const dic = useTranslation();
    const r = dic.consultor.edit;
    const s = dic.dashboard.myprofile.edit_information;

    const {data} = useQuery({
        queryKey: ["salary-profile"],
        queryFn: async () =>
            await request({
                url: "/profile/getSalaryRange",
            }),
    });

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            min_salary: data?.data?.min_salary || 0,
            max_salary: data?.data?.max_salary || 0,
        },
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) =>
            await request({
                url: "/profile/updateSalaryRange",
                method: "post",
                data,
            }),

        onSuccess: () => {
            toast.success("Your salary information has been successfully saved");
            queryClient.invalidateQueries(["salary-profile"]);
        },
        onError: (e) => {
            toast.error(`${e?.message} failed to update your salary`);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    // Reset form when data is loaded
    React.useEffect(() => {
        if (data?.data) {
            reset({
                min_salary: data.data.min_salary,
                max_salary: data.data.max_salary,
            });
        }
    }, [data?.data, reset]);

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full rtl:items-end"
        >
            <h2 className="text-lg font-semibold text-Gray-700">
                {s.enter_proposed_salary}
            </h2>

            <div className="flex items-center gap-4 w-full lg:flex-row flex-col">
                <div className="flex flex-col gap-2 w-full">
                    <Input
                        {...register("min_salary", {valueAsNumber: true})}
                        type={`number`}
                        placeholder={s.minimum_salary}
                        className={`rtl:placeholder:text-right py-5 rtl:text-right ${
                            errors.min_salary ? "border-error-main" : ""
                        }`}
                    />
                    {errors.min_salary && (
                        <p className="text-error-main text-sm mt-1">
                            {errors.min_salary.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Input
                        type={`number`}
                        {...register("max_salary", {valueAsNumber: true})}
                        placeholder={s.maximum_salary}
                        className={`rtl:placeholder:text-right py-5 rtl:text-right ${
                            errors.max_salary ? "border-error-main" : ""
                        }`}
                    />
                    {errors.max_salary && (
                        <p className="text-error-main text-sm mt-1">
                            {errors.max_salary.message}
                        </p>
                    )}
                </div>
            </div>

            {/*{hasErrors && (*/}
            {/*    <div className="bg-error-50 border border-error-200 rounded-lg p-4 w-full">*/}
            {/*        <ul className="list-disc list-inside space-y-1 text-error-600 rtl:text-right">*/}
            {/*            {Object.values(errors).map((error, index) => (*/}
            {/*                <li className="text-error-main" key={index}>*/}
            {/*                    {error.message}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}

            <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    <p>{r.save_information}</p>
                    {mutation.isPending ?
                        <Spinner size={20} color="white"/> :
                        <Tick className="fill-white dark:fill-black w-5 h-5"/>
                    }
                </button>
            </div>
        </form>
    );
};

export default RecommendedSalary;
