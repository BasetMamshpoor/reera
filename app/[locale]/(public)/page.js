import Advertisements from "@/components/Advertisements/Advertisements";
import Hero from "@/components/Hero/Hero";
import Searchbar from "@/components/layout/Searchbar/Searchbar";
import CategoriesModified from "@/components/layout/Categories/CategoriesModified";
import {HydrationBoundary, dehydrate} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";

export default async function Home({searchParams}) {
    const queryClient = new QueryClient();
    const page = searchParams.page || 1;

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["all-ads-infinite"],
        queryFn: async ({pageParam = 1}) => await request({
            url: `/ads`,
            method: "get",
            query: {page: pageParam}
        })
        ,
        initialPageParam: 1,
        pages: Math.min(parseInt(page), 3),
    });

    return (
        <div className="overflow-x-hidden">
            <Searchbar/>
            <CategoriesModified/>
            <Hero/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Advertisements/>
            </HydrationBoundary>
        </div>
    );
}
