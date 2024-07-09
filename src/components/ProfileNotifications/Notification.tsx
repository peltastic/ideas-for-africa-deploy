import React, { useEffect } from "react";
import { SlOptions } from "react-icons/sl";
import Button from "../Button/Button";
import { IGetProfileNotificationResponse } from "@/interface/notifications";
import { useRespondToRequestMutation } from "@/lib/features/brainstorms";
import { getCookie } from "@/utils/storage";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";

type Props = {
  data: IGetProfileNotificationResponse;
};

const Notification = (props: Props) => {
  const id = getCookie("id");
  const [respondToRequest, { data, isLoading, isError, isSuccess, error }] =
    useRespondToRequestMutation();

  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong");
    }
    if (isSuccess) {
      notify("Successful", "success");
    }
  }, [isError, isSuccess]);

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
            <p className="text-gray1 text-xs">{props.data.title} • 1h ago</p>
          </div>
        </div>
        <div className="bg-gray3 flex items-center justify-center  h-[1.7rem] w-[1.7rem] rounded-full">
          <SlOptions className="text-xs" />
        </div>
      </div>
      <div className="text-sm mt-4">
        <p>{props.data.body}</p>
      </div>
      {props.data.type === "Request" ? (
        <div className="flex items-center mt-6">
          <Button
            clicked={() =>
              respondToRequest({
                memberId: props.data._id,
                status: "accepted",
                userId: id,
              })
            }
            classname="text-sm w-[8rem] mr-6 py-2 flex justify-center rounded-full bg-gray3"
          >
            {isLoading ? (
              <div className="py-1">
                <Spinner />
              </div>
            ) : (
              <p>Accept</p>
            )}
          </Button>
          <Button classname="text-red1 w-[8rem] text-sm py-2 rounded-full  border border-gray3">
            <p>Decline</p>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
