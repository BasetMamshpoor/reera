"use client"
import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";
import {useParams} from "next/navigation";

const Hero = () => {
    const {locale} = useParams()
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
        <div className="flex flex-col gap-6 lg:gap-10 w-full lg:pt-20 pt-10">
            <p className="text-xl lg:text-3xl text-Gray-950 font-semibold">{locale === "fa" ? "محل تبلیغات شما:" : "Your advertising location:"}</p>
            <div className="px-6">
                <MobileHero slides={slides}/>
            </div>
            <DesktopHero slides={slides}/>
        </div>
    );
};

export default Hero;
