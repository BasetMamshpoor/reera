import { Toaster } from "@/components/ui/sonner";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SidebarProvider } from "@/components/SidebarContext";

export const metadata = {
  title: "Reera",
  description: "Reera Website",
};

export default async function RootLayout({ children, params }) {
  const { locale } = (await params) || {};

  return (
    <SidebarProvider>
      {children}
      <div className="w-full"></div>
      {/* <LanguageSwitcher currentLocale={locale} /> */}
      <Toaster />
    </SidebarProvider>
  );
}
