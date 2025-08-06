import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
const facilities = [
  "اسانسور",
  "پارکینگ",
  "انباری",
  "تراس/بالکن",
  "سرمایشی",
  "گرماشی",
  "آشپزخانه اپن",
  "کابینت",
  "کف سرامیک / پارکت",
  "درب ضد سرقت",
  "پنجره دو جداره",
  "سیستم اعلام و اطفای حریق",
  "نگهبانی 24 ساعته / لابی من",
  "دوربین کدار بسته",
  "ژنراتور برق اضظراری",
  "اتاق مستر",
  "سالن اجتماعات / مهمان خانه",
  "سالن ورزشی / باشگاه اختصاصی",
  "استخر / سونا / جکوزی",
  "اینترنت فیبر نوری / مخابراتی فعال",
];
const residential = [
  "خالی",
  "قابل تحویل از تاریخ",
  "(قابل بازدید)در حال استفاده ",
];
const Facilities = () => {
  const [selected, setSelected] = React.useState(() => {
    const initial = { همه: false };
    facilities.forEach((cat) => (initial[cat] = false));
    return initial;
  });
  const handleChange = (label) => {
    if (label === "همه") {
      // When "همه" is checked, uncheck all others
      setSelected({
        همه: true,
        ...Object.fromEntries(categories.map((cat) => [cat, false])),
      });
    } else {
      // When any category is toggled, uncheck "همه"
      setSelected((prev) => ({
        ...prev,
        همه: false,
        [label]: !prev[label],
      }));
    }
  };
  return (
    <div className="bg-white px-6 py-10 rounded-lg w-full">
      <div className="flex flex-col gap-4">
        <div>
          <h2>امکانات ملک</h2>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4">
            {[...facilities].map((label) => (
              <div key={label} className="flex flex-row items-center gap-2">
                <Checkbox
                  className={``}
                  checked={selected[label]}
                  onCheckedChange={() => handleChange(label)}
                />
                <Label className={`dark:text-white text-xs`}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>وضعیت مسکونی</h2>
          <div className="flex felx-row items-center gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
