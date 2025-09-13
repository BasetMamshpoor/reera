export default function localTranslate(
  locale,
  obj,
  enKey = "en",
  faKey = "fa"
) {
  if (!obj || typeof obj !== "object") return "";
  if (locale === "en" && enKey && obj[enKey]) return obj[enKey];
  if (locale === "fa" && faKey && obj[faKey]) return obj[faKey];
  const key = Object.keys(obj).find((k) =>
    locale === "en" ? k.includes("En") : k.includes("Fa")
  );
  return key ? obj[key] : "";
}
