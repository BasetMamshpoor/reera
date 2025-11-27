"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import CloseCircle from "@/assets/icons/close.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { request } from "@/lib/api";
import { FormContext } from "../../NewCategorySelector";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const schema = z.object({
  degree: z.string().min(1, "مدرک تحصیلی را انتخاب کنید"),
  skill: z.string().optional(),
  role: z.string().optional(),
});

const RecruitmentConditions = ({ isEditing, adData }) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      degree: "",
      skill: "",
      role: "",
    },
  });

  const dic = useTranslation();
  const r = dic.register_ad;

  const [skills, setSkills] = useState([]);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [rules, setRules] = useState([
    "استعمال دخانیات ممنوع",
    "فقط برای خانم‌ها",
    "فقط برای آقایان",
  ]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [showRuleInput, setShowRuleInput] = useState(false);
  const [newRule, setNewRule] = useState("");

  const educationDegrees = [
    { value: "diploma", label: "دیپلم" },
    { value: "associate", label: "کاردانی" },
    { value: "bachelor", label: "کارشناسی" },
    { value: "master", label: "کارشناسی ارشد" },
    { value: "phd", label: "دکتری" },
  ];

  const { setCurrentStep, apiResponseData } = useContext(FormContext);

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/recruitment/sixth"
          : `/update/recruitment/sixth/${adData?.first?.id}`,
        method: "post",
        data,
      }),

    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`Failed to submit ${err?.message}`);
    },
  });

  useEffect(() => {
    if (isEditing && adData?.sixth) {
      const sixth = adData.sixth;

      reset({
        degree: sixth.degree || "",
        skill: sixth.skill?.join(", ") || "",
        role: sixth.role?.join(", ") || "",
      });

      setSkills(sixth.skill || []);
      setSelectedRules(sixth.role || []);
    }
  }, [isEditing, adData, reset]);

  const handleDeleteSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    setValue("skill", updated.join(", "));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      setValue("skill", updated.join(", "));
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      const updatedRules = [...rules, newRule.trim()];
      setRules(updatedRules);
      setNewRule("");
      setShowRuleInput(false);
    }
  };

  const handleRuleChange = (rule, checked) => {
    let updatedSelected;
    if (rule === "فقط برای خانم‌ها" && checked) {
      updatedSelected = selectedRules
        .filter((r) => r !== "فقط برای آقایان")
        .concat(rule);
    } else if (rule === "فقط برای آقایان" && checked) {
      updatedSelected = selectedRules
        .filter((r) => r !== "فقط برای خانم‌ها")
        .concat(rule);
    } else if (checked) {
      updatedSelected = [...selectedRules, rule];
    } else {
      updatedSelected = selectedRules.filter((r) => r !== rule);
    }

    setSelectedRules(updatedSelected);
    setValue("role", updatedSelected.join(", "));
  };

  const onSubmit = (data) => {
    const payload = {
      ad_id: apiResponseData?.id || apiResponseData,
      degree: data.degree,
      skill: skills,
      role: selectedRules,
    };

    mutation.mutate(payload);
  };

  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-6">
        {/* Degree Select */}
        <div className="w-full">
          <Select
            onValueChange={(val) => setValue("degree", val)}
            value={watch("degree")}
          >
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={r.education_certificate} />
            </SelectTrigger>
            <SelectContent>
              {educationDegrees.map((degree) => (
                <SelectItem key={degree.value} value={degree.value}>
                  {degree.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.degree && (
            <p className="text-error-main text-sm mt-1">
              {errors.degree.message}
            </p>
          )}
        </div>

        {/* Skills Section */}
        <div className="w-full">
          <Label>{r.skills}</Label>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-surface text-Text-Secondary p-3 rounded-lg flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(index)}
                  className="cursor-pointer"
                >
                  <CloseCircle className="fill-Text-Secondary !w-4 !h-4" />
                </button>
              </div>
            ))}
          </div>

          {showSkillInput ? (
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder={r.new_skill}
                autoFocus
              />
              <Button type="button" onClick={handleAddSkill}>
                {r.save}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSkillInput(false)}
              >
                {r.cancel}
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={() => setShowSkillInput(true)}>
              {r.add_skill}
            </Button>
          )}
          {errors.skill && (
            <p className="text-error-main text-sm mt-1">
              {errors.skill.message}
            </p>
          )}
        </div>

        {/* Rules Checkboxes */}
        <div className="w-full">
          <Label>{r.rules}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 mb-4">
            {rules.map((rule) => (
              <div key={rule} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedRules.includes(rule)}
                  onCheckedChange={(checked) => handleRuleChange(rule, checked)}
                />
                <Label>{rule}</Label>
              </div>
            ))}
          </div>

          {showRuleInput ? (
            <div className="flex gap-2">
              <Input
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder={r.new_rule}
                autoFocus
              />
              <Button type="button" onClick={handleAddRule}>
                {r.save}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRuleInput(false)}
              >
                {r.cancel}
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={() => setShowRuleInput(true)}>
              {r.new_rule}
            </Button>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {r.cancel}
        </button>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg disabled:opacity-50"
        >
          <span className="text-alphaw-100">
            {mutation.isLoading ? r.sending : r.next}
          </span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default RecruitmentConditions;
