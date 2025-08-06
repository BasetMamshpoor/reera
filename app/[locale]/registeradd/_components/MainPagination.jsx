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
const categoryTree = [
  {
    id: 1,
    title: "املاک",
    slug: "amlak",
    children: [
      {
        id: 2,
        title: "خرید و فروش",
        children: [
          { id: 6, title: "آپارتمان", children: [] },
          { id: 7, title: "ویلا", children: [] },
          { id: 8, title: "خوابگاه", children: [] },
          { id: 9, title: "سوییت", children: [] },
          { id: 10, title: "اتاق", children: [] },
        ],
      },
      {
        id: 3,
        title: "اجاره کوتاه مدت",
        children: [
          {
            id: 13,
            title: "اجاره کوتاه مدت دفتر کار و فضای آموزشی",
            children: [],
          },
          { id: 14, title: "اجاره کوتاه مدت ویلا و باغ", children: [] },
          { id: 15, title: "اجاره کوتاه مدت آپارتمان و سوییت", children: [] },
        ],
      },
      {
        id: 4,
        title: "اجاره بلند مدت",
        children: [
          { id: 16, title: "اجاره آپارتمان", children: [] },
          { id: 17, title: "اجره خانه و ویلا", children: [] },
        ],
      },
      {
        id: 5,
        title: "هم خانه",
        children: [],
      },
    ],
  },
  {
    id: 20,
    title: "وسایل نقلیه",
    slug: "vehicles",
    children: [
      {
        id: 21,
        title: "خودرو",
        children: [
          { id: 22, title: "سواری", children: [] },
          { id: 23, title: "وانت", children: [] },
        ],
      },
      {
        id: 24,
        title: "موتورسیکلت",
        children: [],
      },
    ],
  },
  {
    id: 30,
    title: "کالای دیجیتال",
    slug: "digital",
    children: [],
  },
];

export default function CategorySelector() {
  const [currentStep, setCurrentStep] = React.useState(4);
  const [path, setPath] = useState([
    {
      title: "دسته‌بندی‌ها",
      children: categoryTree,
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [position, setPosition] = useState({
    latitude: 35.6892, // default to Tehran
    longitude: 51.389,
  });
  const [positionClicked, setPositionClicked] = useState(true);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["housingCategories"],
    queryFn: () =>
      request({
        url: "/store/housing",
      }),
  });
  useEffect(() => {
    if (data?.data?.categories?.length) {
      setPath([
        {
          title: "دسته‌بندی‌ها",
          children: data.data.categories,
        },
      ]);
    }
  }, [data]);
  const currentLevel = path[path.length - 1];
  const handleSelect = (item) => {
    if (item.children && item.children.length > 0) {
      setPath((prev) => [...prev, item]);
    } else {
      console.log("✅ Selected final category:", item);
      setSelectedCategory(item);
      console.log(selectedCategory); // Save here
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (path.length > 1) {
      setPath((prev) => prev.slice(0, -1));
    }
  };

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
                className={`w-full max-w-4xl placeholder:px-6 placeholder:text-[#A4A6B0] placeholder:group-focus-within:opacity-0 dark:placeholder:text-white py-6 rounded-xl`}
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
                                // Trim the path to this level
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
                    className="lg:flex items-center gap-1 text-sm text-[#4299C1]  hidden"
                  >
                    <ArrowRight className="w-4 h-4 fill-[#4299C1] " />
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
                    className={`w-full max-w-4xl placeholder:px-6 placeholder:text-[#A4A6B0] placeholder:group-focus-within:opacity-0`}
                    placeholder="جستجو"
                  />
                </div>
              </div>

              <ul className="space-y-3 bg-[#F6F6F7] dark:bg-[#18202A] rounded-lg">
                {currentLevel.children.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center justify-between  px-6 py-4 rounded-md cursor-pointer  "
                  >
                    <span className="text-md">{item.title}</span>
                    {item.children && item.children.length > 0 && (
                      <ArrowLeft className="w-4 h-4 dark:fill-white fill-black" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <AdForm
              selectedCategory={selectedCategory}
              setCurrentStep={setCurrentStep}
            />
          </>
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
              <>
                <LocationForm
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </>
            )}
          </>
        )}
        {currentStep === 4 && (
          <>
            <Facilities />
          </>
        )}
      </div>
    </>
  );
}
