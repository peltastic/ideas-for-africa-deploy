import Button from "@/components/Button/Button";
import { sendMessage } from "@/lib/sockets";
import React, { useEffect, useState } from "react";

type Props = {
  groupId: string
};

const ChatInput = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  const sendMessageHandler = () => {
    // console.log(props.groupId)
    // console.log(props.groupId, message)
    sendMessage(props.groupId, message)
  }

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value);
        }}
        className="placeholder:text-[#888F95] w-full resize-none outline-none"
        placeholder="Share your thoughts"
      ></textarea>
      <div className="flex">
        <Button
        clicked={sendMessageHandler}
          // clicked={createCommentHandler}
          // disabled={!comment}
          classname="bg-primary ml-auto flex items-center justify-center  disabled:bg-gray6  text-white w-[6rem] py-2 rounded-full text-sm font-medium"
        >
          {/* {isLoading ? (
              <div className="py-1">
                <Spinner />
              </div>
            ) : ( */}
          Reply
          {/* )} */}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
