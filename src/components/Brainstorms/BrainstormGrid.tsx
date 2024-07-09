import React, { useEffect, useState } from "react";
import BrainstromImg from "/public/assets/brainstorm.png";
import Image from "next/image";

import Avatar from "/public/assets/avatar.png";
import AvatarGroup from "../AvatarGroup/AvatarGroup";
import Button from "../Button/Button";
import { replacePTags } from "@/utils/helperfunctions";
import { getCookie } from "@/utils/storage";
import { useRequestToJoinGroupMutation } from "@/lib/features/brainstorms";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";
import { useReturnFcmTokenQuery } from "@/lib/features/notifications";
import { useParams, useRouter } from "next/navigation";

type Props = {
  groups: {
    admin: string;
    adminFname: string;
    name: string;
    ideadId: string;
    _id: string;
    status: "Not a member" | "requested";
  };
  title: string;
  ideaCreator: {
    fname: string;
    lname: string;
    pow: string;
  };
};

const BrainstormGrid = (props: Props) => {
  const params = useParams<{ id: string; nameId: string }>();
  const router = useRouter();
  // const getAdminFcm = useReturnFcmTokenQuery(props.groups.admin);
  const [requestToJoin, { isLoading, isSuccess, isError, error }] =
    useRequestToJoinGroupMutation();
  const [userStatus, setUserStatus] = useState<"Not a member" | "requested" | "Accepted">(
    props.groups.status
  );
  const id = getCookie("id");
  const [adminFcm, setAdminFcm] = useState<string>("");

  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      notify("Request Sent", "success");
      setUserStatus("requested");
    }
  }, [isSuccess, isError]);

  // useEffect(() => {
  //   if (getAdminFcm.data) {
  //     setAdminFcm(getAdminFcm.data.fcmtoken);
  //   }
  // }, [getAdminFcm.data]);

  const handleButtonAction = () => {
    if (props.groups.admin === id || userStatus === "Accepted") {
      return router.push(
        `/idea/${params.id}/${params.nameId}/brainstorms/${props.groups._id}`
      );
    }
    requestToJoin({
      groupId: props.groups._id,
      userId: id,
    });
  };

  const url =
    "https://res.cloudinary.com/da9gqyswp/image/upload/v1718374149/fictpkp627qfootj0o8g.jpg";
  return (
    <div className="hover:bg-[#c2c2c21d] transition-all cursor-pointer shadow-[0_0px_10px_rgba(0,0,0,0.1)] rounded-xl py-6 px-4">
      <div
        className=""
        onClick={() => {
          if (userStatus === "requested" || userStatus === "Not a member") {
            return;
          }

          router.push(
            `/idea/${params.id}/${params.nameId}/brainstorms/${props.groups._id}`
          );
        }}
      >
        <Image src={BrainstromImg} alt="brainstorm-group-image" />
        <h2 className="text-black1 font-semibold text-sm mt-4 mb-6">
          {props.groups.adminFname}&apos;s brainstorm group on {props.title}
        </h2>
        <p
          dangerouslySetInnerHTML={{
            __html: `${replacePTags(props.groups.name)}`,
          }}
          className="text-gray1 text-sm h-[5rem] overflow-hidden"
        ></p>
      </div>
      <div className=" flex mt-8 items-center">
        <div className="mr-3 w-[2.4rem]">
          <Image src={Avatar} className="w-full" alt="avatar" />
        </div>
        <div className="text-xs mr-auto ">
          <p className="font-bold mb-[0.02rem]">
            {props.ideaCreator.fname} {props.ideaCreator.lname}
          </p>
          <p className="leading-5 text-gray1">{props.ideaCreator.pow}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap lg:flex-nowrap  items-center">
        <AvatarGroup avatars={[url, url, url, url]} />
        <Button
          disabled={userStatus === "requested"}
          clicked={handleButtonAction}
          classname="flex  ml-auto sm:ml-0 md:ml-auto  items-center text-xs des:text-sm rounded-full px-5 py-2 my-6 bg-primary disabled:bg-gray6 disabled:border-0 disabled:cursor-not-allowed text-white  border-primary border mt-6"
        >
          {isLoading ? (
            <div className="py-1 flex justify-center w-[4rem]">
              <Spinner />
            </div>
          ) : (
            <p>
              {props.groups.admin === id
                ? "Open group"
                : userStatus === "Not a member"
                ? "Request To Join"
                : userStatus === "requested"
                ? "Pending"
                : userStatus === "Accepted" ? "Open group" : ""}
            </p>
            // <p>
            //   {requestSent
            //     ? "Pending..."
            //     : props.groups.admin === id
            //     ? "Open group"
            //     : "Request To Join"}
            // </p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BrainstormGrid;
