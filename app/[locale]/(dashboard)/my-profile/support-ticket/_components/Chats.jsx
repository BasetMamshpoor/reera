"use client"
import Arrow from "@/assets/icons/arrow-down.svg"
import ChatSidebar from "./ChatSidebar"

const Chats = ({a, setChat, chat}) => {
    return (
        <>
            <div className="flex flex-col gap-6 p-6 w-full">
                <div onClick={() => setChat(false)}
                     className="flex items-center gap-2">
                    <Arrow className="fill-Primary-400 !w-5 !h-5 ltr:rotate-90 rtl:-rotate-90"/>
                    <p className="text-base font-bold text-Primary-400 pt-1">{a.back}</p>
                </div>
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 w-full lg:h-screen">
                    <div className="col-span-2 border border-default-divider rounded-xl">

                    </div>
                    <ChatSidebar a={a}/>
                </div>
            </div>
        </>
    );
};

export default Chats;