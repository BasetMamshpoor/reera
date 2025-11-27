import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import Plus from "@/assets/icons/add.svg";
import Tick from "@/assets/icons/tick-circle.svg";
import { useTranslation } from "../../../TranslationContext";
import Minus from "@/assets/icons/Minus.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

const WorkingHistory = () => {
  const dic = useTranslation();
  const w = dic.consultor.edit;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["working-history"],
    queryFn: async () =>
      await request({
        url: "/profile/getWorkExperiences",
      }),
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({});

  const [workHistories, setWorkHistories] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Initialize workHistories with API data when it loads
  useEffect(() => {
    if (data?.data?.work_experiences) {
      const formattedWorkHistories = data.data.work_experiences.map((exp) => ({
        id: exp.id,
        company_name: exp.company_name || "",
        title: exp.title || "",
        start_year: exp.start_year?.toString() || "",
        start_month: exp.start_month?.toString() || "",
        end_year: exp.end_year?.toString() || "",
        end_month: exp.end_month?.toString() || "",
        is_current: Boolean(exp.is_current),
        description: exp.description || "",
      }));

      setWorkHistories(formattedWorkHistories);

      // Set nextId to be higher than any existing ID
      const maxId = Math.max(
        ...data.data.work_experiences.map((exp) => exp.id),
        0
      );
      setNextId(maxId + 1);
    } else {
      // If no data, start with one empty form
      setWorkHistories([
        {
          id: 1,
          company_name: "",
          title: "",
          start_year: "",
          start_month: "",
          end_year: "",
          end_month: "",
          is_current: false,
          description: "",
        },
      ]);
      setNextId(2);
    }
  }, [data?.data?.work_experiences]);

  const handleAddForm = () => {
    setWorkHistories([
      ...workHistories,
      {
        id: nextId,
        company_name: "",
        title: "",
        start_year: "",
        start_month: "",
        end_year: "",
        end_month: "",
        is_current: false,
        description: "",
      },
    ]);
    setNextId((prev) => prev + 1);
  };

  const handleRemoveForm = (id) => {
    if (workHistories.length === 1) return; // Don't remove the last form
    setWorkHistories(workHistories.filter((history) => history.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setWorkHistories(
      workHistories.map((history) => {
        if (history.id === id) {
          return { ...history, [field]: value };
        }
        return history;
      })
    );
  };

  const handleCheckboxChange = (id) => {
    setWorkHistories(
      workHistories.map((history) => {
        if (history.id === id) {
          return {
            ...history,
            is_current: !history.is_current,
            end_year: !history.is_current ? "" : history.end_year,
            end_month: !history.is_current ? "" : history.end_month,
          };
        }
        return history;
      })
    );
  };

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/updateWorkExperiences",
        method: "post",
        data,
      }),
    onSuccess: () => {
      toast.success("Your working history has been saved");
      queryClient.invalidateQueries(["working-history"]);
    },
    onError: (e) => {
      toast.error(`failed to update ${e?.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      work_experiences: workHistories.map((history) => ({
        ...(history.id <= data?.data?.work_experiences?.length && {
          id: history.id,
        }),
        title: history.title,
        company_name: history.company_name,
        start_month: history.start_month ? parseInt(history.start_month) : null,
        start_year: history.start_year ? parseInt(history.start_year) : null,
        end_month: history.is_current
          ? null
          : history.end_month
          ? parseInt(history.end_month)
          : null,
        end_year: history.is_current
          ? null
          : history.end_year
          ? parseInt(history.end_year)
          : null,
        is_current: history.is_current ? 1 : 0,
        description: history.description || null,
      })),
    };
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-full items-end"
    >
      {workHistories.map((history, index) => (
        <div key={history.id} className="w-full py-6 rounded-lg relative">
          {index !== 0 && (
            <>
              <div className="flex items-center justify-between py-2 rtl:flex-row-reverse">
                <h2 className="font-semibold text-Text-Secondary">
                  سابقه کاری جدید
                </h2>
                <Button
                  type="button"
                  onClick={() => handleRemoveForm(history.id)}
                  className="flex items-center rtl:flex-row-reverse gap-2 hover:bg-transparent cursor-pointer  bg-transparent text-destructive"
                >
                  <Minus className="fill-error-main" />
                  <span>{w.delete}</span>
                </Button>
              </div>
            </>
          )}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center lg:flex-row flex-col gap-4 rtl:flex-row-reverse">
              <Input
                type="text"
                value={history.title}
                onChange={(e) =>
                  handleInputChange(history.id, "title", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.job_title}
              />
              <Input
                type="text"
                value={history.company_name}
                onChange={(e) =>
                  handleInputChange(history.id, "company_name", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.company_name}
              />
            </div>

            <div className="flex items-center lg:flex-row flex-col gap-4 rtl:flex-row-reverse">
              <Input
                type="text"
                value={history.start_month}
                onChange={(e) =>
                  handleInputChange(history.id, "start_month", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.start_month}
              />

              <Input
                type="text"
                value={history.end_month}
                onChange={(e) =>
                  handleInputChange(history.id, "end_month", e.target.value)
                }
                disabled={history.is_current}
                className={`border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right ${
                  history.is_current ? "opacity-50" : ""
                }`}
                placeholder={w.end_month}
              />
            </div>

            <div className="flex items-center lg:flex-row flex-col gap-4 rtl:flex-row-reverse">
              <Input
                type="text"
                value={history.start_year}
                onChange={(e) =>
                  handleInputChange(history.id, "start_year", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.start_year}
              />

              <Input
                type="text"
                value={history.end_year}
                onChange={(e) =>
                  handleInputChange(history.id, "end_year", e.target.value)
                }
                disabled={history.is_current}
                className={`border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right ${
                  history.is_current ? "opacity-50" : ""
                }`}
                placeholder={w.end_year}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full items-end mt-6">
            <div className="flex items-center gap-2">
              <Label className="text-Gray-800"> {w.still_working} </Label>
              <Checkbox
                checked={history.is_current}
                onCheckedChange={() => handleCheckboxChange(history.id)}
              />
            </div>
            <Textarea
              value={history.description}
              onChange={(e) =>
                handleInputChange(history.id, "description", e.target.value)
              }
              placeholder={w.optional_description}
              className="w-full rtl:placeholder:text-right rtl:text-right rounded-2xl"
            />

            {workHistories.length > 1 && (
              <div className="px-16 w-full">
                <div className="bg-Text-Secondary h-[1px] mt-6 w-full "></div>
              </div>
            )}
          </div>
        </div>
      ))}

      <Button
        type={`button`}
        onClick={handleAddForm}
        className="flex gap-2 hover:bg-transparent cursor-pointer w-52 items-center bg-transparent border-2 py-5 border-Primary-400 rounded-xl text-Primary-400"
      >
        <span>{w.add_new_work_experience} </span>
        <Plus className="fill-Primary-400" />
      </Button>

      <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
        >
          {mutation.isPending ? (
            <Spinner size="small" />
          ) : (
            <>
              <p>{w.save_information}</p>
              <Tick className="fill-white dark:fill-black w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default WorkingHistory;
