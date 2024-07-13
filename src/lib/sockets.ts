import { io } from "socket.io-client";
import config from "@/config/config"
export const chat_socket = io(config.CHAT_SERVER as string);

export function joinBrainstormRoom(username: string, roomID: string) {
//   console.log(username, roomId);
  chat_socket.emit("joinRoom", {
    username,
    roomID,
  });
}

export function leaveRoom(username: string, roomID: string) {
  chat_socket.emit("leaveRoom", {
    roomID,
    username,
  });
}

export function sendMessage(roomID: string, text: string) {
  console.log(roomID, text);
  chat_socket.emit("chatMessage", {
    roomID,
    text,
  });
}
