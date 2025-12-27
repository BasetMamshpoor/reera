import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Plus from "@/assets/icons/add.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick.svg";

const LanguageLevelSelect = () => {
  const [languages, setLanguages] = useState([
    { id: 1, level: "", language: "" },
  ]);

  const addLanguage = () => {
    setLanguages([...languages, { id: Date.now(), level: "", language: "" }]);
  };

  const removeLanguage = (id) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((lang) => lang.id !== id));
    }
  };

  const updateLanguage = (id, field, value) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for backend
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());

    // Extract language data
    const languageData = languages.map((lang, index) => ({
      language: formDataObject[`language-${index}`],
      level: formDataObject[`level-${index}`],
    }));

    // Send to backend (replace with your API endpoint)
    fetch("/api/languages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ languages: languageData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("زبان‌ها با موفقیت ذخیره شدند");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("خطا در ذخیره اطلاعات");
      });
  };

  const languageOptions = [
    { value: "english", label: "انگلیسی" },
    { value: "spanish", label: "اسپانیایی" },
    { value: "french", label: "فرانسوی" },
    { value: "german", label: "آلمانی" },
    { value: "chinese", label: "چینی" },
    { value: "japanese", label: "ژاپنی" },
    { value: "arabic", label: "عربی" },
    { value: "russian", label: "روسی" },
  ];

  const levelOptions = [
    { value: "beginner", label: "مبتدی" },
    { value: "elementary", label: "ابتدایی" },
    { value: "intermediate", label: "متوسط" },
    { value: "upper-intermediate", label: "فوق متوسط" },
    { value: "advanced", label: "پیشرفته" },
    { value: "proficient", label: "مسلط" },
    { value: "native", label: "زبان مادری" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col  mx-auto p-6 rounded-lg "
    >
      <h2 className="text-2xl font-bold text-right mb-6">مدیریت زبان‌ها</h2>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 w-full">
          {languages.map((lang, index) => (
            <div key={lang.id} className="relative  rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                {/* Hidden inputs for form submission */}
                <input
                  type="hidden"
                  name={`language-${index}`}
                  value={lang.language}
                />
                <input
                  type="hidden"
                  name={`level-${index}`}
                  value={lang.level}
                />

                <Select
                  value={lang.language}
                  onValueChange={(value) =>
                    updateLanguage(lang.id, "language", value)
                  }
                >
                  <SelectTrigger className="w-full [&_[data-slot=chev-down]]:fill-Gray-500 border border-default-divider py-5 rounded-lg data-[placeholder]:text-Gray-500">
                    <SelectValue placeholder="زبان" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Level Select */}
                <Select
                  value={lang.level}
                  onValueChange={(value) =>
                    updateLanguage(lang.id, "level", value)
                  }
                >
                  <SelectTrigger className="w-full [&_[data-slot=chev-down]]:fill-Gray-500 border border-default-divider py-5 rounded-lg data-[placeholder]:text-Gray-500">
                    <SelectValue placeholder="سطح تسلط" />
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

              {index !== 0 && (
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

        <button
          type="button"
          onClick={addLanguage}
          className="flex items-center rtl:flex-row-reverse rtl:self-end gap-2 border-Primary-400 w-42 py-3 rounded-xl justify-center text-Primary-400 border-2 cursor-pointer font-semibold hover:bg-Primary-50 transition-colors duration-200"
        >
          <Plus className="fill-Primary-400" />
          <span>افزودن زبان جدید</span>
        </button>
      </div>
      <div className="flex flex-row   ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
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
    </form>
  );
};

export default LanguageLevelSelect;
