"use client";
import React, { useState } from "react";
import HeartOutline from "@/assets/icons/heart.svg";
import HeartFilled from "@/assets/icons/Heart-Bold.svg";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import Spinner from "@/components/Spinner";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Like = ({ isLike, id, url, className }) => {
  const [is_like, setIs_like] = useState(isLike);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const dic = useTranslation();
  const a = dic.public.ads.vehicles;

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      return request({
        url: `${url}/like/${id}`,
        method: "post",
      });
    },
    onSuccess: (res) => {
      const message = res?.message || res?.data?.message || "";
      if (message.includes("لایک شد")) {
        setIs_like(true);
      } else if (message.includes("لایک حذف شد")) {
        setIs_like(false);
      } else {
        setIs_like((prev) => !prev);
      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        setShowLoginModal(true);
      }
    },
  });

  const handleLoginRedirect = () => {
    router.push(`/${locale}/login?backUrl=${pathname}`);
  };

  return (
    <>
      <div
        className={`centerOfParent cursor-pointer ${className}`}
        onClick={() => mutate()}
      >
        {!isLoading ? (
          is_like ? (
            <HeartFilled className="fill-error-main transition-all duration-200" />
          ) : (
            <HeartOutline className="fill-Gray-900 transition-all duration-200" />
          )
        ) : (
          <Spinner color="#16A34A" size="20px" />
        )}
      </div>

      <Dialog
        dir={locale === "fa" ? "rtl" : "ltr"}
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      >
        <DialogContent className="flex flex-col gap-10 sm:max-w-[500px] rounded-2xl h-fit">
          <DialogHeader className="flex flex-col gap-6">
            <DialogTitle className="text-xl font-semibold text-center">
              {a.login_title}
            </DialogTitle>
            <DialogDescription className="text-base text-Gray-800 text-center">
              {a.like_login_required}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="grid grid-cols-2 w-full gap-4">
            <Button
              variant="outline"
              onClick={() => setShowLoginModal(false)}
              className="border border-warning-main text-warning-main rounded-xl cursor-pointer bg-surface hover:bg-surface hover:text-warning-main"
            >
              {a.cancel}
            </Button>
            <Button
              onClick={handleLoginRedirect}
              className="bg-Primary-400 text-white rounded-xl hover:bg-Primary-400 cursor-pointer"
            >
              {a.login}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Like;
