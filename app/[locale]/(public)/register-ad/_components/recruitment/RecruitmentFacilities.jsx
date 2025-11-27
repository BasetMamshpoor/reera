import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useEffect } from "react";

const schema = z.object({
  facilities: z.array(z.string()).optional(),
  customFacilities: z.array(z.string()).optional(),
});

const RecruitmentFacilities = ({ isEditing, adData }) => {
  const [customFeatures, setCustomFeatures] = useState([]);
  const [newFeatureText, setNewFeatureText] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const dic = useTranslation();
  const r = dic.register_ad;
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      facilities: [],
      customFacilities: [],
    },
    mode: "onChange",
  });

  const { setCurrentStep, apiResponseData } = useContext(FormContext);

  const FacilitiesMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/recruitment/third"
          : `/update/recruitment/third/${adData?.first?.id}`,
        method: "post",
        data,
      }),

    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error(`failed to submit the form ${error?.message}`);
    },
  });

  const facilitiesOptions = [
    "بیمه",
    "صبحانه",
    "نهار",
    "میان‌وعده",
    "شناوری ساعت کار",
    "محیط بازی",
    "محیط استراحت",
    "اتاق فکر",
  ];

  const watchedFacilities = watch("facilities") || [];
  const watchedCustomFacilities = watch("customFacilities") || [];

  const startAddingNewFeature = () => {
    setIsAddingNew(true);
    setNewFeatureText("");
  };

  const saveNewFeature = () => {
    if (newFeatureText.trim()) {
      const newFeature = newFeatureText.trim();

      const updatedCustomFeatures = [...customFeatures, newFeature];
      setCustomFeatures(updatedCustomFeatures);

      const updatedCustomFacilities = [...watchedCustomFacilities, newFeature];
      setValue("customFacilities", updatedCustomFacilities);

      const updatedFacilities = [...watchedFacilities, newFeature];
      setValue("facilities", updatedFacilities);

      setIsAddingNew(false);
      setNewFeatureText("");
    }
  };

  const removeCustomFeature = (featureToRemove) => {
    const updatedCustomFeatures = customFeatures.filter(
      (feature) => feature !== featureToRemove
    );
    setCustomFeatures(updatedCustomFeatures);

    const updatedCustomFacilities = watchedCustomFacilities.filter(
      (feature) => feature !== featureToRemove
    );
    setValue("customFacilities", updatedCustomFacilities);

    const updatedFacilities = watchedFacilities.filter(
      (feature) => feature !== featureToRemove
    );
    setValue("facilities", updatedFacilities);
  };
  useEffect(() => {
    if (isEditing && adData?.third) {
      const third = adData.third;

      // Set form values
      reset({
        facilities: third.facilities || [],
        customFacilities: third.custom_facilities || [],
      });

      // Set local UI state for custom features
      setCustomFeatures(third.custom_facilities || []);
    }
  }, [isEditing, adData, reset]);

  const onSubmit = (data) => {
    const payload = {
      ad_id: apiResponseData,
      facilities: data.facilities,
      custom_facilities: data.customFacilities,
    };

    FacilitiesMutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
    >
      {/* Facilities Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-semibold">{r.facilities_amenities}</h3>

        {/* Standard Facilities Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilitiesOptions.map((facility) => (
            <div
              key={facility}
              className="flex items-center space-x-2 gap-2 space-x-reverse"
            >
              <Checkbox
                id={facility}
                value={facility}
                checked={watchedFacilities.includes(facility)}
                onCheckedChange={(checked) => {
                  const updatedFacilities = checked
                    ? [...watchedFacilities, facility]
                    : watchedFacilities.filter((f) => f !== facility);
                  setValue("facilities", updatedFacilities, {
                    shouldValidate: true,
                  });
                }}
              />
              <Label
                htmlFor={facility}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {facility}
              </Label>
            </div>
          ))}
        </div>

        {/* Custom Facilities Checkboxes */}
        {customFeatures.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-medium mb-4">{r.added_features}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center space-x-2 gap-2 space-x-reverse flex-1">
                    <Checkbox
                      id={feature}
                      value={feature}
                      checked={watchedFacilities.includes(feature)}
                      onCheckedChange={(checked) => {
                        const updatedFacilities = checked
                          ? [...watchedFacilities, feature]
                          : watchedFacilities.filter((f) => f !== feature);
                        setValue("facilities", updatedFacilities, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    <Label
                      htmlFor={feature}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {feature}
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCustomFeature(feature)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    {r.delete}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add/Save New Feature */}
        <div className="flex flex-col gap-2 mt-4">
          {isAddingNew ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder={r.enter_new_feature_title}
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                className="flex-1"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    saveNewFeature();
                  }
                }}
              />
              <Button
                type="button"
                onClick={saveNewFeature}
                disabled={!newFeatureText.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {r.save}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingNew(false)}
              >
                {r.cancel}
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={startAddingNewFeature}
              className="w-fit"
            >
              + {r.add_new_feature}
            </Button>
          )}
        </div>

        {/* Validation error */}
        {errors.facilities && (
          <p className="text-red-500 text-sm mt-1">
            {errors.facilities.message}
          </p>
        )}
      </div>

      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          {r.cancel}
        </button>
        <button
          type="submit"
          disabled={FacilitiesMutation.isLoading}
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32 rounded-lg disabled:opacity-50"
        >
          <span>{FacilitiesMutation.isLoading ? r.sending : r.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default RecruitmentFacilities;
