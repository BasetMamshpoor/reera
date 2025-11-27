import React from 'react';
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const EditConditions = ({ a }) => {
    const { register, watch, setValue } = useFormContext();
    const [selected, setSelected] = React.useState([]);

    const PaymentMethod = [
        { name: "cheque", label: a.cheque },
        { name: "installments", label: a.installments },
        { name: "cash", label: a.cash }
    ];
    const SuitableFor = [
        { name: "family", label: a.family},
        { name: "female_only", label: a.female_only},
        { name: "male_only", label: a.male_only},
        { name: "student", label: a.student}
    ]
    const Rules =[
        { name: "no_smoking", label: a.no_smoking},
        { name: "no_pets", label: a.no_pets},
        { name: "no_loud_parties", label: a.no_loud_parties},
        { name: "no_loud_music", label: a.no_loud_music},
        { name: "no_hookah", label: a.no_hookah},
        { name: "no_sign_board", label: a.no_sign_board},
        { name: "no_parking_front", label: a.no_parking_front},
        { name: "no_sublease", label: a.no_sublease},
        { name: "no_commercial_use", label: a.no_commercial_use},
        { name: "no_satellite_dish", label: a.no_satellite_dish},
        { name: "no_large_storage", label: a.no_large_storage},
        { name: "no_fixed_modifications", label: a.no_fixed_modifications},
    ]

    return (
        <div className="flex flex-col gap-6 w-full">
            <p className="text-Primary-950 text-xl font-medium">{a.conditions}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <Select
                    value={watch("currencyType")}
                    onValueChange={(val) => setValue("currencyType", val)}
                >
                    <SelectTrigger className="w-full lg:col-span-2 border border-Gray-600 rounded-lg py-1">
                        <SelectValue placeholder={a.currency_type} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="لیره">لیره</SelectItem>
                            <SelectItem value="تومان">تومان</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    type="text"
                    placeholder={a.total_price}
                    {...register("totalPrice")}
                    className="border border-Gray-600"
                />
                <Input
                    type="text"
                    placeholder={a.deposit}
                    {...register("deposit")}
                    className="border border-Gray-600"
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-base text-Gray-700 font-medium">{a.payment_method}</p>
                <div className="flex items-center gap-6">
                    {PaymentMethod.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 lg:gap-3">
                            <Checkbox
                                checked={watch("payment_method")?.includes(item.name)}
                                onCheckedChange={(checked) => {
                                    const current = watch("payment_method") || [];
                                    if (checked) {
                                        setValue("payment_method", [...current, item.name]);
                                    } else {
                                        setValue("payment_method", current.filter(i => i !== item.name));
                                    }
                                }}
                                className="!w-6 !h-6"
                            />
                            <span className="text-sm lg:text-base text-secondary pt-1">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-base text-Gray-700 font-medium">{a.suitable_for}</p>
                <div className="flex items-center flex-wrap gap-6">
                    {SuitableFor.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 flex-wrap lg:gap-3">
                            <Checkbox
                                checked={watch("female_only")?.includes(item.name)}
                                onCheckedChange={(checked) => {
                                    const current = watch("female_only") || [];
                                    if (checked) {
                                        setValue("female_only", [...current, item.name]);
                                    } else {
                                        setValue("female_only", current.filter(i => i !== item.name));
                                    }
                                }}
                                className="!w-6 !h-6"
                            />
                            <span className="text-sm lg:text-base text-secondary pt-1">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <p className="text-base text-Gray-700 font-medium">{a.suitable_for}</p>
                <div className="flex flex-col gap-4 w-full">
                    {Rules.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 flex-wrap lg:gap-3">
                            <Checkbox
                                checked={watch("rules")?.includes(item.name)}
                                onCheckedChange={(checked) => {
                                    const current = watch("rules") || [];
                                    if (checked) {
                                        setValue("rules", [...current, item.name]);
                                    } else {
                                        setValue("rules", current.filter(i => i !== item.name));
                                    }
                                }}
                                className="!w-6 !h-6"
                            />
                            <span className="text-sm lg:text-base text-secondary pt-1">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditConditions;
