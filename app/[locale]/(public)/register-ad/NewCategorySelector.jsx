"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useRef,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Search from "@/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
import DesktopPagination from "./_components/common/DesktopPagination";
import usePersistentSession from "@/hooks/usePersistentSession";
import { categoryFlows, slugMap } from "./categoryFlow";
import {
  animateCategoryList,
  animateCategoryItems,
  animateClickEffect,
} from "@/utils/categoryAnimation";
import Breadcrumbs from "./Breadcrumbs";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useTranslation } from "../../TranslationContext";
gsap.registerPlugin(useGSAP);

export const FormContext = createContext(null);

export default function CategorySelector() {
  const [currentStep, setCurrentStep] = useState(1);
  const [path, setPath] = useState([{ title: "دسته‌بندی‌ها", children: [] }]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [apiResponseData, setApiResponseData] = useState(null);
  const dic = useTranslation();
  const c = dic.register_ad;
  const [searchQuery, setSearchQuery] = useState("");
  const [slug, setSlug] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [kitchenTitle, setKitchenTitle] = useState("");
  const router = useRouter();
  const storageKey = `registerForm_${slug}`;
  const [formData, setFormData, clearFormData] = usePersistentSession(
    storageKey,
    {},
    { debounceMs: 500 }
  );
  const listRef = useRef(null);
  const categoryItemsRef = useRef([]);
  const { locale } = useParams();
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await request({ url: "/store/housing" }),
  });

  const updateFormData = (sectionKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...(prev?.[sectionKey] || {}),
        ...value,
      },
    }));
  };

  useEffect(() => {
    if (categoriesData?.data?.categories) {
      setPath([
        { title: "دسته‌بندی‌ها", children: categoriesData.data.categories },
      ]);
    }
  }, [categoriesData]);

  const currentLevel = path[path.length - 1];

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return currentLevel.children;
    return currentLevel.children.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentLevel.children, searchQuery]);

  useGSAP(() => {
    if (filteredCategories.length > 0) {
      animateCategoryList(listRef);
      animateCategoryItems(categoryItemsRef);
    }
  }, [filteredCategories, currentLevel]);

  useEffect(() => {
    categoryItemsRef.current = categoryItemsRef.current.slice(
      0,
      filteredCategories.length
    );
  }, [filteredCategories]);

  function handleSelect(item) {
    const clickedIndex = filteredCategories.findIndex(
      (cat) => cat.id === item.id
    );

    const animateClick = () => {
      if (item.children?.length) {
        setPath((prev) => [...prev, item]);
        setSearchQuery("");
        return;
      }

      const root = path[1];
      const key = root?.slug ?? root?.id ?? "default";
      setSelectedCategory(item);
      setSlug(item.slug || key);
      setCurrentStep(2);
    };

    if (clickedIndex !== -1 && categoryItemsRef.current[clickedIndex]) {
      gsap.to(categoryItemsRef.current[clickedIndex], {
        scale: 0.95,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        duration: 0.2,
        onComplete: animateClick,
      });
    } else {
      animateClick();
    }
  }

  function handleBack() {
    gsap.to(listRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (path.length > 1) {
          setPath((prev) => prev.slice(0, -1));
          setSearchQuery("");
          setSlug(null);
        }
      },
    });
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  function renderFormStep() {
    const stepIndex = currentStep - 2;
    const slugMap = {
      housemate: "housing",
    };
    const normalizedSlug = slugMap[slug] || slug || "default";
    const flow = categoryFlows[normalizedSlug];
    if (!flow || stepIndex < 0) return null;
    if (stepIndex >= flow.length) return <div>تمام مراحل انجام شد</div>;

    const { component: Comp, props = {} } = flow[stepIndex];

    return (
      <Comp
        {...props}
        apiResponseData={apiResponseData}
        setApiResponseData={setApiResponseData}
        selectedCategory={selectedCategory}
        setCurrentStep={setCurrentStep}
      />
    );
  }
  const steps = categoryFlows[slug] ?? [];

  const paginationLabels = [
    "دسته‌بندی‌ها",
    ...steps.map((step, i) => step.component.name || `Step ${i + 1}`),
  ];

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <FormContext.Provider
      value={{
        apiResponseData,
        setApiResponseData,
        currentStep,
        setCurrentStep,
        selectedCategory,
        categoryID,
        slug,
        setSlug,
        kitchenTitle,
        formData,
        clearFormData,
        updateFormData,
      }}
    >
      <div className="w-full max-w-[1024px] mt-10 flex lg:flex-row flex-col mx-auto">
        <DesktopPagination
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          labels={paginationLabels}
        />

        {currentStep === 1 ? (
          <>
            {/* Mobile Search */}
            <div className="relative group w-full lg:hidden block py-4">
              <Search className="absolute top-1/2 -translate-y-1/2 left-2 fill-Gray-500" />
              <Input
                value={searchQuery}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
                placeholder={c.search_in_categories}
                className="w-full py-6 rounded-xl px-12"
              />
            </div>

            <div className="bg-surface w-full rounded-lg lg:p-8">
              <div className="flex items-center justify-between">
                <Breadcrumbs
                  path={path}
                  onClickBack={(index) =>
                    setPath((prev) => prev.slice(0, index + 2))
                  }
                />

                {path.length > 1 ? (
                  <button
                    onClick={handleBack}
                    className="lg:flex items-center gap-1 text-sm text-[#4299C1] hidden cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 fill-[#4299C1] ltr:rotate-180" />
                    {c.back}
                  </button>
                ) : (
                  <div />
                )}
              </div>
              {/* Desktop Search */}
              <div className="lg:mb-6 hidden lg:block">
                <div className="relative w-full">
                  <Search className="absolute top-1/2 -translate-y-1/2 start-2 fill-Gray-500" />
                  <Input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onSubmit={handleSearchSubmit}
                    placeholder={c.search_in_categories}
                    className="w-full py-5 px-12 rounded-xl"
                  />
                </div>
              </div>

              {filteredCategories.length > 0 ? (
                <ul ref={listRef} className="space-y-3 bg-Surface-2 rounded-lg">
                  {filteredCategories.map((item, index) => (
                    <li
                      key={item.id}
                      ref={(el) => (categoryItemsRef.current[index] = el)}
                      onClick={() => {
                        handleSelect(item);
                        setCategoryID(item.id);
                        setSlug(item.slug);

                        setKitchenTitle(item.title);
                      }}
                      className="flex items-center justify-between px-6 py-4 rounded-md cursor-pointer "
                    >
                      <span>{item.title}</span>
                      {item.children?.length > 0 && (
                        <ArrowLeft className="w-4 h-4 fill-alpha-100 ltr:rotate-180" />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center bg-Surface-2 rounded-lg"></div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full">{renderFormStep()}</div>
        )}
      </div>
    </FormContext.Provider>
  );
}
