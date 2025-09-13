"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import Location from "../assets/icons/location.svg";
import Category from "../assets/icons/Category.svg";
import Search from "../assets/icons/search.svg";
import { categories } from "@/data/mock";
import {
  animateCategoryPanelIn,
  animateCategoryPanelOut,
  animateLocationPanelIn,
  animateLocationPanelOut,
  animateSubcategoryPanelIn,
} from "@/utils/animationUtils";
const MainSearchbar = () => {
  const dic = useTranslation();
  const n = dic.navbar;
  const [uiState, setUiState] = useState("default");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const containerRef = useRef(null);
  const categoryPanelRef = useRef(null);
  const locationPanelRef = useRef(null);
  const categorySubPanelRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !isAnimating
      ) {
        closeAllPanels();
      }
    };

    if (uiState !== "default") {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [uiState, isAnimating]);

  useEffect(() => {
    if (uiState === "category") {
      animateCategoryPanelIn(categoryPanelRef, setIsAnimating);
    } else if (uiState === "location") {
      animateLocationPanelIn(locationPanelRef, setIsAnimating);
    }
  }, [uiState]);

  useEffect(() => {
    if (hoveredCategory && uiState === "category") {
      animateSubcategoryPanelIn(categorySubPanelRef);
    }
  }, [hoveredCategory, uiState]);

  const closeAllPanels = async () => {
    if (isAnimating) return;

    if (uiState === "category") {
      await animateCategoryPanelOut(categoryPanelRef, setIsAnimating);
    } else if (uiState === "location") {
      await animateLocationPanelOut(locationPanelRef, setIsAnimating);
    }

    setUiState("default");
    setHoveredCategory(null);
    setIsCategoryHovered(false);
  };

  const handleCategoryButtonClick = () => {
    if (isAnimating) return;

    if (uiState === "category") {
      closeAllPanels();
    } else {
      if (uiState === "location") {
        animateLocationPanelOut(locationPanelRef, setIsAnimating).then(() => {
          setUiState("category");
        });
      } else {
        setUiState("category");
      }
    }
  };

  const handleCategoryButtonHover = () => {
    if (isAnimating) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsCategoryHovered(true);

    if (uiState !== "category") {
      if (uiState === "location") {
        animateLocationPanelOut(locationPanelRef, setIsAnimating).then(() => {
          setUiState("category");
        });
      } else {
        setUiState("category");
      }
    }
  };

  const handleCategoryButtonLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isCategoryHovered) {
        closeAllPanels();
      }
    }, 400);
  };

  const handleCategoryPanelHover = () => {
    if (isAnimating) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsCategoryHovered(true);

    if (uiState !== "category") {
      setUiState("category");
    }
  };

  const handleCategoryPanelLeave = () => {
    setIsCategoryHovered(false);

    hoverTimeoutRef.current = setTimeout(() => {
      if (uiState === "category") {
        closeAllPanels();
      }
    }, 100);
  };

  const handleSearchFocus = () => {
    if (isAnimating) return;

    if (uiState !== "location") {
      if (uiState === "category") {
        animateCategoryPanelOut().then(() => {
          setUiState("location");
        });
      } else {
        setUiState("location");
      }
    }
  };

  const handleOverlayClick = () => {
    if (!isAnimating) {
      closeAllPanels();
    }
  };

  const handleItemClick = () => {
    if (!isAnimating) {
      closeAllPanels();
    }
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (uiState === "category") {
      animateCategoryPanelIn(categoryPanelRef, setIsAnimating);
    } else if (uiState === "location") {
      animateLocationPanelIn(locationPanelRef, setIsAnimating);
    } else {
      if (categoryPanelRef.current) {
        categoryPanelRef.current.style.display = "none";
      }
      if (locationPanelRef.current) {
        locationPanelRef.current.style.display = "none";
      }
    }
  }, [uiState]);

  return (
    <>
      {uiState !== "default" && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          style={{ top: "80px" }}
          onClick={handleOverlayClick}
        />
      )}

      <div
        className="w-full items-center lg:flex justify-between relative gap-4 z-50 hidden "
        ref={containerRef}
      >
        <button
          onClick={handleCategoryButtonClick}
          onMouseEnter={handleCategoryButtonHover}
          onMouseLeave={handleCategoryButtonLeave}
          className="category-hover-element cursor-pointer flex-1 text-secondary font-semibold flex items-center gap-2"
        >
          <div className="bg-primary-50 p-3 rounded-2xl">
            <Category className="fill-primary-500" />
          </div>
          {n.categories}
        </button>

        <div className="w-full flex-4 relative">
          <div className="absolute -translate-y-1/2 top-1/2 fill-gray-500 start-4">
            <Search />
          </div>
          <Input
            onFocus={handleSearchFocus}
            className={`flex-4 bg-surface border border-default-divider py-5 placeholder:px-2 px-12`}
            type="search"
            placeholder={n.search}
          />
          <div className="absolute ltr:right-2 rtl:left-2 -translate-y-1/2 top-1/2 flex items-center">
            <div className="px-4">
              <Location className="fill-gray-500" />
            </div>
            <Select>
              <SelectTrigger className="flex-1 ltr:border-r-0 ltr:border-l ltr:border-l-primary-400 bg-transparent data-[placeholder]:text-gray-500 text-md rtl:border-r rtl:border-l-0 rtl:border-r-primary-400">
                <SelectValue placeholder={n.select_location} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className={`rtl:text-right`}>
                    North America
                  </SelectLabel>
                  <SelectItem value="est">
                    Eastern Standard Time (EST)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Select>
          <SelectTrigger className="flex-1 border-0">
            <SelectValue placeholder={n.select_nationality} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className={`rtl:text-right`}>
                North America
              </SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div
          ref={locationPanelRef}
          className="absolute start-0 top-12 h-80 w-full bg-surface text-secondary z-50 rounded-lg shadow-lg hidden"
        >
          <ScrollArea className="w-full rtl:text-right h-full rounded-md border p-4">
            <div className="space-y-2">
              {[
                "New York",
                "London",
                "Tokyo",
                "Paris",
                "Sydney",
                "Berlin",
                "Moscow",
                "Beijing",
              ].map((location) => (
                <div
                  key={location}
                  className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleItemClick}
                >
                  {location}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div
          ref={categoryPanelRef}
          onMouseEnter={handleCategoryPanelHover}
          onMouseLeave={handleCategoryPanelLeave}
          className="category-hover-element absolute start-0 top-12 rtl:text-right h-100 w-full bg-surface z-50 flex rounded-lg shadow-lg "
        >
          <ScrollArea className="w-72 h-full ltr:border-r ltr:border-r-gray-200 rtl:border-r-0 rtl:border-l rtl:border-l-gray-200">
            <div className="space-y-0">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="p-4 cursor-pointer hover:bg-primary-50 ltr:hover:border-r-4 ltr:hover:border-r-Primary-400 rtl:hover:border-l-primary-400 rtl:border-r-0 flex items-center  gap-2 text-lg rtl:hover:border-r-0 rtl:hover:border-l-4 transition-all rtl:hover:border-l-Primary-400 duration-200 rtl:flex-row-reverse rtl:justify-start hover:bg-Primary-50"
                  onMouseEnter={() => setHoveredCategory(category)}
                  onClick={handleItemClick}
                >
                  <div>{category.icon}</div>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {hoveredCategory && (
            <ScrollArea
              ref={categorySubPanelRef}
              className="w-full h-full bg-surface border-l border-gray-200"
            >
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  {hoveredCategory.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {hoveredCategory.subcategories.map((subcategory) => (
                    <div
                      key={subcategory}
                      className="p-2 rounded-md cursor-pointer text-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={handleItemClick}
                    >
                      {subcategory}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </>
  );
};

export default MainSearchbar;
