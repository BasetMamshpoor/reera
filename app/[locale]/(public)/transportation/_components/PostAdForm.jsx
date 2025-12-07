import React, { useState } from 'react';
import { X, MapPin, Calendar, Package, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";



export const PostAdForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        from: '',
        to: '',
        date: '',
        packageType: '',
        weight: '',
        description: '',
        price: '',
        isUrgent: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.isUrgent) {
            toast.success('آگهی فوری شما ثبت شد! به مسافران مسیر اطلاع‌رسانی خواهد شد.', {
                duration: 5000,
                icon: <CheckCircle className="size-5 text-green-600" />,
                style: { direction: 'rtl' }
            });
        } else {
            toast.success('آگهی شما با موفقیت ثبت شد!', {
                duration: 3000,
                style: { direction: 'rtl' }
            });
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl text-[#142738]">ثبت آگهی جدید</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="size-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm text-[#142738] mb-2">عنوان آگهی</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                            placeholder="مثلاً: ارسال دارو از تهران به اصفهان"
                            required
                        />
                    </div>

                    {/* Route */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className=" text-sm text-[#142738] mb-2 flex items-center gap-2">
                                <MapPin className="size-4 text-[#4299c1]" />
                                مبدا
                            </label>
                            <input
                                type="text"
                                value={formData.from}
                                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                                placeholder="تهران"
                                required
                            />
                        </div>
                        <div>
                            <label className=" text-sm text-[#142738] mb-2 flex items-center gap-2">
                                <MapPin className="size-4 text-[#4299c1]" />
                                مقصد
                            </label>
                            <input
                                type="text"
                                value={formData.to}
                                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                                placeholder="اصفهان"
                                required
                            />
                        </div>
                    </div>

                    {/* Date and Package Type */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className=" text-sm text-[#142738] mb-2 flex items-center gap-2">
                                <Calendar className="size-4 text-[#4299c1]" />
                                تاریخ مورد نظر
                            </label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                                placeholder="۱۴۰۳/۰۹/۱۵"
                                required
                            />
                        </div>
                        <div>
                            <label className=" text-sm text-[#142738] mb-2 flex items-center gap-2">
                                <Package className="size-4 text-[#4299c1]" />
                                نوع بسته
                            </label>
                            <select
                                value={formData.packageType}
                                onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                                required
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="دارو">دارو</option>
                                <option value="مدارک">مدارک</option>
                                <option value="کتاب">کتاب</option>
                                <option value="هدیه">هدیه</option>
                                <option value="مواد غذایی">مواد غذایی</option>
                                <option value="پوشاک">پوشاک</option>
                                <option value="سایر">سایر</option>
                            </select>
                        </div>
                    </div>

                    {/* Weight and Price */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-[#142738] mb-2">وزن تقریبی</label>
                            <input
                                type="text"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                                placeholder="مثلاً: ۵۰۰ گرم یا ۲ کیلو"
                                required
                            />
                        </div>
                        <div>
                            <label className=" text-sm text-[#142738] mb-2 flex items-center gap-2">
                                <DollarSign className="size-4 text-[#4299c1]" />
                                پیشنهاد قیمت (تومان)
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm"
                                placeholder="۱۵۰,۰۰۰"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-[#142738] mb-2">توضیحات</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299c1] text-sm resize-none"
                            rows={4}
                            placeholder="توضیحات تکمیلی درباره بسته..."
                            required
                        />
                    </div>

                    {/* Urgent Checkbox */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isUrgent}
                                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                                className="mt-1 size-5 text-red-500 rounded focus:ring-red-500"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm text-[#142738]">ارسال فوری</span>
                                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">جدید</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    با انتخاب این گزینه، آگهی شما به صورت خودکار به تمام مسافرانی که در چند ساعت آینده در مسیر {formData.from || 'مبدا'} به {formData.to || 'مقصد'} سفر دارند، اطلاع‌رسانی می‌شود.
                                </p>
                                {formData.isUrgent && (
                                    <div className="mt-2 flex items-center gap-2 text-xs text-orange-700">
                                        <AlertCircle className="size-4" />
                                        <span>هزینه اضافی برای ارسال فوری: ۵۰,۰۰۰ تومان</span>
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors"
                        >
                            ثبت آگهی
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
