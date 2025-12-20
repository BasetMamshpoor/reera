import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import Plus from "@/assets/icons/add.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
// import Minus from "@/assets/icons/minus.svg"; // You'll need a minus icon

const WorkingHistory = () => {
  const dic = useTranslation();
  const w = dic.consultor.edit;
  const [workHistories, setWorkHistories] = useState([
    {
      id: 1,
      companyName: "",
      jobTitle: "",
      startYear: "",
      startMonth: "",
      endYear: "",
      endMonth: "",
      stillWorking: false,
      description: "",
    },
  ]);

  const handleAddForm = () => {
    setWorkHistories([
      ...workHistories,
      {
        id: workHistories.length + 1,
        companyName: "",
        jobTitle: "",
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        stillWorking: false,
        description: "",
      },
    ]);
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
            stillWorking: !history.stillWorking,
            // Clear end date if still working
            endYear: !history.stillWorking ? "" : history.endYear,
            endMonth: !history.stillWorking ? "" : history.endMonth,
          };
        }
        return history;
      })
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full items-end">
      {workHistories.map((history, index) => (
        <div key={history.id} className="w-full py-6 rounded-lg relative">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center lg:flex-row flex-col gap-4 rtl:flex-row-reverse">
              <Input
                type="text"
                value={history.jobTitle}
                onChange={(e) =>
                  handleInputChange(history.id, "jobTitle", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.job_title}
              />
              <Input
                type="text"
                value={history.companyName}
                onChange={(e) =>
                  handleInputChange(history.id, "companyName", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.company_name}
              />
            </div>

            <div className="flex items-center lg:flex-row flex-col gap-4 rtl:flex-row-reverse">
              <Input
                type="text"
                value={history.startMonth}
                onChange={(e) =>
                  handleInputChange(history.id, "startMonth", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.start_month}
              />
              <Input
                type="text"
                value={history.startYear}
                onChange={(e) =>
                  handleInputChange(history.id, "startYear", e.target.value)
                }
                className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
                placeholder={w.start_year}
              />
            </div>

            <div className="flex items-center lg:flex-row flex-col gap-4 rtl:flex-row-reverse">
              <Input
                type="text"
                value={history.endMonth}
                onChange={(e) =>
                  handleInputChange(history.id, "endMonth", e.target.value)
                }
                disabled={history.stillWorking}
                className={`border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right ${
                  history.stillWorking ? "opacity-50" : ""
                }`}
                placeholder={w.end_month}
              />
              <Input
                type="text"
                value={history.endYear}
                onChange={(e) =>
                  handleInputChange(history.id, "endYear", e.target.value)
                }
                disabled={history.stillWorking}
                className={`border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right ${
                  history.stillWorking ? "opacity-50" : ""
                }`}
                placeholder={w.end_year}
              />
            </div>

            {/* <div>
              {index !== 0 && (
                <>
                  <Button
                    onClick={() => handleRemoveForm(history.id)}
                    className={`bg-transparent text-error-main hover:bg-error-main/10 cursor-pointer shadow-none`}
                  >
                    <span>حذف</span>
                  </Button>
                </>
              )}
            </div> */}
          </div>

          <div className="flex flex-col gap-4 w-full items-end mt-6">
            <div className="flex items-center gap-2">
              <Label className="text-Gray-800"> {w.still_working} </Label>
              <Checkbox
                checked={history.stillWorking}
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
        onClick={handleAddForm}
        className="flex gap-2 hover:bg-transparent cursor-pointer w-52 items-center bg-transparent border-2 py-5 border-Primary-400 rounded-xl text-Primary-400"
      >
        <span>{w.add_new_work_experience} </span>
        <Plus className="fill-Primary-400" />
      </Button>

      <div className="flex flex-row ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {w.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full rtl:flex-row-reverse items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>{w.save_information} </span>
          <Tick className="fill-white " />
        </button>
      </div>
    </div>
  );
};

export default WorkingHistory;
