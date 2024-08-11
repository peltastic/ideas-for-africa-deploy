"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import Logo from "/public/assets/logo.svg";
import InviteSvg from "/public/assets/invite-animate.svg";
import Button from "@/components/Button/Button";
import {
  useAcceptInvitationMutation,
  useAcceptInviteMutation,
  useLazyGetGroupInfoQuery,
} from "@/lib/features/brainstorms";
import { useSearchParams } from "next/navigation";
import TailwindSpinner from "@/components/Spinner/TailwindSpinner";
import Spinner from "@/components/Spinner/Spinner";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";
import { useDisclosure } from "@mantine/hooks";
import { formatNameRoute } from "@/utils/helperfunctions";
import ModalComponent from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

type Props = {};

const AcceptInvite = (props: Props) => {
  const search = useSearchParams();
  const groupId = search.get("groupId");
  const userId = search.get("userId");
  const [opened, { open, close }] = useDisclosure();
  const router = useRouter();
  const [actionType, setActionType] = useState<"accept" | "reject" | "">("");
  const [acceptInviteLoading, setAcceptInviteLoading] =
    useState<boolean>(false);
  const [rejectInviteLoading, setRejectInviteLoading] =
    useState<boolean>(false);

  const [acceptInvite, { isLoading, isSuccess, isError, error }] =
    useAcceptInviteMutation();
  const [groupLink, setGroupLink] = useState<string>("");

  const [getGroupInfo, result] = useLazyGetGroupInfoQuery();

  useEffect(() => {
    if (groupId) {
      getGroupInfo({
        groupId,
      });
    }
  }, []);
  useEffect(() => {
    if (result.data) {
      setGroupLink(
        `/idea/${result.data.group.ideaId}/${formatNameRoute(
          result.data.ideaheadline
        )}/brainstorms/${result.data.group._id}`
      );
    }
  }, [result.data]);
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Failed",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      setAcceptInviteLoading(false);
      setRejectInviteLoading(false);
    }

    if (isSuccess) {
      notifications.show({
        title: actionType === "accept" ? "Invite Accepted Successfully" : "Invite Rejected Successfully",
        message: "",
        autoClose: 3000,
        color: successColor,
      });
      if (groupLink && actionType === "accept") {
        open();
      }
      setAcceptInviteLoading(false);
      setRejectInviteLoading(false);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <ModalComponent onClose={close} size="lg" centered opened={opened}>
        <div className=" py-10">
          <h1 className="mb-6">
            You&apos;ve successfully accepted an invite to join{" "}
            <span className="font-semibold">{result.data?.fname}</span>
            &apos;s brainstorm group on <span>{result.data?.ideaheadline}</span>
          </h1>
          <Button
            clicked={() => router.push(groupLink)}
            classname="text-sm text-white bg-primary py-2 flex justify-center rounded-md w-[8rem] text-center"
          >
            Open Group
          </Button>
        </div>
      </ModalComponent>
      <div>
        <nav className="flex items-center px-8 py-8">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" />
          </Link>
        </nav>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] lg:w-[60%] ">
          {result.isLoading ? (
            <div className="w-full justify-center flex">
              <TailwindSpinner />
            </div>
          ) : (
            <div className="">
              <Image
                src={InviteSvg}
                alt="invite-svg"
                className="w-[25rem] mx-auto"
              />
              <h1 className=" text-center text-sm sm:text-xl ">
                Accept{" "}
                <span className="font-semibold">
                  {" "}
                  {result.data?.fname}&apos;s
                </span>{" "}
                invite to join{" "}
                <span className="font-semibold">
                  {result.data?.ideaheadline}
                </span>{" "}
                brainstorm group?
              </h1>
              <div className="flex justify-center gap-6 mt-7">
                <Button
                  clicked={() => {
                    if (userId && groupId) {
                      setActionType("accept");
                      setAcceptInviteLoading(true);
                      acceptInvite({
                        groupId,
                        userId,
                        status: "accepted",
                      });
                    }
                  }}
                  classname=" text-white bg-primary py-2 flex justify-center rounded-md w-[10rem] text-center"
                >
                  {acceptInviteLoading ? (
                    <div className="py-1">
                      <Spinner />
                    </div>
                  ) : (
                    "Accept"
                  )}
                </Button>
                <Button
                  clicked={() => {
                    if (userId && groupId) {
                      setActionType("reject");
                      setRejectInviteLoading(true);
                      acceptInvite({
                        groupId,
                        userId,
                        status: "declined",
                      });
                    }
                  }}
                  classname="bg-gray3 w-[10rem] items-center  flex justify-center text-black rounded-md"
                >
                  {rejectInviteLoading ? (
                    <div className="py-1">
                      <Spinner dark />
                    </div>
                  ) : (
                    "Reject"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AcceptInvite;
