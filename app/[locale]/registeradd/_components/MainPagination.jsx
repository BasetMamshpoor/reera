"use client";
import React, { useState } from "react";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { ChevronLeft } from "lucide-react";
import Search from "@/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import DesktopPagination from "./DesktopPagination";
import AdForm from "./AdForm";
import MapComponent from "./MapComponent";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useEffect } from "react";
import LocationForm from "./LocationForm";
import Facilities from "./Facilities";
import UploadPics from "./UploadPics";
import ContactInfo from "./ContactInfo";
import Conditions from "./Conditions";

export default function CategorySelector() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [path, setPath] = useState([
    {
      title: "دسته‌بندی‌ها",
      children: [], // Start with empty array, will be populated from API
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [position, setPosition] = useState({
    latitude: 35.6892,
    longitude: 51.389,
  });
  const [positionClicked, setPositionClicked] = useState(true);

  // Fetch categories data
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["housingCategories"],
    queryFn: () =>
      request({
        url: "/store/housing",
      }),
  });

  // Initialize path with fetched data
  useEffect(() => {
    if (categoriesData?.data?.categories?.length) {
      setPath([
        {
          title: "دسته‌بندی‌ها",
          children: categoriesData.data.categories,
        },
      ]);
    }
  }, [categoriesData]);

  const currentLevel = path[path.length - 1];

  const handleSelect = (item) => {
    if (item.children && item.children.length > 0) {
      setPath((prev) => [...prev, item]);
    } else {
      console.log("✅ Selected final category:", item);
      setSelectedCategory(item);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1));
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories: {error.message}</div>;
  }

  return (
    <>
      <div className="w-full max-w-[1024px] mt-10 lg:mt-22 flex lg:flex-row flex-col mx-auto">
        <DesktopPagination
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {currentStep === 1 && (
          <>
            <div className="relative group w-full lg:hidden block py-4">
              <Search className="absolute top-1/2 -translate-y-1/2 right-2 fill-[#A4A6B0] group-focus-within:opacity-0 dark:fill-white" />
              <Input
                className={`w-full max-w-4xl placeholder:px-6 placeholder:text-[#A4A6B0] placeholder:group-focus-within:opacity-0 dark:placeholder:text-white py-6 rounded-xl focus:placeholder:opacity-0`}
                placeholder="جستجو"
              />
            </div>

            <div className="bg-white w-full rounded-lg lg:p-8 dark:bg-[#292D32] ">
              <div className="flex items-center justify-between ">
                <Breadcrumb className="lg:block hidden py-4 text-right">
                  <BreadcrumbList>
                    {path.slice(1).map((item, index) => (
                      <React.Fragment key={item.id ?? index}>
                        <BreadcrumbItem>
                          {index === path.length - 2 ? (
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPath((prev) => prev.slice(0, index + 2));
                              }}
                            >
                              {item.title}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < path.length - 2 && (
                          <ArrowLeft className="dark:fill-white" />
                        )}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
                {path.length > 1 ? (
                  <button
                    onClick={handleBack}
                    className="lg:flex items-center gap-1 text-sm text-[#4299C1] cursor-pointer hidden"
                  >
                    <ArrowRight className="w-4 h-4 fill-[#4299C1] ltr:rotate-180" />
                    بازگشت
                  </button>
                ) : (
                  <div />
                )}
              </div>
              <div className="lg:mb-6">
                <div className="relative group w-full lg:block hidden">
                  <Search className="absolute top-1/2 -translate-y-1/2 right-2 fill-[#A4A6B0] group-focus-within:opacity-0" />
                  <Input
                    className={`w-full max-w-4xl placeholder:px-6 placeholder:text-[#A4A6B0] focus:placeholder:opacity-0`}
                    placeholder="جستجو"
                  />
                </div>
              </div>

              {currentLevel.children.length > 0 ? (
                <ul className="space-y-3 bg-[#F6F6F7] dark:bg-[#18202A] rounded-lg">
                  {currentLevel.children.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="flex items-center justify-between px-6 py-4 rounded-md cursor-pointer"
                    >
                      <span className="text-md">{item.title}</span>
                      {item.children && item.children.length > 0 && (
                        <ArrowLeft className="w-4 h-4 dark:fill-white fill-black ltr:rotate-180" />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center">No categories found</div>
              )}
            </div>
          </>
        )}
        {currentStep === 2 && (
          <AdForm
            selectedCategory={selectedCategory}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <>
            {!positionClicked ? (
              <MapComponent
                position={position}
                setPosition={setPosition}
                setPositionClicked={setPositionClicked}
              />
            ) : (
              <LocationForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            )}
          </>
        )}
        {currentStep === 4 && <Facilities setCurrentStep={setCurrentStep} />}
        {currentStep === 5 && <UploadPics setCurrentStep={setCurrentStep} />}
        {currentStep === 6 && <ContactInfo setCurrentStep={setCurrentStep} />}
        {currentStep === 7 && <Conditions />}
      </div>
    </>
  );
}
