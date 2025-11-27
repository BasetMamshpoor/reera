export const links = [
  {
    href: "/[locale]",
    label: { en: "Home", fa: "صفحه اصلی" },
    activeCondition: (pathname, locale) => pathname === `/${locale}`,
  },
  {
    href: "/[locale]/travelguide",
    label: { en: "Travel Guide", fa: "سفریار" },
    activeCondition: (pathname, locale) =>
      pathname === `/${locale}/travelguide`,
  },
  {
    href: "/[locale]/transportation",
    label: { en: "Transportation", fa: "حمل و نقل" },
    activeCondition: (pathname, locale) =>
      pathname === `/${locale}/transportation`,
  },
  {
    href: "/[locale]/legaladviser",
    label: { en: "Legal Advisor", fa: "مشاور یار" },
    activeCondition: (pathname, locale) =>
      pathname === `/${locale}/legaladviser`,
  },
  {
    href: "/[locale]/weblog",
    label: { en: "Weblog", fa: "وبلاگ" },
    activeCondition: (pathname, locale) => pathname === `/${locale}/weblog`,
  },
];
