import building from "@/assets/images/hero/Building Image.png";
import otrish from "@/assets/images/Advertisements/عکسی از کشور اتریش.png";
import photo3 from "@/assets/images/Advertisements/photo-1.png";
import photo4 from "@/assets/images/Advertisements/photo-2.png";
import photo5 from "@/assets/images/Advertisements/photo.png";

import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";

const slides = [
  {
    id: 1,
    title: "اجارهمسکن در جامائیکا",
    content:
      "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین قیمت‌ها",
    image: building,
  },
  {
    id: 2,
    title: "2 اجارهمسکن در جامائیکا",
    content:
      "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین قیمت‌ها 2",
    image: otrish,
  },
  {
    id: 4,
    title: "3 اجارهمسکن در جامائیکا",
    content:
      "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین  3",
    image: photo4,
  },
  {
    id: 5,
    title: "4 اجارهمسکن در جامائیکا",
    content:
      "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین 4 قیمت‌ها",
    image: photo3,
  },
  {
    id: 6,
    title: "5 اجارهمسکن در جامائیکا",
    content:
      "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین 5 قیمت‌ها",
    image: photo5,
  },
];
const Hero = () => {
  return (
    <>
      <div className="px-6">
        {/* mobile Hero */}
        {/* <MobileHero slides={slides} /> */}
      </div>

      {/* Desktop Hero */}
      <DesktopHero slides={slides} />
    </>
  );
};

export default Hero;
