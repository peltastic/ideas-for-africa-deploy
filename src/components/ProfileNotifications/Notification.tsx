import React, { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import Button from "../Button/Button";
import { IGetProfileNotificationResponse } from "@/interface/notifications";
import { useRespondToRequestMutation } from "@/lib/features/brainstorms";
import { getCookie } from "@/utils/storage";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";
import moment from "moment";
import MenuComponent from "../Menu/Menu";
import Link from "next/link";
import { formatNameRoute } from "@/utils/helperfunctions";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  data: IGetProfileNotificationResponse;
};

const Notification = (props: Props) => {
  const id = getCookie("id");
  const [respondToRequest, { data, isLoading, isError, isSuccess, error }] =
    useRespondToRequestMutation();

  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [declineLoading, setDeclineLoading] = useState<boolean>(false);

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
        title: "Success!",
        message: "",
        autoClose: 3000,
        color: successColor,
      });
      setAcceptLoading(false);
      setDeclineLoading(false);
    }
  }, [isError, isSuccess]);
  console.log(props.data.action.ideaheadline, props.data.action.IdeaId)

  return (
    <div className="my-10">
      <div className="flex items-center ">
        <div className=" w-[90%] sm:w-auto flex flex-wrap sm:flex-nowrap items-center mr-auto">
          <div className="  mr-4 bg-gradient-to-br from-[#5C6670] to-black1 text-white rounded-full p-1 h-[2.5rem] w-[2.5rem] flex items-center justify-center">
            <p>NC</p>
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
                    href={`/idea/${props.data.action.IdeaId}/${formatNameRoute(props.data.action.ideaheadline || "")}/brainstorms/${props.data.action.groupId}`}
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
      {props.data.type === "Request" ? (
        <div className="flex items-center mt-6">
          <Button
            clicked={() => {
              setAcceptLoading(true);
              respondToRequest({
                memberId: props.data.action.memberId,
                status: "accepted",
                userId: id,
              });
            }}
            classname="text-sm w-[8rem] mr-6 py-2 flex justify-center rounded-full bg-gray3"
          >
            {acceptLoading ? (
              <div className="py-1">
                <Spinner dark />
              </div>
            ) : (
              <p>Accept</p>
            )}
          </Button>
          <Button
            clicked={() => {
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
            {declineLoading ? (
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
  );
};

export default Notification;
