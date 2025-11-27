import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const AdvPagination = ({page, totalPages, setPage}) => {
    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };
    if (totalPages < 2)
        return;
    return (
        <Pagination className="flex justify-center w-full mt-6 py-4">
            <PaginationContent className="flex items-center gap-2 rtl">
                <PaginationItem>
                    <button
                        onClick={handlePrev}
                        // disabled={page === 1}
                        className={`flex items-center justify-center rounded-lg px-4 py-2 border text-xl ${
                            page === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-black"
                        }`}
                    >
                        &#x276E;
                    </button>
                </PaginationItem>

                <PaginationItem>
                    <div
                        className="flex flex-row gap-2 text-base text-[#142738] px-4 py-2 rounded-lg bg-white shadow">
                        {/* {page} از {totalPages} */}
                        <div>{totalPages}</div>
                        <div>از</div>
                        <div>{page}</div>
                    </div>
                </PaginationItem>
                <PaginationItem className="flex items-center justify-center">
                    <button
                        onClick={handleNext}
                        // disabled={page === totalPages}
                        className={`rounded-lg px-4 py-2 border bg-surface text-xl cursor-pointer ${
                            page === totalPages
                                ? " text-gray-400 cursor-not-allowed"
                                : "border-Primary-400 text-Primary-400"
                        }`}
                    >
                        &#x276F;
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default AdvPagination;
