import React, { useEffect} from 'react';
import {Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useParams, useSearchParams, useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {Checkbox} from "@/components/ui/checkbox";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const FilterCategory = ({selected, setSelected}) => {
    const dic = useTranslation();
    const d = dic.public.profile.dashboard;
    const {locale} = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const {data: categoryIds} = useQuery({
        queryKey: ["categoryIds1"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/getCategory",
            });
        }
    });

    useEffect(() => {
        const categoryIdFromUrl = searchParams.get('category');
        if (categoryIdFromUrl) {
            const id = parseInt(categoryIdFromUrl, 10);
            if (categoryIds?.data.some(cat => cat.id === id)) {
                setSelected([id]);
            }
        }
    }, [categoryIds]);

    const toggleCategory = (id) => {
        let newSelected = [];
        if (!selected.includes(id)) {
            newSelected = [id];
        }
        setSelected(newSelected);

        // Update URL with the new category ID (or remove if deselected)
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (newSelected.length > 0) {
            newSearchParams.set('category', newSelected[0]);
        } else {
            newSearchParams.delete('category');
        }
        router.push(`?${newSearchParams.toString()}`, {scroll: false});
    };

    const selectedCategory = categoryIds?.data.find((cat) => cat.id === selected[0]);
    return (
        <>
            <div className="hidden lg:grid grid-cols-5 gap-6">
                {categoryIds?.data.map((cat) => (
                    <label
                        key={cat.id}
                        className="flex items-center gap-2 cursor-pointer select-none"
                    >
                        <Checkbox
                            checked={selected.includes(cat.id)}
                            onCheckedChange={() => toggleCategory(cat.id)}
                            className="!w-6 !h-6"
                        />
                        <span className="text-base pt-1">{cat.title}</span>
                    </label>
                ))}
            </div>

            <Select>
                <SelectTrigger
                    dir={locale === "fa" ? "ltr" : "rtl"}
                    className="lg:hidden w-full border border-default-divider rounded-xl px-4"
                >
                    <SelectValue className="text-Gray-950"
                                 placeholder={selectedCategory ? selectedCategory.title : d.select_category}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel
                            dir={locale === "fa" ? "rtl" : "ltr"}
                            className="grid grid-col-1 sm:grid-cols-2 gap-4 text-balance"
                        >
                            {categoryIds?.data.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center gap-2 cursor-pointer select-none"
                                >
                                    <Checkbox
                                        checked={selected.includes(cat.id)}
                                        onCheckedChange={() => toggleCategory(cat.id)}
                                        className="!w-6 !h-6"
                                    />
                                    <span className="text-base pt-1">{cat.title}</span>
                                </label>
                            ))}
                        </SelectLabel>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
};

export default FilterCategory;