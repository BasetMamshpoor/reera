"use client";
import React, {useState, useEffect, useRef, useCallback} from "react";
import Image from "next/image";
import Home from "@/assets/icons/home-hashtag.svg";
import Location from "@/assets/icons/location.svg";
import GreenTick from "@/assets/icons/tick-circle.svg";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Link from "next/link";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Card from "@/app/[locale]/(public)/ads/_components/Card";

const Advertisements = ({isOnProfile = false}) => {
    const dic = useTranslation();
    const ads = dic.ads;
    const {locale} = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const queryClient = useQueryClient();
    const loaderRef = useRef(null);

    // initial page from URL or default to 1
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [showPagination, setShowPagination] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage);

    // ---------- Infinite Query (no setState inside getNextPageParam) ----------
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["all-ads-infinite"],
        queryFn: async ({pageParam = 1}) => {
            const response = await request({
                url: `/ads?page=${pageParam}`,
                method: "get",
            });
            // make sure response shape matches what the component expects:
            // { data: [...], last_page: X, total: Y }
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            // stop if last page had no data
            if (!lastPage?.data?.length) return undefined;
            const nextPage = allPages.length + 1;
            return lastPage.last_page >= nextPage ? nextPage : undefined;
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
    });

    // helper values
    const loadedPagesCount = data?.pages?.length ?? 0;
    const totalPages = data?.pages?.[0]?.last_page ?? 1;
    const totalAds = data?.pages?.[0]?.total ?? 0;

    // ---------- When 3 or more pages are loaded, switch to pagination mode ----------
    useEffect(() => {
        if (loadedPagesCount >= 3 && !showPagination) {
            setShowPagination(true);
            // set current page to the last loaded page (so active page = 3)
            setCurrentPage(loadedPagesCount);
            // also update URL page param to reflect current page
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(loadedPagesCount));
            router.replace(`?${params.toString()}`, {scroll: false});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedPagesCount]);

    // ---------- Sync URL when currentPage changes in pagination mode ----------
    useEffect(() => {
        if (showPagination) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(currentPage));
            router.replace(`?${params.toString()}`, {scroll: false});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, showPagination]);

    // ---------- Update URL in infinite mode as pages are loaded ----------
    useEffect(() => {
        if (!showPagination && loadedPagesCount > 0) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(loadedPagesCount));
            router.replace(`?${params.toString()}`, {scroll: false});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedPagesCount, showPagination]);

    // ---------- Intersection Observer for infinite scroll ----------
    const handleObserver = useCallback(
        (entries) => {
            const [target] = entries;
            if (
                target.isIntersecting &&
                hasNextPage &&
                !isFetchingNextPage &&
                !showPagination
            ) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage, showPagination]
    );

    useEffect(() => {
        if (showPagination) return; // don't observe when in pagination mode

        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "100px",
            threshold: 0.1,
        });

        const currentLoader = loaderRef.current;
        if (currentLoader) observer.observe(currentLoader);

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
        };
    }, [handleObserver, showPagination]);

    // ---------- Utility: fetch a specific page and insert into infinite query data ----------
    const fetchAndInsertPage = async (pageNumber) => {
        // if already loaded, nothing to do
        if (data?.pages?.[pageNumber - 1]) return;

        try {
            const pageData = await request({
                url: `/ads?page=${pageNumber}`,
                method: "get",
            });

            // Safely update the infinite query cache
            queryClient.setQueryData(["all-ads-infinite"], (old) => {
                // old usually has shape: { pages: [...], pageParams: [...] }
                const prev = old ?? {pages: [], pageParams: []};

                // create a new pages array sized at least pageNumber
                const newPages = [...(prev.pages ?? [])];
                // fill missing indices with null placeholders if necessary
                while (newPages.length < pageNumber - 1) {
                    newPages.push({data: []});
                }
                // insert the fetched page at the right index
                newPages[pageNumber - 1] = pageData;

                // we don't rely on pageParams here, keep existing or set simple array
                const newPageParams = prev.pageParams ?? [];

                return {
                    ...prev,
                    pages: newPages,
                    pageParams: newPageParams,
                };
            });
        } catch (e) {
            // swallow or optionally set an error state; for now just console
            // you may show a toast here if desired
            // console.error("Failed to fetch page", pageNumber, e);
        }
    };

    // ---------- Pagination handlers ----------
    const handlePageChange = async (page) => {
        if (page < 1) return;
        if (page > totalPages) return;

        // If switching to pagination mode from infinite, ensure we're in pagination mode
        if (!showPagination) {
            setShowPagination(true);
        }

        // If requested page is not loaded, fetch and insert it
        if (!data?.pages?.[page - 1]) {
            await fetchAndInsertPage(page);
        }

        // set the active page
        setCurrentPage(page);
        // scroll to top for better UX
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    // ---------- Page number generator (with dots) ----------
    const generatePageNumbers = () => {
        const tp = totalPages || 1;
        const current = currentPage;
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= tp; i++) {
            if (
                i === 1 ||
                i === tp ||
                (i >= current - delta && i <= current + delta)
            ) {
                range.push(i);
            }
        }

        let prev;
        for (let i of range) {
            if (prev) {
                if (i - prev === 2) rangeWithDots.push(prev + 1);
                else if (i - prev !== 1) rangeWithDots.push("...");
            }
            rangeWithDots.push(i);
            prev = i;
        }

        return rangeWithDots;
    };

    const pageNumbers = generatePageNumbers();

    // ---------- Determine which ads to display ----------
    // If in pagination mode: show the page's items (ensure that page exists)
    // If not in pagination mode: flatten and show all loaded ads
    const allLoadedAds = data?.pages?.flatMap((p) => p.data) ?? [];
    const adsToShow = showPagination
        ? data?.pages?.[currentPage - 1]?.data ?? []
        : allLoadedAds;

    // ---------- Render ----------
    return (
        <>
            {!isOnProfile && (
                <div className="flex flex-row items-center justify-between mt-12 px-4 lg:px-0">
                    <div className="flex flex-row items-center gap-4">
                        <h2 className="text-[#000000] dark:text-[#D9EDF4] font-[600] text-2xl">
                            {ads.reera_ads}
                        </h2>
                        <span className="text-sm text-gray-500">
              {showPagination
                  ? `(صفحه ${currentPage} از ${totalPages})`
                  : "(بارگذاری خودکار)"}
            </span>
                    </div>
                    <Link
                        href={`/${locale}/ads/all-ads`}
                        className="flex flex-row gap-2 cursor-pointer items-center justify-center"
                    >
                        <span className="font-[600] text-sm">{ads.view_all}</span>
                        <ChevronLeft className="ltr:rotate-180"/>
                    </Link>
                </div>
            )}

            <div
                className={`grid grid-cols-1 gap-y-10 mt-10 overflow-hidden sm:grid-cols-2 sm:gap-x-4 px-6 xl:px-0 ${
                    isOnProfile ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } lg:gap-x-6`}
            >
                {adsToShow?.map((ad) => (
                    <Card key={ad.id} i={ad} link={`/${locale}/ads`}/>
                ))}
            </div>

            {!showPagination && (
                <div ref={loaderRef} className="py-8">
                    {isFetchingNextPage && (
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col items-center gap-4">
                                <div
                                    className="w-8 h-8 border-4 border-Primary-400 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    در حال بارگذاری آگهی‌های بیشتر...
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Pagination Component (shows when we have many items) */}
            {showPagination && totalPages > 1 && (
                <>
                    <div className="flex justify-center items-center mt-12 space-x-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                                currentPage === 1
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                    : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                            }`}
                        >
                            <ChevronRight className="w-4 h-4 ltr:rotate-180"/>
                        </button>

                        {/* Page Numbers */}
                        {pageNumbers?.map((page, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    typeof page === "number" && handlePageChange(page)
                                }
                                className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                                    page === currentPage
                                        ? "bg-Primary-400 border-Primary-400 text-white"
                                        : page === "..."
                                            ? "bg-transparent border-transparent text-gray-500 cursor-default"
                                            : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                }`}
                                disabled={page === "..."}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                                currentPage === totalPages
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                    : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4 ltr:rotate-180"/>
                        </button>
                    </div>

                    {/* Page Info */}
                    {/* <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            صفحه {currentPage} از {totalPages} - کل آگهی‌ها: {totalAds}
          </div> */}
                </>
            )}

            {/* Show "No more ads" message when infinite scroll ends */}
            {!showPagination && !hasNextPage && allLoadedAds.length > 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    تمام آگهی‌ها نمایش داده شدند
                </div>
            )}

            {/* Loading state for initial load */}
            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className="w-12 h-12 border-4 border-Primary-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 dark:text-gray-400">
                            در حال بارگذاری آگهی‌ها...
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Advertisements;
