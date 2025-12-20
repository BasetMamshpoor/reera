"use client";
import React, { useState } from "react";
import Folder from "@/assets/icons/folderOpen-.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import Document from "@/assets/icons/DocumentText.svg";
import ClipboardExport from "@/assets/icons/clipboardExport.svg";
import Folder2 from "@/assets/icons/folder.svg";
import Translate from "@/assets/icons/translate.svg";
import Dollar from "@/assets/icons/dollarSquare.svg";
import Spinner from "@/components/Spinner";
import { useParams, useRouter } from "next/navigation";

const Details = () => {
    const dic = useTranslation();
    const a = dic.consultor.document_toolbox;
    const { locale } = useParams();
    const router = useRouter();

    const [loadingCard, setLoadingCard] = useState(null);

    const handleNavigate = (href, index) => {
        setLoadingCard(index);
        router.push(href);
    };

    const items = [
        { href: `/${locale}/consultation/consultant/toolbar/degree-conversion`, icon: <Document />, label: a.degree_conversion },
        { href: `/${locale}/consultation/consultant/toolbar/ausbildung-score`, icon: <ClipboardExport />, label: a.ausbildung_score },
        { href: `/${locale}/consultation/consultant/toolbar/express-entry-score`, icon: <ClipboardExport />, label: a.express_entry_score },
        { href: `/${locale}/consultation/consultant/toolbar/custom-form-builder`, icon: <Folder2 />, label: a.custom_form_builder },
        { href: `/${locale}/consultation/consultant/toolbar/translation-centers-list`, icon: <Translate />, label: a.translation_centers_list },
        { href: `/${locale}/consultation/consultant/toolbar/migration-cost-calculator`, icon: <Dollar />, label: a.migration_cost_calculator },
    ];

    return (
        <div className="flex flex-col w-full border border-default-divider rounded-xl bg-surface">
            <div className="hidden lg:flex items-center gap-2 p-5 border-b border-default-divider">
                <Folder className="fill-Gray-800" />
                <p className="text-xl text-Gray-950 font-bold pt-1">{a.document_toolbox}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 w-full px-4 py-6 lg:p-8 gap-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => handleNavigate(item.href, i)}
                        className="relative flex flex-col items-center justify-center lg:gap-10 gap-7 lg:py-8 py-6 w-full h-full border border-default-divider rounded-xl bg-Primary-50 cursor-pointer hover:bg-primary-100 transition"
                    >
                        {React.cloneElement(item.icon, {
                            className: "lg:!w-12 md:!w-10 !w-8 lg:!h-12 md:!h-10 !h-8 fill-Primary-950",
                        })}
                        <p className="lg:text-lg md:text-base text-sm text-Primary-950 font-bold">{item.label}</p>

                        {loadingCard === i && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/10">
                                <Spinner size="40px" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Details;
