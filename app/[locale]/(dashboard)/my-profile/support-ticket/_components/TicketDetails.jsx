"use client";
import React, {useState} from "react";
import TagsRight from "@/assets/icons/TagsRight.svg";
import Null from "./Null";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import TableTicket from "./TableTicket";
import Modal from "./Modal";
import Chats from "./Chats";
import {request} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

const TicketDetails = () => {
    const dic = useTranslation();
    const a = dic.public.profile.support_ticket;
    const [uiState, setUiStaet] = useState("ticket");
    const [chat, setChat] = useState(false);

    const {data, isLoading} = useQuery({
        queryKey: ["ticket-table"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: `/profile/ticket`,
            })
        }
    })
    return (
        <div className="w-full h-full rounded-xl border border-default-divider flex flex-col">
            <div className="w-full">
                <div className="flex items-center justify-between w-full border-b border-b-default-divider p-3 lg:p-5">
                    <div className=" w-full flex gap-4 items-center">
                        <TagsRight className="fill-Gray-800 ltr:rotate-180 !w-5 !h-5 lg:!w-6 lg:!h-6"/>
                        <span className="text-sm lg:text-xl font-bold pt-1">
                          {a.support_ticket}
                        </span>
                    </div>
                    {uiState === "ticket" && !chat && <Modal a={a}/>}
                </div>
                <div className="w-full">
                    {isLoading ? <div className="flex items-center justify-center w-full pt-6"><Spinner/></div> : chat ? (
                        <Chats a={a} chat={chat} setChat={setChat}/>
                    ) : uiState === "ticket" ? (
                        <TableTicket data={data} a={a} chat={chat} setChat={setChat}/>
                    ) : uiState === "no-ticket" ? (
                        <Null a={a}/>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;
