import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "اجارهمسکن در جامائیکا",
      content:
        "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین قیمت‌ها",
      image: "/images/photo.png",
    },
    {
      id: 2,
      title: "2 اجارهمسکن در جامائیکا",
      content:
        "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین قیمت‌ها 2",
      image: "/images/otrish.png",
    },
    {
      id: 4,
      title: "3 اجارهمسکن در جامائیکا",
      content:
        "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین  3",
      image: "/images/photo-1.png",
    },
    {
      id: 5,
      title: "4 اجارهمسکن در جامائیکا",
      content:
        "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین 4 قیمت‌ها",
      image: "/images/photo-2.png",
    },
    {
      id: 6,
      title: "5 اجارهمسکن در جامائیکا",
      content:
        "اقامت در بهترین آپارتمان‌ها و مناطق مسکونی در هند ، با بهترین امکانات و ارزان‌ترین 5 قیمت‌ها",
      image: "/images/city-profile.jpg",
    },
  ];
  return (
    <>
      <div className="px-6">
        <MobileHero slides={slides} />
      </div>

      <DesktopHero slides={slides} />
    </>
  );
};

export default Hero;
