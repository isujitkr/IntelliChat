import React, { useEffect } from "react";
import Navbar from "./Navbar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessages";
import { setMessages } from "../redux/messageSlice";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMsg = async () => {
      if (selectedConversation?._id) {
        const data = await getMessages(selectedConversation?._id);
        dispatch(setMessages(data));
      }
    };
    getMsg();
  }, [selectedConversation]);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
