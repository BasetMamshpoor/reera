"use client";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Plus from "@/assets/icons/add.svg";
import EditPen from "@/assets/icons/Edit2.svg";
import {useTranslation} from "../../../TranslationContext";
import EnterCreditCard from "./EnterCreditCard";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import EmptyBox from "@/assets/icons/empty-may-ads.svg";
import Delete from "@/assets/icons/Trash.svg";
import {toast} from "sonner";

const FinancialInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const dic = useTranslation();
    const b = dic.consultor.edit;
    const queryClient = useQueryClient();

    const {data, isLoading, error} = useQuery({
        queryKey: ["finance"],
        queryFn: async () =>
            await request({
                url: "/profile/finances",
                method: "get",
            }),
    });

    const handleEditClick = (card) => {
        setEditingCard(card);
        setIsModalOpen(true);
    };

    const deleteMutation = useMutation({
        mutationFn: async (
            id // Accept id as parameter
        ) =>
            await request({
                url: `/profile/finances/${id}`,
                method: "delete",
            }),
        onSuccess: () => {
            toast.success("Card deleted successfully");
            queryClient.invalidateQueries(["finance"]);
        },
        onError: (err) => {
            toast.error(`${err?.message} Failed to delete card`);
        },
    });

    const handleDelete = (id) => {
        deleteMutation.mutate(id); // Pass the id to mutation
    };

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Spinner/>
            </div>
        );
    }

    return (
        <>
            {data?.data?.finances?.length === 0 ? (
                <div className="flex items-center flex-col gap-4 justify-center mt-10">
                    <p className="text-Gray-700 font-semibold">{b.bank_account_note}</p>
                    <span className="text-Gray-700">
            هیچ اطلاعاتی برای نمایش وجود ندارد{" "}
          </span>
                    <EmptyBox className="!w-32 !h-32 fill-Gray-400"/>
                    <div className="flex items-center gap-2">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger className="flex items-center gap-2 rtl:flex-row-reverse">
                                <Plus className="fill-Primary-400"/>
                                <span className="text-Primary-400 cursor-pointer font-semibold">
                  {b.add_new_bank_account}
                </span>
                            </DialogTrigger>
                            <DialogContent className="bg-surface h-90">
                                <EnterCreditCard setIsModalOpen={setIsModalOpen} mode="add"/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4 rtl:items-end w-full py-12 px-6">
                    <h2 className="text-Gray-700 font-semibold">{b.bank_account_note}</h2>
                    <div className="flex items-center gap-2">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger
                                className="flex items-center gap-2 rtl:flex-row-reverse"
                                onClick={() => setEditingCard(null)} // Reset to add mode
                            >
                                <Plus className="fill-Primary-400"/>
                                <span className="text-Primary-400 cursor-pointer font-semibold">
                  {b.add_new_bank_account}
                </span>
                            </DialogTrigger>
                            <DialogContent className="bg-surface h-90">
                                <EnterCreditCard
                                    setIsModalOpen={setIsModalOpen}
                                    mode={editingCard ? "edit" : "add"}
                                    cardData={editingCard}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                        {data?.data?.finances?.map((f) => {
                            return (
                                <div
                                    key={f.id}
                                    className="flex items-center w-full rtl:flex-row-reverse justify-between py-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4 rtl:justify-end">
                                            <h2 className="text-Gray-800 font-semibold">
                                                بانک تجارت
                                            </h2>
                                            <span
                                                className={` ${
                                                    f.status === "verified"
                                                        ? "text-success-main bg-success-accent"
                                                        : "bg-warning-accent text-warning-main"
                                                }  py-1.5 rounded-lg px-2 font-semibold`}
                                            >
                        {f.status}
                      </span>
                                        </div>
                                        <div>
                      <span className="text-Text-Secondary font-semibold">
                        {f.card_number}
                      </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <EditPen
                                            className="fill-Primary-400 cursor-pointer"
                                            onClick={() => handleEditClick(f)}
                                        />
                                        <Delete
                                            onClick={() => handleDelete(f.id)}
                                            className="fill-error-main cursor-pointer"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default FinancialInfo;
