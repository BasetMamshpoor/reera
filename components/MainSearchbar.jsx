"use client";
import React, {useState, useRef, useEffect} from "react";

import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import Category from "../assets/icons/Category.svg";
import Search from "../assets/icons/search.svg";
import {
    animateCategoryPanelIn,
    animateCategoryPanelOut,
    animateLocationPanelIn,
    animateLocationPanelOut,
    animateSubcategoryPanelIn,
} from "@/utils/animationUtils";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import SelectLocationComponent from "@/components/layout/Searchbar/SelectLocationComponent";
import {useParams, useRouter} from "next/navigation";
import {useCategories} from "@/app/[locale]/CategoryProvider";
import Link from "next/link";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";

const MainSearchbar = ({}) => {
    const dic = useTranslation();
    const n = dic.navbar;
    const {categories, isLoading, error} = useCategories();
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
    const {locale} = useParams();
    const { search, setSearch } = useGlobalSearch();
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

    const getAllSubcategories = (category) => {
        const subcategories = [];

        const collectSubcategories = (items) => {
            items.forEach((item) => {
                if (item.title) {
                    subcategories.push(item);
                }
                if (item.children && item.children.length > 0) {
                    collectSubcategories(item.children);
                }
            });
        };

        if (category.children) {
            collectSubcategories(category.children);
        }

        return subcategories;
    };

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
                    <div className="absolute -translate-y-1/2 top-1/2 fill-Gray-500 start-4">
                        <Search/>
                    </div>
                    <Input
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        onFocus={handleSearchFocus}
                        className="flex-4 bg-surface border border-default-divider py-5 placeholder:px-2 px-12"
                        type="search"
                        placeholder={n.search}
                    />
                </div>
                <SelectLocationComponent/>
                <div
                    ref={categoryPanelRef}
                    onMouseEnter={handleCategoryPanelHover}
                    onMouseLeave={handleCategoryPanelLeave}
                    className="category-hover-element absolute start-0 top-12 rtl:text-right h-100 w-full bg-surface z-50 flex rounded-lg shadow-lg"
                >
                    <ScrollArea
                        className="w-72 h-full ltr:border-r ltr:border-r-gray-200 rtl:border-r-0 rtl:border-l rtl:border-l-gray-200">
                        <div className="space-y-0">
                            {categories?.map((category) => (
                                <div
                                    key={category.id}
                                    className="p-4 cursor-pointer hover:bg-primary-50  flex items-center gap-2 text-lg  transition-all duration-200 rtl:flex-row-reverse rtl:justify-start ltr:hover:border-r-4 ltr:hover:border-r-Primary-400 rtl:hover:border-r-0 rtl:hover:border-l-4 rtl:hover:border-l-Primary-400 hover:bg-Primary-50"
                                    onMouseEnter={() => setHoveredCategory(category)}
                                    onClick={handleItemClick}
                                >
                                    <span>{category.title}</span>
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
                                    {hoveredCategory.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {getAllSubcategories(hoveredCategory)?.map(
                                        (subcategory, index) => (
                                            <Link
                                                href={`/${locale}/ads/${hoveredCategory.slug}/?category=${encodeURIComponent(subcategory.id)}`}
                                                key={subcategory.id}
                                                className="p-2 rounded-md cursor-pointer text-lg hover:bg-Primary-50 transition-colors duration-200"
                                                onClick={closeAllPanels}
                                            >
                                                {subcategory.title}
                                            </Link>
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
