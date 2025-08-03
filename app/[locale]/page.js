import Advertisements from "@/components/Advertisements/Advertisements";
import Categories from "@/components/Categories/Categories";
import Hero from "@/components/Hero/Hero";
import Searchbar from "@/components/Searchbar/Searchbar";
import Sidebar from "@/components/Advertisements/Sidebar";

export default function Home() {
  return (
    <>
      {/* <Sidebar /> */}
      <Searchbar />
      <Hero />
      <Categories />
      <Advertisements />
    </>
  );
}
