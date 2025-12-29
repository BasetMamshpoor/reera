import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Plus from "@/assets/icons/add.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick.svg"; // You'll need a minus icon

const Skills = () => {
  const [skills, setSkills] = useState([{ id: 1, skill: "" }]);

  const handleAddSkill = () => {
    setSkills([...skills, { id: skills.length + 1, skill: "" }]);
  };

  const handleRemoveSkill = (id) => {
    if (skills.length === 1) return; // Don't remove the last skill
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleSkillChange = (id, value) => {
    setSkills(
      skills.map((skill) => {
        if (skill.id === id) {
          return { ...skill, skill: value };
        }
        return skill;
      })
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <div className="flex flex-col gap-4 w-full rtl:items-end">
        <h2 className="font-semibold text-Gray-700">وارد کردن مهارت</h2>
        {skills.map((skillItem, index) => (
          <div key={skillItem.id} className="flex items-center gap-2 w-full">
            {index !== 0 && (
              <Close
                onClick={() => handleRemoveSkill(skillItem.id)}
                className="fill-error-main hover:bg-error-main/10 rounded-full cursor-pointer"
              />
            )}
            <Input
              type="text"
              value={skillItem.skill}
              onChange={(e) => handleSkillChange(skillItem.id, e.target.value)}
              className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right"
              placeholder="مهارت شما"
            />
          </div>
        ))}

        <Button
          onClick={handleAddSkill}
          className="flex gap-2 hover:bg-transparent cursor-pointer w-52 items-center bg-transparent border-2 py-5 border-Primary-400 rounded-xl text-Primary-400"
        >
          <span>افزودن مهارت جدید</span>
          <Plus className="fill-Primary-400" />
        </Button>
      </div>

      <div className="flex flex-row  ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full rtl:flex-row-reverse items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>ذخیره اطلاعات</span>
          <Tick className="fill-white " />
        </button>
      </div>
    </div>
  );
};

export default Skills;
