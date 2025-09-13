"use client";
import Link from "next/link";
import React from "react";
import { useParams, usePathname } from "next/navigation";

import localTranslate from "@/helpers/localTranslate";
import { links } from "@/app/[locale]/links";

const DesktopCenter = () => {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale || "en";

  return (
    <div className="hidden lg:flex flex-row md:gap-2 lg:gap-4 xl:gap-8 font-[400]">
      {links.map((link) => {
        const href = link.href.replace("[locale]", locale);
        const isActive = link.activeCondition(pathname, locale);
        return (
          <Link
            key={href}
            href={href}
            className={`${
              isActive ? "text-[#142738] font-[700]" : "text-[#3B3E46]"
            } dark:text-[#E0E2E5] px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            {localTranslate(locale, link.label)}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopCenter;
