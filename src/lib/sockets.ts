import { io } from "socket.io-client";
import config from "@/config/config";
export const chat_socket = io(config.CHAT_SERVER as string);
export const notis_socket = io(config.BASE_API_URL as string);

export function joinBrainstormRoom(
  username: string,
  roomID: string,
  photourl?: string
) {
  chat_socket.emit("joinRoom", {
    username,
    roomID,
    photourl,
  });
}

export function leaveRoom(username: string, roomID: string) {
  chat_socket.emit("leaveRoom", {
    roomID,
    username,
  });
}

export function sendMessage(roomID: string, text: string) {
  chat_socket.emit("chatMessage", {
    roomID,
    text,
  });
}

export function enableNotis(userId: string) {
  notis_socket.emit("join", userId);
}

