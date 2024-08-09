import React, { useEffect, useState } from "react";
import CancelSvg from "/public/assets/cancel2.svg";
import Image from "next/image";
import Editor from "../Editor/Editor";
import Button from "../Button/Button";
import {
  useCreateGroupMutation,
  useLazyGetGroupsQuery,
} from "@/lib/features/brainstorms";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "@/utils/storage";
import Spinner from "../Spinner/Spinner";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  close: () => void;
};

const CreateBrainstormGroup = (props: Props) => {
  const userId = getCookie("id");
  const { id } = useParams();
  const [getGroups, result] = useLazyGetGroupsQuery();
  const [createGroup, { isLoading, isSuccess, isError, error }] =
    useCreateGroupMutation();

  const [description, setDescription] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const createGroupHandler = () => {
    createGroup({
      ideaId: id as string,
      name: description,
      userId,
      text: descriptionText,
    });
  };

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Error creating group",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      return () => {};
    }
    if (isSuccess) {
      notifications.show({
        title: "Group created!",
        message: "Brainstrom group created successfully!",
        autoClose: 3000,
        color: successColor,
      });
      props.close();
      getGroups(id as string);
    }
  }, [isError, isSuccess]);

  return (
    <div className="">
      <div className="flex items-center mb-10">
        <h1 className="mr-auto text-2xl font-bold">
          Create a brainstorm group
        </h1>
        <div onClick={props.close} className="cursor-pointer">
          <Image src={CancelSvg} alt="cancel-svg" />
        </div>
      </div>
      <p className="mb-2">Describe your spinoff idea</p>
      <Editor
        contentProps={description}
        setIdea={(key, value) => {
          if (key === "summary") {
            setDescriptionText(value as string);
          } else {
            setDescription(value as string);
          }
          console.log(key, value);
        }}
      />
      <Button
        clicked={createGroupHandler}
        disabled={description === "<p></p>" || isLoading}
        classname="mt-8 bg-primary disabled:bg-gray6 disabled:cursor-not-allowed py-3 px-8 text-sm text-center flex justify-center rounded-3xl w-full text-white "
      >
        {isLoading ? (
          <div className="py-1">
            <Spinner />
          </div>
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  );
};

export default CreateBrainstormGroup;
