"use client";
import React from "react";
import MyChatComponent from "./_components/MyChatComponent";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("user");
  const currentUser = { id: 1, name: "Me", avatar: "/me.png" };
  const selectedContact = { id: receiverId, name: "Hossein Yusefi" };
  return (
    <div>
      <MyChatComponent
        currentUser={currentUser}
        currentChat={selectedContact}
        initialMessages={[]}
      />
    </div>
  );
};

export default page;
