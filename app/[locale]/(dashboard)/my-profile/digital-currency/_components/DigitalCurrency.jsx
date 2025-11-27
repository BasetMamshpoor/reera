"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { request } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import CopyIcon from "@/assets/icons/Copy.svg";

const schema = z
  .object({
    bitcoin: z.string().optional(),
    ethereum: z.string().optional(),
    usdt: z.string().optional(),
    usdc: z.string().optional(),
    litecoin: z.string().optional(),
    bitcoin_cash: z.string().optional(),
    dogecoin: z.string().optional(),
    tron: z.string().optional(),
    cardano: z.string().optional(),
    polkadot: z.string().optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => value && value.trim() !== "");
    },
    {
      message: "لطفا حداقل یک آدرس ارز دیجیتال وارد کنید",
      path: ["root"],
    }
  );

const DigitalCurrency = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const dic = useTranslation();
  const p = dic.dashboard.myprofile.digital_currency;

  const { data: curr_data } = useQuery({
    queryKey: ["digital-currency"],
    queryFn: async () => {
      const res = await request({
        url: `/profile/DigitalCurrency`,
      });
      return res.data.DigitalCurrency;
    },
  });

  const currencyMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/DigitalCurrency",
        method: "POST",
        data: data,
      }),

    onSuccess: () => {
      toast.success(p.crypto_addresses_added_successfully);
      queryClient.invalidateQueries(["digital-currency"]);
      reset();
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  useEffect(() => {
    if (curr_data && curr_data.length > 0) {
      reset({
        bitcoin: curr_data[0].bitcoin || "",
        ethereum: curr_data[0].ethereum || "",
        usdt: curr_data[0].usdt || "",
        bitcoin_cash: curr_data[0].bitcoin_cash || "",
        cardano: curr_data[0].cardano || "",
        dogecoin: curr_data[0].dogecoin || "",
        litecoin: curr_data[0].litecoin || "",
        polkadot: curr_data[0].polkadot || "",
        tron: curr_data[0].tron || "",
        usdc: curr_data[0].usdc || "",
      });
    }
  }, [curr_data, reset]);

  const onSubmit = (data) => {
    const allEmpty = Object.values(data).every(
      (value) => !value || value.trim() === ""
    );

    if (allEmpty) {
      toast.error(p.please_enter_at_least_one_crypto_address);
      return;
    }

    currencyMutation.mutate(data);
  };

  const handleCopyWalletAddress = (address, currencyName) => {
    if (!address || address.trim() === "") return;

    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success(`${currencyName} ${p.address_copied_successfully}`);
      })
      .catch(() => {
        toast.error(p.failed_to_copy_address);
      });
  };

  const cryptocurrencies = [
    { key: "bitcoin", name: "Bitcoin", displayName: "Bitcoin" },
    { key: "ethereum", name: "Ethereum", displayName: "Ethereum" },
    { key: "usdt", name: "USDT", displayName: "USDT" },
    { key: "usdc", name: "USDC", displayName: "USDC" },
    { key: "litecoin", name: "Litecoin", displayName: "Litecoin" },
    { key: "bitcoin_cash", name: "Bitcoin Cash", displayName: "Bitcoin Cash" },
    { key: "dogecoin", name: "Dogecoin", displayName: "Dogecoin" },
    { key: "tron", name: "TRON", displayName: "TRON" },
    { key: "cardano", name: "Cardano", displayName: "Cardano" },
    { key: "polkadot", name: "Polkadot", displayName: "Polkadot" },
  ];

  return (
    <div className="flex flex-col bg-white lg:p-8 p-4 dark:bg-[#252C36] border border-[#D1D5DB] rounded-xl w-full">
      <h2 className="text-xl font-bold mb-6 rtl:text-right">
        {p.add_crypto_addresses}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
      >
        {errors.root && (
          <div className="lg:col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-right">{errors.root.message}</p>
          </div>
        )}

        {cryptocurrencies.map((crypto) => (
          <div key={crypto.key} className="flex flex-col gap-2 w-full">
            <Label htmlFor={crypto.key} className="rtl:text-right">
              {crypto.displayName}
            </Label>
            <Input
              id={crypto.key}
              {...register(crypto.key)}
              placeholder={
                p[`enter_your_${crypto.key}_address`] ||
                `Enter your ${crypto.displayName} address`
              }
              className="py-5 rtl:text-right rtl:placeholder:text-right"
            />
          </div>
        ))}

        <div className="lg:col-span-2 flex justify-end mt-4">
          <Button
            type="submit"
            disabled={currencyMutation.isPending}
            className="min-w-32 bg-transparent border border-Primary-400 rounded-lg text-Primary-400 hover:bg-Primary-400 hover:text-alphaw-100 duration-150 ease-in-out transition-all"
          >
            {currencyMutation.isPending ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                {p.sending}
              </>
            ) : (
              p.register_addresses
            )}
          </Button>
        </div>
      </form>

      {/* Registered Wallets Section */}
      {curr_data && curr_data.length > 0 && (
        <div className="mt-8 bg-surface p-4 flex flex-col gap-4">
          <p className="font-semibold text-lg rtl:text-right">
            {p.registered_wallet_addresses}
          </p>
          <div className="flex flex-col gap-4">
            {cryptocurrencies.map((crypto) => {
              const address = curr_data[0][crypto.key];
              if (!address || address.trim() === "") return null;

              return (
                <div
                  key={crypto.key}
                  className="p-4 flex flex-col gap-2 border border-Primary-400 bg-Primary-50 rounded-lg hover:scale-[1.01] duration-200 ease-in-out transition-all cursor-pointer"
                  onClick={() =>
                    handleCopyWalletAddress(address, crypto.displayName)
                  }
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{crypto.displayName}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyWalletAddress(address, crypto.displayName);
                        }}
                        className="p-1 hover:bg-Primary-100"
                      >
                        <CopyIcon />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rtl:flex-row-reverse">
                    <p className="text-sm text-gray-600">{p.address}:</p>
                    <p className="text-sm font-mono break-all">{address}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalCurrency;
