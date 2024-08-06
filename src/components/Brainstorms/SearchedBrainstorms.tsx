import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { AspectRatio } from "@mantine/core";
import NoProfilePic from "/public/assets/no-profile.jpg";
import { getCookie } from "@/utils/storage";
import { useRequestToJoinGroupMutation } from "@/lib/features/brainstorms";
import ModalComponent from "../Modal/Modal";
import NotLoggedInModal from "../ModalComponents/NotLoggedInModal";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { formatNameRoute } from "@/utils/helperfunctions";
import { notify } from "@/utils/toast";
import Spinner from "../Spinner/Spinner";

type Props = {
  data: {
    _id: string;
    ideaId: string;
    name: string;
    admin: string;
    text: string;
    createdAt: string;
    adminName: {
      fname: string;
      lname: string;
    };
    adminPpicture: string | "Not available";
    ideaHeadline: string;
    thumbnailPath: string;
    userMembershipStatus: "Not a member" | "accepted" | "requested";
  };
};

const SearchedBrainstorms = (props: Props) => {
  const router = useRouter();
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  const [opened, { open, close }] = useDisclosure();
  const [requestToJoin, { isLoading, isSuccess, isError, error }] =
    useRequestToJoinGroupMutation();
  const id = getCookie("id");
  const [userStatus, setUserStatus] = useState<
    "Not a member" | "accepted" | "requested"
  >(props.data.userMembershipStatus);
  const handleButtonAction = () => {
    if (authStatus === "LOGGED_OUT") {
      return open();
    }
    if (props.data.admin === id || userStatus === "accepted") {
      return router.push(
        `/idea/${props.data.ideaId}/${formatNameRoute(
          props.data.ideaHeadline
        )}/brainstorms/${props.data._id}`
      );
    }
    requestToJoin({
      groupId: props.data._id,
      userId: id,
    });
  };
  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      notify("Request Sent", "success");
      setUserStatus("requested");
    }
  }, [isSuccess, isError]);
  return (
    <>
      <ModalComponent size="lg" centered opened={opened} onClose={close}>
        <NotLoggedInModal title="You need to be logged in to access or interact with a brainstorm group" />
      </ModalComponent>
      <div className="cursor-pointer hover:bg-[#e3e3e32a] transition-all flex-wrap sm:flex-nowrap flex py-4 px-4 gap-4 rounded-xl  ">
        <div className="w-full sm:w-[30%] ">
          <AspectRatio ratio={1080 / 720}>
            <Image
              src={props.data.thumbnailPath}
              alt="idea-img"
              className="w-full rounded-xl"
              width={100}
              height={100}
            />
          </AspectRatio>
        </div>
        <div className="sm:w-[70%] flex flex-col  ">
          <p className="font-semibold text-sm mb-auto">
            {props.data.adminName.fname}&apos;s brainstorm groups on{" "}
            {props.data.ideaHeadline}
          </p>
          <div className="mt-8 sm:mt-0 flex items-center">
            <div className="w-[2.5rem] [2.5rem] mr-5 rounded-full overflow-hidden">
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={
                    props.data.adminPpicture === "Not available"
                      ? NoProfilePic
                      : props.data.adminPpicture
                  }
                  width={100}
                  height={100}
                  className="w-full h-full"
                  alt="brainstorm-image"
                />
              </AspectRatio>
            </div>
            <div className="">
              <p className="text-xs font-medium">
                {props.data.adminName.fname} {props.data.adminName.lname}
              </p>
              <Button
                clicked={handleButtonAction}
                disabled={userStatus === "requested"}
                classname="flex  disabled:bg-gray6 disabled:text-white disabled:border-gray6  items-center text-[0.65rem]  rounded-full px-3 py-[0.2rem] hover:bg-primary hover:text-white transition-all text-primary  disabled:cursor-not-allowed  border-primary border mt-2"
              >
                {isLoading ? (
                  <div className="py-1 flex justify-center w-[4rem]">
                    <Spinner  />
                  </div>
                ) : (
                  <p>
                    {id === props.data.admin
                      ? "Open group"
                      : userStatus === "Not a member"
                      ? "Request To Join"
                      : userStatus === "requested"
                      ? "Pending"
                      : userStatus === "accepted"
                      ? "Open group"
                      : "Request To Join"}
                  </p>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedBrainstorms;
