import "../globals.css";
import {getDictionary} from "@/lib/getDictionary";
import {TranslationProvider} from "./TranslationContext";
import Navbar from "@/components/layout/Navbar/Navbar";
import {ThemeProvider} from "@/components/Theme/theme-provider";
import Providers from "./Providers";
import Footer from "@/components/Footer/Footer";
import {Toaster} from "@/components/ui/sonner";

export default async function Layout({children, params}) {
    // if no locale param => default to "fa"
    const locale = params?.locale || "fa";

    const dict = await getDictionary(locale);

    return (
        <html
            className="font-farsi-primary"
            lang={locale}
            dir={locale === "en" ? "ltr" : "rtl"}
        >
        <body className="font-farsi-primary">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <Providers>
                <TranslationProvider dict={dict}>
                    <Toaster/>
                    <div className="w-full">
                        <div
                            className="flex flex-col container px-3 mx-auto w-full overflow-x-hidden">
                            <Navbar/>
                            {children}
                        </div>
                        <Footer/>
                    </div>
                </TranslationProvider>
            </Providers>
        </ThemeProvider>
        </body>
        </html>
    );
}
