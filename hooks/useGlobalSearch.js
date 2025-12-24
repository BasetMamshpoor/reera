"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useGlobalSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const qFromUrl = searchParams.get("search") || "";
    const [value, setValue] = useState(qFromUrl);

    // sync وقتی URL عوض شد (back / forward / external)
    useEffect(() => {
        setValue(qFromUrl);
    }, [qFromUrl]);

    // debounce + write to URL
    useEffect(() => {
        const t = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value.trim()) {
                params.set("search", value.trim());
            } else {
                params.delete("search");
            }

            router.replace(`?${params.toString()}`, { scroll: false });
        }, 400);

        return () => clearTimeout(t);
    }, [value]);

    return {
        search: value,
        setSearch: setValue,
    };
}
