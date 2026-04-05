import { useEffect, useState } from "react";
import { Chat, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";

export function useChatList(): Chat[] {
  const { socket, sendMessage } = useWebSocket();
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    sendMessage({ type: "get_chat_list" });
    const onMessage = (event: MessageEvent) => {
      const response: WSResponse = JSON.parse(event.data);
      if (response.type === "friend_list") {
        console.log(response.payload);
        setChatList(response.payload);
      }
    };
    socket.addEventListener("message", onMessage);
    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket]);

  // useEffect(() => {
  //   if (!socket) return;

  //   const handleOpen = () => {
  //     // small delay to ensure user registration in backend
  //     setTimeout(() => sendMessage({ type: "get_chat_list" }), 300);
  //   };

  //   socket.addEventListener("open", handleOpen);

  //   const onMessage = (event: MessageEvent) => {
  //     const response: WSResponse = JSON.parse(event.data);
  //     if (response.type === "friend_list") {
  //       console.log("Received friend list:", response.payload);
  //       setChatList(response.payload);
  //     }
  //   };

  //   socket.addEventListener("message", onMessage);

  //   return () => {
  //     socket.removeEventListener("open", handleOpen);
  //     socket.removeEventListener("message", onMessage);
  //   };
  // }, [socket]);

  return chatList;
}
