"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import localTranslate from "@/helpers/localTranslate";
import { links } from "@/app/[locale]/(public)/links";
import Profile from "@/assets/icons/profile.svg";
import Plus from "@/assets/icons/add.svg";
const MainNavigationContent = () => {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale || "en";

  return (
    <div className="p-4 z-50">
      <div className="flex flex-col p-4 space-y-4 py-16">
        {links.map((link) => {
          const href = link.href.replace("[locale]", locale);
          const isActive = link.activeCondition(pathname, locale);
          return (
            <Link
              key={href}
              href={href}
              className={`${
                isActive
                  ? "text-[#142738] font-[700] bg-gray-100 dark:bg-gray-800"
                  : "text-[#3B3E46]"
              } dark:text-[#E0E2E5] px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {localTranslate(locale, link.label)}
            </Link>
          );
        })}

        <Link
          href={`/${locale}/my-profile`}
          className="p-4 w-full flex items-center rounded-xl border border-Gray-900 gap-4"
        >
          <Profile />
          <span className="">Your profile</span>
        </Link>
        <Link
          href={`/${locale}/my-profile`}
          className="p-4 w-full flex items-center rounded-xl border border-Gray-900 gap-4"
        >
          <Plus />
          <span className="">Register Ad</span>
        </Link>
      </div>
    </div>
  );
};

export default MainNavigationContent;
