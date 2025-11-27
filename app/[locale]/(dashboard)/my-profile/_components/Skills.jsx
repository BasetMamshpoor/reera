import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import Plus from "@/assets/icons/add.svg";
import Close from "@/assets/icons/close.svg";
import { useTranslation } from "../../../TranslationContext";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import Tick from "@/assets/icons/tick-circle.svg";
const Skills = () => {
  const queryClient = useQueryClient();
  const dic = useTranslation();
  const s = dic.consultor.edit;
  const { handleSubmit } = useForm({});

  const { data, isLoading } = useQuery({
    queryKey: ["skills-profile"],
    queryFn: async () =>
      await request({
        url: "/profile/getSkills",
      }),
  });

  const [skills, setSkills] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    if (data?.data?.skills) {
      const formattedSkills = data.data.skills.map((skill, index) => ({
        id: index + 1,
        name: skill.name || "",
      }));

      setSkills(formattedSkills);
      setNextId(formattedSkills.length + 1);
    } else {
      setSkills([{ id: 1, name: "" }]);
      setNextId(2);
    }
  }, [data?.data?.skills]);

  const handleAddSkill = () => {
    setSkills([...skills, { id: nextId, name: "" }]);
    setNextId((prev) => prev + 1);
  };

  const handleRemoveSkill = (id) => {
    if (skills.length === 1) return;
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleSkillChange = (id, value) => {
    setSkills(
      skills.map((skill) => {
        if (skill.id === id) {
          return { ...skill, name: value };
        }
        return skill;
      })
    );
  };

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/updateSkills",
        method: "post",
        data,
      }),
    onSuccess: () => {
      toast.success("Your Skills have been saved");
      queryClient.invalidateQueries(["skills-profile"]);
    },
    onError: (e) => {
      toast.error(`Failed to update: ${e?.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      skills: skills
        .filter((skill) => skill.name.trim() !== "")
        .map((skill) => ({ name: skill.name })),
    };

    if (payload.skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

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
      className="flex flex-col gap-8 w-full h-full"
    >
      <div className="flex flex-col gap-4 w-full rtl:items-end">
        {skills.map((skillItem, index) => (
          <div
            key={skillItem.id}
            className="flex items-center gap-2 w-full relative"
          >
            <Input
              type="text"
              value={skillItem.name}
              onChange={(e) => handleSkillChange(skillItem.id, e.target.value)}
              className="border border-default-divider placeholder:Gray-500 py-5 rtl:placeholder:text-right rtl:text-right pr-10"
              placeholder={s.your_skill}
            />
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveSkill(skillItem.id)}
                className="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2"
              >
                <Close className="fill-error-main hover:bg-error-main/10 rounded-full cursor-pointer w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAddSkill}
          className="flex rtl:flex-row-reverse gap-2 hover:bg-transparent cursor-pointer w-52 items-center bg-transparent border-2 py-5 border-Primary-400 rounded-xl text-Primary-400"
        >
          <Plus className="fill-Primary-400" />
          <span>{s.add_new_skill}</span>
        </Button>
      </div>

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
              <p>{s.save_information}</p>
              <Tick className="fill-white dark:fill-black w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Skills;
