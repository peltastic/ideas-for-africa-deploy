import React, { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import Button from "../Button/Button";
import { IGetProfileNotificationResponse } from "@/interface/notifications";
import {
  useAcceptInviteMutation,
  useRespondToRequestMutation,
} from "@/lib/features/brainstorms";
import { getCookie } from "@/utils/storage";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";
import moment from "moment";
import MenuComponent from "../Menu/Menu";
import Link from "next/link";
import { formatNameRoute } from "@/utils/helperfunctions";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "../Modal/Modal";
import { useRouter } from "next/navigation";

type Props = {
  data: IGetProfileNotificationResponse;
};

const Notification = (props: Props) => {
  const router = useRouter();
  const id = getCookie("id");
  const [respondToRequest, { data, isLoading, isError, isSuccess, error }] =
    useRespondToRequestMutation();
  const [acceptInvite, result] = useAcceptInviteMutation();
  const [actionType, setActionType] = useState<
    "acceptInv" | "rejectInv" | "acceptReq" | "rejectReq" | ""
  >("");
  const [opened, { open, close }] = useDisclosure();

  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [declineLoading, setDeclineLoading] = useState<boolean>(false);
  const [acceptInviteLoading, setAcceptInviteLoading] =
    useState<boolean>(false);
  const [rejectInviteLoading, setRejectInviteLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (result.isError) {
      notifications.show({
        title: "An error occured",
        message: (result.error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      setAcceptInviteLoading(false);
      setRejectInviteLoading(false);
    }
    if (result.isSuccess) {
      notifications.show({
        title:
          actionType === "acceptInv"
            ? "Invite Accepted Successfully"
            : "Invite Rejected Successfully",
        message: "",
        autoClose: 3000,
        color: successColor,
      });
      setAcceptInviteLoading(false);
      setRejectInviteLoading(false);
      if (actionType === "acceptInv") {
        open()
      }
    }
  }, [result.isError, result, isSuccess]);
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "An error occured",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      setAcceptLoading(false);
      setDeclineLoading(false);
    }
    if (isSuccess) {
      notifications.show({
        title:
          actionType === "acceptReq"
            ? "Request to Join Accepted Successfully!"
            : "Request to Join Rejected Successfully!",
        message: "",
        autoClose: 3000,
        color: successColor,
      });
      setAcceptLoading(false);
      setDeclineLoading(false);
      if (actionType === "acceptReq") {
        open();
      }
    }
  }, [isError, isSuccess]);

  return (
    <>
      <ModalComponent onClose={close} size="lg" centered opened={opened}>
        <div className=" py-10">
          <h1 className="mb-6">
            {actionType === "acceptReq"
              ? `You've successfully accpeted ${props.data.action.username}'s request to join your brainstorm group ${props.data.action.ideaheadline}`
              : `You've successfully accpeted ${props.data.action.username}'s invite to join your brainstorm group ${props.data.action.ideaheadline}`}
          </h1>
          <Button
            clicked={() =>
              router.push(
                `/idea/${props.data.action.IdeaId}/${formatNameRoute(
                  props.data.action.ideaheadline || ""
                )}/brainstorms/${props.data.action.groupId}`
              )
            }
            classname="text-sm text-white bg-primary py-2 flex justify-center rounded-md w-[8rem] text-center"
          >
            Open Group
          </Button>
        </div>
      </ModalComponent>
      <div className="my-10">
        <div className="flex items-center ">
          <div className=" w-[90%] sm:w-auto flex flex-wrap sm:flex-nowrap items-center mr-auto">
            <div className="  mr-4 bg-gradient-to-br from-[#5C6670] to-black1 text-white rounded-full p-1 h-[2.5rem] w-[2.5rem] flex items-center justify-center">
              <p>{props.data.action.username.split(" ")[0][0]}{props.data.action.username.split(" ")[1][0]}</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <h3 className="font-semibold text-sm mb-1">
                {props.data.action.username}
              </h3>
              <p className="text-gray1 text-xs">
                {props.data.title} • {moment(props.data.time).fromNow()}{" "}
              </p>
            </div>
          </div>
          {props.data.type &&
          (props.data.type === "Response" || props.data.type === "Request") ? (
            <div className="bg-gray3 flex items-center  justify-center  h-[1.7rem] w-[1.7rem] rounded-full">
              <MenuComponent
                target={
                  <div>
                    <SlOptions className="text-xs cursor-pointer" />
                  </div>
                }
              >
                <div className="bg-white shadow-md py-3 px-4 text-sm">
                  <div className="">
                    <Link
                      href={`/idea/${
                        props.data.action.IdeaId
                      }/${formatNameRoute(
                        props.data.action.ideaheadline || ""
                      )}/brainstorms/${props.data.action.groupId}`}
                    >
                      Open Group
                    </Link>
                  </div>
                </div>
              </MenuComponent>
            </div>
          ) : null}
        </div>
        <div className="text-sm mt-4">
          <p>{props.data.body}</p>
        </div>
        {props.data.type === "Request" || props.data.type === "Invite" ? (
          <div className="flex items-center mt-6">
            <Button
              clicked={() => {
                if (props.data.type === "Invite") {
                  setActionType("acceptInv");
                  setAcceptInviteLoading(true);
                  return acceptInvite({
                    groupId: props.data.action.groupId,
                    userId: props.data.action.userId,
                    status: "accepted",
                  });
                }
                setActionType("acceptReq");
                setAcceptLoading(true);
                respondToRequest({
                  memberId: props.data.action.memberId,
                  status: "accepted",
                  userId: id,
                });
              }}
              classname="text-sm w-[8rem] mr-6 py-2 flex justify-center rounded-full bg-gray3"
            >
              {acceptLoading || acceptInviteLoading ? (
                <div className="py-1">
                  <Spinner dark />
                </div>
              ) : (
                <p>Accept</p>
              )}
            </Button>
            <Button
              clicked={() => {
                if (props.data.type === "Invite") {
                  setActionType("rejectInv");
                  setRejectInviteLoading(true);
                  return acceptInvite({
                    groupId: props.data.action.groupId,
                    userId: props.data.action.userId,
                    status: "declined",
                  });
                }
                setActionType("rejectReq");
                setDeclineLoading(true);
                respondToRequest({
                  memberId: props.data.action.memberId,
                  status: "declined",
                  userId: id,
                });
              }}
              classname="text-red1 w-[8rem] text-sm py-2 flex justify-center rounded-full  border border-gray3"
            >
              {" "}
              {declineLoading || rejectInviteLoading ? (
                <div className="py-1">
                  <Spinner dark />
                </div>
              ) : (
                <p>Decline</p>
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Notification;
