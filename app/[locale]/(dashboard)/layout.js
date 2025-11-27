import DashboardSidebar from "./_components/DashboardSidebar";

export default async function DashboardLayout({children}) {
    return (
        <div className="min-h-screen w-full py-12 flex flex-row max-w-[1440px] mx-auto">
            <div className="hidden lg:flex">
                <DashboardSidebar />
            </div>
            <section className="px-4 w-full">{children}</section>
        </div>
    );
}
