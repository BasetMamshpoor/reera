import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import Plus from "@/assets/icons/add.svg";
import Close from "@/assets/icons/close.svg";
import { useTranslation } from "../../../TranslationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import Tick from "@/assets/icons/tick-circle.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  languages: z
    .array(
      z.object({
        language_id: z.string().min(1, "Language is required"),
        level: z.enum(["basic", "intermediate", "advanced", "native"]),
      })
    )
    .min(1, "At least one language is required"),
});

const LanguageLevelSelect = () => {
  const dic = useTranslation();
  const l = dic.consultor.edit;
  const queryClient = useQueryClient();

  const { data: availableLanguagesData } = useQuery({
    queryKey: ["available-languages"],
    queryFn: async () =>
      await request({
        url: "/info",
        method: "get",
      }),
  });

  const { data: languagesDataApi } = useQuery({
    queryKey: ["languages-data"],
    queryFn: async () =>
      await request({
        url: "/profile/getLanguages",
      }),
  });

  const [languages, setLanguages] = useState([
    { id: 1, level: "", language_id: "" },
  ]);
  const [nextId, setNextId] = useState(2);

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      languages: [{ language_id: "", level: "" }],
    },
  });

  // Initialize languages with API data when it loads
  useEffect(() => {
    if (languagesDataApi?.data?.languages) {
      const formattedLanguages = languagesDataApi.data.languages.map(
        (lang, index) => ({
          id: index + 1,
          language_id: lang.id.toString(),
          level: lang.level,
        })
      );

      setLanguages(formattedLanguages);

      // Set nextId to be higher than any existing ID
      const maxId = Math.max(...formattedLanguages.map((lang) => lang.id), 0);
      setNextId(maxId + 1);
    } else {
      // If no data, start with one empty language
      setLanguages([{ id: 1, level: "", language_id: "" }]);
      setNextId(2);
    }
  }, [languagesDataApi?.data?.languages]);

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/updateLanguages",
        method: "post",
        data,
      }),
    onSuccess: () => {
      toast.success("Your languages have been saved");
      queryClient.invalidateQueries(["languages-data"]);
    },
    onError: (err) => {
      toast.error(`Failed to Update ${err?.message}`);
    },
  });

  const addLanguage = () => {
    const newLanguages = [
      ...languages,
      { id: nextId, level: "", language_id: "" },
    ];
    setLanguages(newLanguages);
    setNextId((prev) => prev + 1);
    // Update form value
    setValue("languages", newLanguages);
  };

  const removeLanguage = (id) => {
    if (languages.length > 1) {
      const newLanguages = languages.filter((lang) => lang.id !== id);
      setLanguages(newLanguages);
      // Update form value
      setValue("languages", newLanguages);
    }
  };

  const updateLanguage = (id, field, value) => {
    const newLanguages = languages.map((lang) =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    setLanguages(newLanguages);
    // Update form value for validation
    setValue("languages", newLanguages);
    // Trigger validation after update
    trigger("languages");
  };

  // Updated levelOptions to match the enum values
  const levelOptions = [
    { value: "basic", label: "مبتدی" },
    { value: "intermediate", label: "متوسط" },
    { value: "advanced", label: "پیشرفته" },
    { value: "native", label: "زبان مادری" },
  ];

  const onSubmit = (formData) => {
    // Use the data from form submission which is already validated
    const payload = {
      languages: formData.languages.map((lang) => ({
        language_id: parseInt(lang.language_id),
        level: lang.level,
      })),
    };

    mutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col mx-auto rounded-lg"
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 w-full">
          {languages.map((lang, index) => (
            <div key={lang.id} className="relative rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                {/* Language Select */}
                <div className="w-full">
                  <Select
                    value={lang.language_id}
                    onValueChange={(value) =>
                      updateLanguage(lang.id, "language_id", value)
                    }
                  >
                    <SelectTrigger className="border py-5 border-default-divider cursor-pointer w-full rounded-lg px-3 text-gray-500 text-sm lg:text-base">
                      <SelectValue placeholder={l.language} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableLanguagesData?.data?.languages?.map(
                          (language) => {
                            return (
                              <SelectItem
                                key={language.id}
                                value={language.id.toString()}
                              >
                                {language.title}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Level Select */}
                <div className="w-full">
                  <Select
                    value={lang.level}
                    onValueChange={(value) =>
                      updateLanguage(lang.id, "level", value)
                    }
                  >
                    <SelectTrigger className="w-full [&_[data-slot=chev-down]]:fill-Gray-500 border border-default-divider py-5 rounded-lg data-[placeholder]:text-Gray-500">
                      <SelectValue placeholder={l.language_level} />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.id)}
                  className="absolute top-1/2 -translate-y-1/2 hover:bg-error-accent/10 -left-8 p-1 rounded-full cursor-pointer transition-colors"
                >
                  <Close className="w-5 h-5 fill-error-main" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Show general languages array error */}
        {errors.languages && (
          <p className="text-red-500 text-sm">{errors.languages.message}</p>
        )}

        <button
          type="button"
          onClick={addLanguage}
          className="flex items-center whitespace-nowrap px-3 rtl:flex-row-reverse rtl:self-end gap-2 border-Primary-400 w-fit py-3 rounded-xl justify-center text-Primary-400 border-2 cursor-pointer font-semibold hover:bg-Primary-50 transition-colors duration-200"
        >
          <Plus className="fill-Primary-400" />
          <span> {l.add_new_language} </span>
        </button>
      </div>
      <div className="flex items-center gap-4 w-full ltr:self-end rtl:self-start mt-4">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <Spinner size="small" />
          ) : (
            <>
              <p>{l.save_information}</p>
              <Tick className="fill-white dark:fill-black w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LanguageLevelSelect;
