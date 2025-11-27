"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import localTranslate from "@/helpers/localTranslate";
import Profile from "@/assets/icons/profile.svg";
import Settings from "@/assets/icons/settings.svg"; // Assuming you have this icon
import ArrowLeft from "@/assets/icons/arrow-left.svg"; // Assuming you have this icon

const ProfileNavigationContent = () => {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale || "en";

  const profileLinks = [
    {
      href: `/${locale}/my-profile`,
      label: "Profile Overview",
      icon: <Profile />,
    },
    {
      href: `/${locale}/my-profile/settings`,
      label: "Account Settings",
      icon: <Settings />,
    },
    {
      href: `/${locale}/my-profile/ads`,
      label: "My Advertisements",
      icon: <Profile />,
    },
    {
      href: `/${locale}/my-profile/favorites`,
      label: "Favorites",
      icon: <Profile />,
    },
  ];

  return (
    <div className="p-4 z-50">
      {/* Back to main menu */}
      <div className="py-4 border-b border-gray-200 dark:border-gray-700">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 fill-alphaw-100" />
          <span>Back to Main</span>
        </Link>
      </div>

      {/* Profile menu items */}
      <div className="flex flex-col space-y-2 py-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Profile Menu
        </h3>

        {profileLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                isActive
                  ? "text-[#142738] font-[700] bg-gray-100 dark:bg-gray-800"
                  : "text-[#3B3E46]"
              } dark:text-[#E0E2E5] px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileNavigationContent;
