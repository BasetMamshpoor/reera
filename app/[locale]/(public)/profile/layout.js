import SidebarWrapper from "@/components/SidebarWrapper";
export const metadata = {
  title: `Reera | Profile`,
};
export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen w-full py-12 flex flex-row max-w-[1440px]">
      {/* <SidebarWrapper SidebarComponent={Sidebar} /> */}
      <section className="px-4 w-full">{children}</section>
    </div>
  );
}
