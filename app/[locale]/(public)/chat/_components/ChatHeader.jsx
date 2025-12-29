import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import Icon from "@/assets/icons/profile.svg";
import Arrow from "@/assets/icons/arrow-left.svg";
import Dot from "@/assets/icons/more.svg";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import ModalReports from "./ModalReports";
import ModalBlock from "./ModalBlock";

const ChatHeader = ({chatDetails, locale, handleBackToList, refetch, isGlobalChat}) => (
    <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full bg-surface p-6">
            <div className="flex items-center gap-4">
                <button onClick={handleBackToList} className="text-Gray-700 hover:text-gray-900 md:hidden">
                    <Arrow className="w-6 h-6 rtl:rotate-180 fill-Primary-600 cursor-pointer"/>
                </button>
                {!isGlobalChat &&
                    <Link href={`/${locale}/register-ad/seller/${chatDetails?.user_id}`}
                          className="w-14 h-14 bg-Surface-2 rounded-full overflow-hidden flex items-center justify-center">
                        {!!chatDetails?.profile ? (
                            <Image src={chatDetails.profile} alt="پروفایل" width={56} height={56}
                                   className="object-cover"/>
                        ) : (
                            <Icon className="!w-10 !h-10 fill-Gray-800"/>
                        )}
                    </Link>}
                <h3 className="font-semibold text-Gray-800">{chatDetails?.name}</h3>
            </div>
            {!isGlobalChat &&
                <DropdownMenu>
                    <DropdownMenuTrigger><Dot
                        className="rotate-90 cursor-pointer fill-Primary-950"/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}><ModalReports
                            refetch={refetch}/></DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <ModalBlock refetch={refetch} id={chatDetails?.id} status={chatDetails?.status}/>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </div>
        {!isGlobalChat && <div className="flex items-center gap-4 p-8 bg-Surface-2 border-b border-b-Gray-500">
            <Image src={chatDetails?.ads_image} alt="image" width={48} height={48} className="object-cover"/>
            <h3 className="font-semibold text-Gray-800">{chatDetails?.ads_name}</h3>
        </div>}
    </div>
);

export default ChatHeader;