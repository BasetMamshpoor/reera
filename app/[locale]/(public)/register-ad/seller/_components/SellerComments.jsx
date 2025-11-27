import React from "react";
import Image from "next/image";
import Message from "@/assets/icons/message.svg";
import Plus from "@/assets/icons/add.svg";
import More from "@/assets/icons/more.svg";
import Heart from "@/assets/icons/heart.svg";
import Reply from "@/assets/icons/reply.svg";
import Star from "@/assets/icons/star.svg";
const SellerComments = () => {
  return (
    <>
      <div
        className={`flex flex-row rtl:flex-row-reverse items-center justify-between px-8 mt-4 py-4 border-b-[1px] border-b-gray-500 dark:border-b-[#374151] bg-white dark:bg-[#252C36] md:rounded-tr-2xl md:rounded-tl-2xl`}
      >
        <div
          className={`flex flex-row rtl:flex-row-reverse gap-2 items-center text-gray-800 font-[700] `}
        >
          <Message className={`dark:fill-white`} />
          <span className={`dark:text-white`}>دیدگاه</span>
        </div>
        <div className={`flex flex-row gap-2 items-center`}>
          <button
            className={`border-2 border-primary-400 flex flex-row items-center rtl:flex-row-reverse gap-2 px-3 py-2 rounded-2xl cursor-pointer`}
          >
            <Plus className={`fill-primary-400`} />
            <span className={`text-primary-500 font-[700]`}>ثبت دیدگاه</span>
          </button>
        </div>
      </div>
      <div className={`flex flex-col w-full `}>
        {/*    First commetn*/}
        <div
          className={`flex flex-col px-4 py-8 gap-2 dark:bg-[#252C36] border-b-[1px] border-b-gray-500 dark:border-b-[#374151]`}
        >
          <div
            className={`flex flex-row rtl:flex-row-reverse w-full gap-4 justify-between items-center`}
          >
            <div
              className={`flex flex-row rtl:flex-row-reverse items-center gap-4`}
            >
              <Image
                alt={``}
                src={`/images/profilepicture.png`}
                width={56}
                height={56}
              />
              <div className={`flex flex-col gap-4 rtl:text-right `}>
                <h2>علیرضا کریمی</h2>
                <span className={`text-[#3B3E46] dark:text-white`}>
                  شرکت نوآوران فن آوازه
                </span>
              </div>
            </div>
            <div
              className={`flex flex-col gap-4 lg:flex-row rtl:flex-row-reverse`}
            >
              <span className={`text-xs`}>پنج روز پیش</span>
              <div
                className={`flex flex-row rtl:flex-row-reverse items-center gap-4 `}
              >
                <Heart
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
                <Reply
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
                <More
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 pl-18  rtl:pr-18 w-full mt-4`}>
            <div
              className={`flex flex-row rtl:flex-row-reverse gap-2 self-end items-center`}
            >
              <Star className={`fill-warning-main`} />
              <span>5</span>
            </div>
            <p className={`rtl:text-right leading-8`}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم
              متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
              طراحان گرافیک است.
            </p>
          </div>
        </div>
        {/*    sec*/}
        <div
          className={`flex flex-col px-4 py-8 gap-2 dark:bg-[#252C36] border-b-[1px] border-b-gray-500 dark:border-b-[#374151]`}
        >
          <div
            className={`flex flex-row rtl:flex-row-reverse w-full gap-4 justify-between items-center`}
          >
            <div
              className={`flex flex-row rtl:flex-row-reverse items-center gap-4`}
            >
              <Image
                alt={``}
                src={`/images/profilepicture.png`}
                width={56}
                height={56}
              />
              <div className={`flex flex-col gap-4 rtl:text-right `}>
                <h2>علیرضا کریمی</h2>
                <span className={`text-[#3B3E46] dark:text-white`}>
                  شرکت نوآوران فن آوازه
                </span>
              </div>
            </div>
            <div
              className={`flex flex-col gap-4 lg:flex-row rtl:flex-row-reverse`}
            >
              <span className={`text-xs`}>پنج روز پیش</span>
              <div
                className={`flex flex-row rtl:flex-row-reverse items-center gap-4 `}
              >
                <Heart
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
                <Reply
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
                <More
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 pl-18  rtl:pr-18 w-full mt-4`}>
            <div
              className={`flex flex-row rtl:flex-row-reverse gap-2 self-end items-center`}
            >
              <Star className={`fill-warning-main`} />
              <span>5</span>
            </div>
            <p className={`rtl:text-right leading-8`}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم
              متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
              طراحان گرافیک است.
            </p>
          </div>
        </div>
        {/*    third*/}
        <div
          className={`flex flex-col px-4 py-8 gap-2 dark:bg-[#252C36] border-b-[1px] border-b-gray-500 dark:border-b-[#374151]`}
        >
          <div
            className={`flex flex-row rtl:flex-row-reverse w-full gap-4 justify-between items-center`}
          >
            <div
              className={`flex flex-row rtl:flex-row-reverse items-center gap-4`}
            >
              <Image
                alt={``}
                src={`/images/profilepicture.png`}
                width={56}
                height={56}
              />
              <div className={`flex flex-col gap-4 rtl:text-right `}>
                <h2>علیرضا کریمی</h2>
                <span className={`text-[#3B3E46] dark:text-white`}>
                  شرکت نوآوران فن آوازه
                </span>
              </div>
            </div>
            <div
              className={`flex flex-col gap-4 lg:flex-row rtl:flex-row-reverse`}
            >
              <span className={`text-xs`}>پنج روز پیش</span>
              <div
                className={`flex flex-row rtl:flex-row-reverse items-center gap-4 `}
              >
                <Heart
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
                <Reply
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
                <More
                  className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}
                />
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-2 pl-18  rtl:pr-18 w-full mt-4`}>
            <div
              className={`flex flex-row rtl:flex-row-reverse gap-2 self-end items-center`}
            >
              <Star className={`fill-warning-main`} />
              <span>5</span>
            </div>
            <p className={`rtl:text-right leading-8`}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم
              متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
              طراحان گرافیک است.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerComments;
