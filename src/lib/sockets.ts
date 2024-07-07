import { io } from "socket.io-client";
export const chat_socket = io("https://chat-service-aqq4.onrender.com/");

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
