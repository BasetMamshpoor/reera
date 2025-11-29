import Searchbar from "@/components/layout/Searchbar/Searchbar";

export const metadata = {
    title: "Reera",
    description: "Reera Website",
};

export default async function RootLayout({children, params}) {
    const {locale} = (await params) || {};

    return (
        <>
            <Searchbar/>
            {children}
        </>
    );
}
