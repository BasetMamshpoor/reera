"use client";
import { useSidebar } from "@/components/SidebarContext";
import {useParams} from "next/navigation";

export default function SidebarWrapper({ SidebarComponent }) {
    const { isOpen, closeSidebar } = useSidebar();
    const {locale} = useParams();
    return (
        <>
            <div className="hidden lg:block">
                <SidebarComponent />
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={closeSidebar}>
                    <div
                        className={`absolute ${locale==="en"? "left-0":"right-0" } top-0 h-full w-64 bg-[#F9FAFB] dark:bg-[#14181D]  shadow-lg`}
                        onClick={e => e.stopPropagation()}
                    >
                        <SidebarComponent />
                    </div>
                </div>
            )}
        </>
    );
}
