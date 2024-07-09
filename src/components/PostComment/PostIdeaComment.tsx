import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useCommentOnIdeaMutation } from "@/lib/features/comments";
import { getCookie } from "@/utils/storage";
import { notify } from "@/utils/toast";
import Spinner from "../Spinner/Spinner";

type Props = {
  ideaId: string;
  fname: string
  lname: string
  getIdeaComments: () => void
};

const PostIdeaComment = ({ ideaId, fname, lname, getIdeaComments }: Props) => {
  const id = getCookie("id");
  const [commentOnIdea, { isLoading, isSuccess, isError, error }] =
    useCommentOnIdeaMutation();
  const [comment, setComment] = useState<string>("");
  const createCommentHandler = () => {
    commentOnIdea({
      body: {
        content: comment,
        userId: id,
      },
      ideaId,
    });
  };

  useEffect(() => {
    
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong", "error");
    }
    if (isSuccess) {
      notify("Comment posted successfully", "success");
      setComment("")
      getIdeaComments()
      
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <h3 className="font-semibold mb-4">Post a comment</h3>
      <div className="bg-gray7 rounded-lg p-6">
        <div className="flex items-center">
          <div className=" w-[90%] sm:w-auto flex flex-wrap sm:flex-nowrap items-center mr-auto">
            <div className=" text-sm  mr-4 bg-gradient-to-br from-[#5C6670] to-black1 text-white rounded-full p-1 h-[2.3rem] w-[2.3rem] flex items-center justify-center">
              <p>{fname[0]}{lname[0]}</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <h3 className="font-medium mb-1">{fname} {lname}</h3>
            </div>
          </div>
          <p className="text-xs">0/250</p>
        </div>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
          placeholder="Share your thoughts"
          className="outline-none bg-transparent w-full mt-8 resize-none"
        ></textarea>
        <div className="flex">
          <Button
            clicked={createCommentHandler}
            disabled={!comment}
            classname="bg-primary ml-auto flex items-center justify-center  disabled:bg-gray6  text-white w-[6rem] py-2 rounded-full text-sm font-medium"
          >
            {isLoading ? (
              <div className="py-1">
                <Spinner />
              </div>
            ) : (
              "Reply"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostIdeaComment;
