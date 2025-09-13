import Advertisements from "@/components/Advertisements/Advertisements";
import Categories from "@/components/Categories/Categories";
import Hero from "@/components/Hero/Hero";

import Sidebar from "@/components/Advertisements/Sidebar";
import Searchbar from "@/components/layout/Searchbar/Searchbar";

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
