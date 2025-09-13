import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import Arrowleft from "@/assets/icons/arrow-left.svg";

// Zod schema
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی الزامی است"),
  area: z.coerce
    .number()
    .min(10, "حداقل مقدار متراژ ده متر است")
    .positive("متراژ باید عدد مثبت باشد"),
  year: z.coerce
    .number({
      invalid_type_error: "سال ساخت باید یک عدد باشد",
    })
    .int("سال ساخت باید عدد صحیح باشد"),
  number_of_bedrooms: z.string().min(1, "اتاق خواب را انتخاب کنید"),
  number_of_bathrooms: z.string().min(1, "سرویس بهداشتی را انتخاب کنید"),
});

export default function AdForm({ setCurrentStep, selectedCategory }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const mutation = useMutation({
  //   mutationFn: async (data) => {
  //     const res = await fetch("/api/form", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     setCurrentStep((prev) => prev + 1);
  //   },
  // });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      category_id: selectedCategory?.id, // ✅ Only pass the id as category_id
    };
    // send to api
    // mutation.mutate(data);
    console.log("User submitted data:", payload);
    // simulate sending to backend
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 500);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
    >
      <div className="flex flex-col gap-4 lg:gap-10">
        <div>
          <Input
            placeholder="عنوان آگهی"
            {...register("title")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
          />
          {errors.title && (
            <p className="text-error-main text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row w-full items-center gap-4">
          <div className="w-full">
            <Input
              type="number"
              className={`py-6 rounded-xl`}
              placeholder="متراژ"
              {...register("area")}
            />
            {errors.area && (
              <p className="text-error-main text-sm mt-1">
                {errors.area.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              type="text"
              className={`py-6 rounded-xl`}
              placeholder="سال ساخت"
              {...register("year")}
            />
            {errors.year && (
              <p className="text-error-main text-sm mt-1">
                {errors.year.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full items-center gap-4">
          <div className="w-full">
            <Select
              onValueChange={(val) => setValue("number_of_bedrooms", val)}
            >
              <SelectTrigger className="w-full py-6 rounded-xl">
                <SelectValue placeholder="تعداد اتاق خواب" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.number_of_bedrooms && (
              <p className="text-error-main text-sm mt-1">
                {errors.number_of_bedrooms.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Select
              onValueChange={(val) => setValue("number_of_bathrooms", val)}
            >
              <SelectTrigger className="w-full py-6 rounded-xl ">
                <SelectValue placeholder="تعداد سرویس بهداشتی" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.number_of_bathrooms && (
              <p className="text-error-main text-sm mt-1">
                {errors.number_of_bathrooms.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>بعدی</span>
          <Arrowleft className="fill-white ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
}
