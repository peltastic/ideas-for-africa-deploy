import React, { useEffect, useState } from "react";
import BrainstromImg from "/public/assets/brainstorm.png";
import Image from "next/image";
import NoProfilePic from "/public/assets/no-profile.jpg";
import AvatarGroup from "../AvatarGroup/AvatarGroup";
import Button from "../Button/Button";
import { replacePTags, truncateStr } from "@/utils/helperfunctions";
import { getCookie } from "@/utils/storage";
import {
  useGetGroupMembersQuery,
  useRequestToJoinGroupMutation,
} from "@/lib/features/brainstorms";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";
import { useParams, useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "../Modal/Modal";
import NotLoggedInModal from "../ModalComponents/NotLoggedInModal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {
  groups: {
    admin: string;
    adminFname: string;
    name: string;
    text: string;
    ideadId: string;
    _id: string;
    status: "Not a member" | "requested";
  };
  title: string;
  ideaCreator: {
    fname: string;
    lname: string;
    pow: string;
    url?: string;
  };
};

const BrainstormGrid = (props: Props) => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.authStatus
  );
  const [opened, { open, close }] = useDisclosure();
  const params = useParams<{ id: string; nameId: string }>();
  const router = useRouter();
  // const getAdminFcm = useReturnFcmTokenQuery(props.groups.admin);
  const [requestToJoin, { isLoading, isSuccess, isError, error }] =
    useRequestToJoinGroupMutation();
  const result = useGetGroupMembersQuery(props.groups._id);
  const [userStatus, setUserStatus] = useState<
    "Not a member" | "requested" | "Accepted"
  >(props.groups.status);
  const id = getCookie("id");
  const [pfps, setPfps] = useState<string[] | null>(null);

  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      notify("Request Sent", "success");
      setUserStatus("requested");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (result.data) {
      const finalData = result.data.map((el) => el.profile.ppicture || "");
      setPfps(finalData);
    }
  }, [result.data]);

  // useEffect(() => {
  //   if (getAdminFcm.data) {
  //     setAdminFcm(getAdminFcm.data.fcmtoken);
  //   }
  // }, [getAdminFcm.data]);

  const handleButtonAction = () => {
    if (authStatus === "LOGGED_OUT") {
      return open();
    }
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
    <>
      <ModalComponent size="lg" centered opened={opened} onClose={close}>
        <NotLoggedInModal title="You need to be logged in to access or interact with a brainstorm group" />
      </ModalComponent>
      <div className="h-[26rem] relative hover:bg-[#c2c2c21d] transition-all cursor-pointer shadow-[0_0px_10px_rgba(0,0,0,0.1)] rounded-xl py-6 px-4">
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
          <p className="text-sm text-gray1">
            {truncateStr(props.groups.text, 150).text}{" "}
            {truncateStr(props.groups.text, 150).status ? " ..." : ""}
          </p>
        </div>
        <div className="absolute w-[92%] bottom-2">
          <div className=" flex mt-8 items-center">
            <div className="mr-3 w-[2.4rem] rounded-full overflow-hidden">
              <Image
                src={props.ideaCreator.url || NoProfilePic}
                className="w-full"
                alt="avatar"
                width={100}
                height={100}
              />
            </div>
            <div className="text-xs mr-auto ">
              <p className="font-bold mb-[0.02rem]">
                {props.ideaCreator.fname} {props.ideaCreator.lname}
              </p>
              <p className="leading-5 text-gray1">{props.ideaCreator.pow}</p>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-wrap lg:flex-nowrap  items-center">
            {pfps && pfps[0] ? <AvatarGroup avatars={pfps} /> : null}
            {/* <AvatarGroup avatars={[url, url, url, url]} /> */}
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
                    : userStatus === "Accepted"
                    ? "Open group"
                    : ""}
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
      </div>
    </>
  );
};

export default BrainstormGrid;
