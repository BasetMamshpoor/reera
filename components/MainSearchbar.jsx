"use client";
import React, {useState, useRef, useEffect} from "react";

import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import Category from "../assets/icons/Category.svg";
import Search from "../assets/icons/search.svg";
import {useForm} from "react-hook-form";
import {
    animateCategoryPanelIn,
    animateCategoryPanelOut,
    animateLocationPanelIn,
    animateLocationPanelOut,
    animateSubcategoryPanelIn,
} from "@/utils/animationUtils";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {ReusableDialog} from "@/components/modified_shadcn/Dialog";
import SelectLocationComponent from "@/components/layout/Searchbar/SelectLocationComponent";
import {useParams, useRouter} from "next/navigation";

const MainSearchbar = ({categories}) => {
    const dic = useTranslation();
    const n = dic.navbar;
    const {setValue, watch} = useForm({});

    const [uiState, setUiState] = useState("default");
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCategoryHovered, setIsCategoryHovered] = useState(false);
    const openTimeoutRef = useRef(null);
    const containerRef = useRef(null);
    const categoryPanelRef = useRef(null);
    const locationPanelRef = useRef(null);
    const categorySubPanelRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const hasMounted = useRef(false);
    const router = useRouter();
    const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
    const {locale} = useParams();
    const {data: countriesData} = useQuery({
        queryKey: ["countries-data"],
        queryFn: async () =>
            await request({
                url: "/getCountries",
            }),
    });

    // Handle outside click
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

    // Handle panel animations
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

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

    // Animate subcategory panel
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

        openTimeoutRef.current = setTimeout(() => {
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
        }, 200);
    };

    const handleSubcategoryClick = (subcategory) => {
        if (!hoveredCategory) return; // safety check
        const slug = hoveredCategory.slug;

        // Close panels if you want
        closeAllPanels();

        // Navigate with query
        router.push(
            `/${locale}/ads/${slug}/?category=${encodeURIComponent(subcategory)}`
        );
    };

    const handleCategoryButtonLeave = () => {
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
            openTimeoutRef.current = null;
        }

        hoverTimeoutRef.current = setTimeout(() => {
            if (!isCategoryHovered) {
                closeAllPanels();
            }
        }, 200);
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
                animateCategoryPanelOut(categoryPanelRef, setIsAnimating).then(() => {
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

    // Helper function to get all subcategories recursively
    const getAllSubcategories = (category) => {
        const subcategories = [];

        const collectSubcategories = (items) => {
            items.forEach((item) => {
                if (item.title) {
                    subcategories.push(item.title);
                }
                if (item.subcategories && item.subcategories.length > 0) {
                    collectSubcategories(item.subcategories);
                }
            });
        };

        if (category.subcategories) {
            collectSubcategories(category.subcategories);
        }

        return subcategories;
    };

    // Clean up timeouts
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        };
    }, []);

    return (
        <>
            {uiState !== "default" && (
                <div
                    className="fixed inset-0 bg-black/20 z-40"
                    style={{top: "80px"}}
                    onClick={handleOverlayClick}
                />
            )}

            <div
                className="w-full items-center lg:flex justify-between relative gap-4 z-50 hidden "
                ref={containerRef}
            >
                {/* Category button */}
                <button
                    onClick={handleCategoryButtonClick}
                    onMouseEnter={handleCategoryButtonHover}
                    onMouseLeave={handleCategoryButtonLeave}
                    className="category-hover-element cursor-pointer flex-1 text-secondary font-semibold flex items-center gap-2"
                >
                    <div className="bg-primary-50 p-3 rounded-2xl">
                        <Category className="fill-red-500"/>
                    </div>
                    {n.categories}
                </button>

                {/* Search + location select */}
                <div className="w-full flex-4 relative">
                    <div className="absolute -translate-y-1/2 top-1/2 fill-gray-500 start-4">
                        <Search/>
                    </div>
                    <Input
                        onFocus={handleSearchFocus}
                        className="flex-4 bg-surface border border-default-divider py-5 placeholder:px-2 px-12"
                        type="search"
                        placeholder={n.search}
                    />
                </div>

                <ReusableDialog
                    contentProps={{
                        className: "w-full max-w-160",
                    }}
                    open={isLocationPanelOpen}
                    setOpen={setIsLocationPanelOpen}
                    trigger={
                        <button
                            onClick={() => setIsLocationPanelOpen(true)}
                            className="w-full max-w-62 border border-default-divider rounded-md py-2 cursor-pointer transition-all ease-in-out duration-200 hover:bg-Primary-100"
                        >
                            {n.select_location}
                        </button>
                    }
                >
                    <div className="p-4">
                        <h2 className="text-xl font-bold">انتخاب موقعیت</h2>
                        <SelectLocationComponent
                            setIsLocationPanelOpen={setIsLocationPanelOpen}
                        />
                    </div>
                </ReusableDialog>

                {/* Location panel */}
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
                    className="category-hover-element absolute start-0 top-12 rtl:text-right h-100 w-full bg-surface z-50 flex rounded-lg shadow-lg hidden"
                >
                    <ScrollArea
                        className="w-72 h-full ltr:border-r ltr:border-r-gray-200 rtl:border-r-0 rtl:border-l rtl:border-l-gray-200">
                        <div className="space-y-0">
                            {categories.map((category) => (
                                <div
                                    key={category.id || category.name}
                                    className="p-4 cursor-pointer hover:bg-primary-50  flex items-center gap-2 text-lg  transition-all duration-200 rtl:flex-row-reverse rtl:justify-start ltr:hover:border-r-4 ltr:hover:border-r-Primary-400 rtl:hover:border-r-0 rtl:hover:border-l-4 rtl:hover:border-l-Primary-400 hover:bg-Primary-50"
                                    onMouseEnter={() => setHoveredCategory(category)}
                                    onClick={handleItemClick}
                                >
                                    <div>{category.icon}</div>
                                    <span>{category.name || category.title}</span>
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
                                    {hoveredCategory.name || hoveredCategory.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {getAllSubcategories(hoveredCategory).map(
                                        (subcategory, index) => (
                                            <div
                                                key={`${subcategory}-${index}`}
                                                className="p-2 rounded-md cursor-pointer text-lg hover:bg-Primary-50 transition-colors duration-200"
                                                onClick={() => handleSubcategoryClick(subcategory)}
                                            >
                                                {subcategory}
                                            </div>
                                        )
                                    )}
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
