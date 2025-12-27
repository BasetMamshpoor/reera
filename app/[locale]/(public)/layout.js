import {Toaster} from "@/components/ui/sonner";
import Providers from "@/app/[locale]/Providers";
import {request} from "@/lib/api";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {CategoryProvider} from "@/app/[locale]/CategoryProvider";
import {CountryProvider} from "@/app/[locale]/CountryProvider";

export const metadata = {
    title: "Reera",
    description: "Reera Website",
};

export default async function RootLayout({children, params}) {
    const queryClient = new QueryClient();
    const {locale} = (await params) || {};
    await queryClient.prefetchQuery({
        queryKey: ["allCategory"],
        queryFn: async () => await request({
            url: `/getAllCategory`,
        })
    });
    await queryClient.prefetchQuery({
        queryKey: ["allCountries", 1],
        queryFn: async () => await request({
            url: `/getCountries`,
            query: {country: 1},
        })
    });
    return (
        <>
            <Providers dehydratedState={dehydrate(queryClient)}>
                <CategoryProvider>
                    <CountryProvider>
                        {children}
                    </CountryProvider>
                </CategoryProvider>
                <div className="w-full"></div>
                <Toaster/>
            </Providers>
        </>
    );
}
