import React, { useEffect, useState } from "react";
import CancelSvg from "/public/assets/cancel2.svg";
import Image from "next/image";
import Editor from "../Editor/Editor";
import Button from "../Button/Button";
import { useCreateGroupMutation, useLazyGetGroupsQuery } from "@/lib/features/brainstorms";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "@/utils/storage";
import { notify } from "@/utils/toast";
import Spinner from "../Spinner/Spinner";

type Props = {
  close: () => void;
};

const CreateBrainstormGroup = (props: Props) => {
  const userId = getCookie("id");
  const { id } = useParams();
  const [getGroups, result] = useLazyGetGroupsQuery()
  const [createGroup, { isLoading, isSuccess, isError, error }] =
    useCreateGroupMutation();

  const [description, setDescription] = useState<string>("");
  const createGroupHandler = () => {
    createGroup({
      ideaId: id as string,
      name: description,
      userId,
    });
  };

  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong", "error");
      return () => {};
    }
    if (isSuccess) {
      notify("Brainstorm group created successfully", "success");
      props.close()
      getGroups(id as string)
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
        content={description}
        setIdea={(key, value) => setDescription(value as string)}
      />
      <Button
        clicked={createGroupHandler}
        disabled={description === "<p></p>"}
        classname="mt-8 bg-primary disabled:bg-gray6 disabled:cursor-not-allowed py-3 px-8 text-sm text-center flex justify-center rounded-3xl w-full text-white "
      >
        {isLoading ?
         <div className="py-1">

         <Spinner />
         </div>
          : "Continue"}
      </Button>
    </div>
  );
};

export default CreateBrainstormGroup;
