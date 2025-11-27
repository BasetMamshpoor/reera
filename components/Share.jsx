"use client";
import React, { useState, useEffect } from "react";

import ShareIcon from "@/assets/icons/Share.svg";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const Share = () => {
  const pathname = usePathname();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const handleShare = async () => {
    try {
      if (!url) return;
      if (navigator.share) {
        await navigator.share({
          title: "آگهی من در سایت",
          text: "این آگهی رو ببین 👇",
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("لینک آگهی کپی شد ✅");
      }
    } catch (err) {
      toast.error("کپی یا اشتراک‌گذاری انجام نشد 😔");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition cursor-pointer"
    >
      <ShareIcon className="fill-Gray-900 " />
    </button>
  );
};

export default Share;
