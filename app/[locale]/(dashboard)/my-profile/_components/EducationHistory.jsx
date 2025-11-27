import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import Plus from "@/assets/icons/add.svg";
import Minus from "@/assets/icons/Minus.svg";
import { useTranslation } from "../../../TranslationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";

import Spinner from "@/components/Spinner";
import Tick from "@/assets/icons/tick-circle.svg";
const EducationHistory = () => {
  const dic = useTranslation();
  const e = dic.consultor.edit;
  const queryClient = useQueryClient();

  const educationLevels = [
    { id: "diploma", label: e.diploma },
    { id: "associate", label: e.associate },
    { id: "bachelor", label: e.bachelor },
    { id: "master", label: e.master },
    { id: "phd", label: e.phd_above },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["education-history"],
    queryFn: async () =>
      await request({
        url: "/profile/getEducations",
      }),
  });

  const [educationHistories, setEducationHistories] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Initialize educationHistories with API data when it loads
  useEffect(() => {
    if (data?.data?.educations) {
      const formattedEducationHistories = data.data.educations.map((edu) => ({
        id: edu.id,
        institution: edu.university_name || "",
        field: edu.major || "",
        educationLevel: edu.degree || "",
        startYear: edu.start_year?.toString() || "",
        endYear: edu.end_year?.toString() || "",
        stillStudying: Boolean(edu.is_current),
        description: edu.description || "",
      }));

      setEducationHistories(formattedEducationHistories);

      // Set nextId to be higher than any existing ID
      const maxId = Math.max(...data.data.educations.map((edu) => edu.id), 0);
      setNextId(maxId + 1);
    } else {
      // If no data, start with one empty form
      setEducationHistories([
        {
          id: 1,
          institution: "",
          field: "",
          educationLevel: "",
          startYear: "",
          endYear: "",
          stillStudying: false,
          description: "",
        },
      ]);
      setNextId(2);
    }
  }, [data?.data?.educations]);

  const handleAddForm = () => {
    setEducationHistories([
      ...educationHistories,
      {
        id: nextId,
        institution: "",
        field: "",
        educationLevel: "",
        startYear: "",
        endYear: "",
        stillStudying: false,
        description: "",
      },
    ]);
    setNextId((prev) => prev + 1);
  };

  const handleRemoveForm = (id) => {
    if (educationHistories.length === 1) return; // Don't remove the last form
    setEducationHistories(
      educationHistories.filter((history) => history.id !== id)
    );
  };

  const handleInputChange = (id, field, value) => {
    setEducationHistories(
      educationHistories.map((history) => {
        if (history.id === id) {
          return { ...history, [field]: value };
        }
        return history;
      })
    );
  };

  const handleCheckboxChange = (id) => {
    setEducationHistories(
      educationHistories.map((history) => {
        if (history.id === id) {
          return {
            ...history,
            stillStudying: !history.stillStudying,
            endYear: !history.stillStudying ? "" : history.endYear,
          };
        }
        return history;
      })
    );
  };

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/updateEducations",
        method: "post",
        data,
      }),
    onSuccess: () => {
      toast.success("Your education information has been saved");
      queryClient.invalidateQueries(["education-history"]);
    },
    onError: (e) => {
      toast.error(`Failed to update: ${e?.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      educations: educationHistories.map((history) => ({
        major: history.field,
        university_name: history.institution,
        degree: history.educationLevel,
        start_year: history.startYear ? parseInt(history.startYear) : null,
        end_year: history.stillStudying
          ? null
          : history.endYear
          ? parseInt(history.endYear)
          : null,
        is_current: history.stillStudying,
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
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full items-end"
    >
      {educationHistories.map((history, index) => (
        <div key={history.id} className="w-full py-4 rounded-lg  relative">
          {index !== 0 && (
            <>
              <div className="flex items-center justify-between py-2 rtl:flex-row-reverse">
                <h2 className="font-semibold text-Text-Secondary">
                  سابقه تحصیلی جدید
                </h2>
                <Button
                  type="button"
                  onClick={() => handleRemoveForm(history.id)}
                  className="flex items-center rtl:flex-row-reverse gap-2 hover:bg-transparent cursor-pointer  bg-transparent text-destructive"
                >
                  <Minus className="fill-error-main" />
                  <span>{e.delete}</span>
                </Button>
              </div>
            </>
          )}

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:flex-row rtl:flex-row-reverse gap-4">
              <Input
                type="text"
                value={history.field}
                onChange={(e) =>
                  handleInputChange(history.id, "field", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={e.field_of_study}
              />
              <Input
                type="text"
                value={history.institution}
                onChange={(e) =>
                  handleInputChange(history.id, "institution", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={e.university_institute}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full items-end mt-6">
            <div className="flex-col flex gap-2 w-full rtl:items-end">
              <h2 className="text-Gray-700 font-semibold">
                {e.education_level}{" "}
              </h2>
              <div className="flex flex-row gap-4 mt-2 w-full rtl:justify-end">
                {educationLevels.map((level) => (
                  <div
                    key={level.id}
                    className="flex items-center gap-2 rtl:flex-row-reverse"
                  >
                    <input
                      type="radio"
                      id={`${level.id}-${history.id}`}
                      name={`education-level-${history.id}`}
                      value={level.id}
                      checked={history.educationLevel === level.id}
                      onChange={() =>
                        handleInputChange(
                          history.id,
                          "educationLevel",
                          level.id
                        )
                      }
                      className="w-4 h-4 text-Primary-600 bg-Gray-100 border-Gray-300 focus:ring-Primary-500 cursor-pointer"
                    />
                    <Label
                      htmlFor={`${level.id}-${history.id}`}
                      className="cursor-pointer text-Gray-800"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex lg:flex-row flex-col rtl:flex-row-reverse items-center w-full gap-4">
              <Input
                type="text"
                value={history.startYear}
                onChange={(e) =>
                  handleInputChange(history.id, "startYear", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={e.education_start_year}
              />
              <Input
                type="text"
                value={history.endYear}
                onChange={(e) =>
                  handleInputChange(history.id, "endYear", e.target.value)
                }
                disabled={history.stillStudying}
                className={`border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right ${
                  history.stillStudying ? "opacity-50" : ""
                }`}
                placeholder={e.education_end_year}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full items-end mt-6">
            <div className="flex items-center gap-2">
              <Label className="text-Gray-800">{e.still_studying} </Label>
              <Checkbox
                checked={history.stillStudying}
                onCheckedChange={() => handleCheckboxChange(history.id)}
              />
            </div>
            <Textarea
              value={history.description}
              onChange={(e) =>
                handleInputChange(history.id, "description", e.target.value)
              }
              placeholder={e.optional_description}
              className="w-full rtl:placeholder:text-right rtl:text-right rounded-2xl"
            />
          </div>
          {educationHistories.length > 1 && (
            <div className="px-16 w-full">
              <div className="bg-Text-Secondary h-[1px] mt-6 w-full "></div>
            </div>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddForm}
        className="flex gap-2 hover:bg-transparent cursor-pointer w-52 items-center bg-transparent border-2 py-5 border-Primary-400 rounded-xl text-Primary-400 rtl:flex-row-reverse text-center"
      >
        <Plus className="fill-Primary-400" />
        <span>{e.add_new_education}</span>
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
              <p>{e.save_information}</p>
              <Tick className="fill-white dark:fill-black w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EducationHistory;
