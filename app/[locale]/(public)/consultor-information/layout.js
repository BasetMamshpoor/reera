import Sidebar from "./_components/Sidebar";
// import SidebarWrapper from "@/components/SidebarWrapper";

export default function ProfileLayout({ children }) {
    return (
        <div className="min-h-screen w-full py-12 flex flex-row">
            {/*<SidebarWrapper SidebarComponent={Sidebar} />*/}
            <Sidebar />
            <section className="px-4 w-full">{children}</section>
        </div>
    );
}
