import Button from "@/components/Button/Button";

import React, { useEffect, useState } from "react";

type Props = {
  sendMessageFunc: (message: string) => void;
};

const ChatInput = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="bg-white flex gap-3 rounded-lg p-6 w-full">
      <textarea
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value);
        }}
        className="placeholder:text-[#888F95] w-full resize-none outline-none"
        placeholder="Share your thoughts"
      ></textarea>
      <div className="">
        <Button
          clicked={() => {
            props.sendMessageFunc(message);
            setMessage("");
          }}
          classname="bg-primary ml-auto flex items-center justify-center  disabled:bg-gray6  text-white w-[6rem] py-2 rounded-full text-sm font-medium"
        >
          Reply
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
