import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useCommentOnIdeaMutation } from "@/lib/features/comments";
import { getCookie } from "@/utils/storage";
import Spinner from "../Spinner/Spinner";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  ideaId: string;
  fname: string;
  lname: string;
  getIdeaComments: () => void;
};

const PostIdeaComment = ({ ideaId, fname, lname, getIdeaComments }: Props) => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  const [opened, { open, close }] = useDisclosure();
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
      notifications.show({
        title: "Error",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
    }
    if (isSuccess) {
      notifications.show({
        title: "Success!",
        message: "Comment posted successfuly!",
        autoClose: 3000,
        color: successColor,
      });
      setComment("");
      getIdeaComments();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <ModalComponent size="'md" centered opened={opened} onClose={close}>
        <div className=" pb-7 px-9">
          <h1 className="font-semibold mb-4 text-lg">
            You need to be logged in to interact
          </h1>
          <div className="flex text-sm">
            <Link
              className="border border-primary text-sm text-primary xxs:mr-4 rounded-full py-2 px-5"
              href={"/auth/login"}
            >
              Log in
            </Link>
            <Link
              className="hidden xxs:block border text-sm border-primary bg-primary text-white rounded-full py-2 px-5"
              href={"/auth/register"}
            >
              Sign up
            </Link>
          </div>
        </div>
      </ModalComponent>
      <div>
        <h3 className="font-semibold mb-4">Post a comment</h3>
        <div className="bg-gray7 rounded-lg p-6">
          <div className="flex items-center">
            {fname[0] ? (
              <div className=" w-[90%] sm:w-auto flex flex-wrap sm:flex-nowrap items-center mr-auto">
                <div className=" text-sm  mr-4 bg-gradient-to-br from-[#5C6670] to-black1 text-white rounded-full p-1 h-[2.3rem] w-[2.3rem] flex items-center justify-center">
                  <p>
                    {fname[0]}
                    {lname[0]}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <h3 className="font-medium mb-1">
                    {fname} {lname}
                  </h3>
                </div>
              </div>
            ) : null}
            <p className="text-xs">{comment.length}/250</p>
          </div>
          <textarea
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (authStatus === "LOGGED_OUT") {
                open();
              }
              setComment(e.target.value);
            }}
            placeholder="Share your thoughts"
            className="outline-none bg-transparent w-full mt-8 resize-none"
          ></textarea>
          <div className="flex">
            <Button
              clicked={createCommentHandler}
              disabled={!comment || authStatus === "LOGGED_OUT"}
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
    </>
  );
};

export default PostIdeaComment;
