import React from 'react';

const RatingSummary = () => {
    const categories = [
        { name: 'صداقت اطلاعات', value: 4.2, maxStars: 5 },
        { name: 'شفافیت قیمت', value: 3.5, maxStars: 4 },
        { name: 'رفتار مالک', value: 4.2, maxStars: 5 }
    ];

    const renderStars = (rating, maxStars) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className="text-yellow-400">★</span>
                ))}
                {hasHalfStar && <span className="text-yellow-400">☆</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-300">☆</span>
                ))}
            </div>
        );
    };

    return (
        <div className=" flex flex-col items-center gap-6 px-4 py-8 bg-white dark:bg-[#252C36] rounded-lg mt-2.5">
            <div><h2 className={`text-2xl font-[600] text-black dark:text-white`}>تعداد کل امتیازها</h2></div>
            <div className="flex items-center gap-1 mb-5">
                <span className="text-2xl font-bold">۴.۵</span>
                <span className="text-yellow-400 text-xl">★</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center w-full justify-between gap-3">
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-row justify-between items-center">
                        <div className={`flex flex-col gap-2 items-center px-10`}>
                            <span className="text-md text-black dark:text-white">{category.name}</span>
                            <div className="flex items-center gap-1">
                                <span>{category.value.toFixed(1)}</span>
                                {renderStars(category.value, category.maxStars)}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingSummary;