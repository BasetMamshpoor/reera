"use client";

import React, {useState} from "react";
import {
    X,
    MapPin,
    Calendar,
    Package,
    DollarSign,
    AlertCircle,
    CheckCircle
} from "lucide-react";

import {toast} from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export function PostAdModal({open, onOpenChange}) {
    const [formData, setFormData] = useState({
        title: "",
        from: "",
        to: "",
        date: "",
        packageType: "",
        weight: "",
        description: "",
        price: "",
        isUrgent: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.success(
            formData.isUrgent
                ? "آگهی فوری شما ثبت شد!"
                : "آگهی با موفقیت ثبت شد!",
            {
                duration: formData.isUrgent ? 5000 : 3000,
                icon: formData.isUrgent ? (
                    <CheckCircle className="size-5 text-green-600"/>
                ) : undefined,
                style: {direction: "rtl"},
            }
        );

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto scroll-hidden" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center text-Primary-950 flex justify-between items-center pt-8">
                        ثبت آگهی جدید
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm text-Primary-950 mb-2 ">عنوان آگهی</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-4 py-3 border border-Gray-300 rounded-lg text-sm"
                            placeholder="مثلاً ارسال دارو..."
                            required
                        />
                    </div>

                    {/* Route */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-Primary-950 mb-2 flex items-center gap-2">
                                <MapPin className="size-4 text-[#4299c1]"/>
                                مبدا
                            </label>
                            <input
                                type="text"
                                value={formData.from}
                                onChange={(e) => setFormData({...formData, from: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg"
                                placeholder="تهران"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-Primary-950 mb-2 flex items-center gap-2">
                                <MapPin className="size-4 text-[#4299c1]"/>
                                مقصد
                            </label>
                            <input
                                type="text"
                                value={formData.to}
                                onChange={(e) => setFormData({...formData, to: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg"
                                placeholder="اصفهان"
                                required
                            />
                        </div>
                    </div>

                    {/* Date + Type */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm mb-2">
                                <Calendar className="size-4 text-[#4299c1]"/>
                                تاریخ مورد نظر
                            </label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg"
                                placeholder="۱۴۰۳/۰۹/۱۵"
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm mb-2">
                                <Package className="size-4 text-[#4299c1]"/>
                                نوع بسته
                            </label>
                            <Select
                                // value={formData.packageType}
                                // onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                                className="w-full"
                                required
                            >
                                <SelectTrigger className="w-full border rounded-lg px-4 py-6">
                                    <SelectValue placeholder="نوع بسته"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>انتخاب کنید</SelectLabel>
                                        <SelectItem value="apple">دارو</SelectItem>
                                        <SelectItem value="banana">مدارک</SelectItem>
                                        <SelectItem value="blueberry">کتاب</SelectItem>
                                        <SelectItem value="grapes">هدیه</SelectItem>
                                        <SelectItem value="pineapple">مواد غذایی</SelectItem>
                                        <SelectItem value="grapes1">پوشاک</SelectItem>
                                        <SelectItem value="grapes2">سایر</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Weight + Price */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm mb-2 block">وزن تقریبی</label>
                            <input
                                type="text"
                                value={formData.weight}
                                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg"
                                placeholder="مثلاً ۵۰۰ گرم"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm mb-2 flex items-center gap-2">
                                <DollarSign className="size-4 text-[#4299c1]"/>
                                قیمت پیشنهادی
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg"
                                placeholder="۱۵۰,۰۰۰"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm mb-2 block">توضیحات</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({...formData, description: e.target.value})
                            }
                            className="w-full px-4 py-3 border rounded-lg resize-none"
                            placeholder="توضیحات درباره بسته..."
                            required
                        />
                    </div>

                    {/* Urgent */}
                    <div className="bg-surface border rounded-xl p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isUrgent}
                                onChange={(e) =>
                                    setFormData({...formData, isUrgent: e.target.checked})
                                }
                                className="size-5 mt-1"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">ارسال فوری</span>
                                    <span className="text-xs bg-red-500 text-white px-2 rounded">
                                        جدید
                                    </span>
                                </div>

                                <p className="text-xs text-Gray-600">
                                    ارسال فوری به مسافران مسیر {formData.from || "مبدا"} →{" "}
                                    {formData.to || "مقصد"}
                                </p>

                                {formData.isUrgent && (
                                    <div className="flex items-center gap-2 text-orange-700 text-xs mt-2">
                                        <AlertCircle className="size-4"/>
                                        هزینه اضافی: ۵۰,۰۰۰ تومان
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* Footer Buttons */}
                    <DialogFooter className="pt-2 grid grid-cols-6 gap-4 ">
                        <Button
                            type="submit"
                            className=" py-6 bg-[#4299c1] text-white col-span-4 rounded-xl hover:bg-[#3a89b0] w-full"
                        >
                            ثبت آگهی
                        </Button>

                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="py-6 px-6 col-span-2 rounded-xl bg-Gray-400 w-full"
                            >
                                انصراف
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
