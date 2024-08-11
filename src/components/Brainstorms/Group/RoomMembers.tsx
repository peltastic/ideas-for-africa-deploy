import Button from "@/components/Button/Button";
import {
  useGetGroupMembersQuery,
  useInviteMemberMutation,
  useLazyCheckInviteMemberQuery,
} from "@/lib/features/brainstorms";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import CancelSvg from "/public/assets/cancel2.svg";

import NoProfilePic from "/public/assets/no-profile.jpg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TailwindSpinner from "@/components/Spinner/TailwindSpinner";
import { AspectRatio } from "@mantine/core";
import { getCookie } from "@/utils/storage";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import { Form, Formik } from "formik";
import Field from "@/components/Input/Field";
import Spinner from "@/components/Spinner/Spinner";
import { checkInviteEmailSchema } from "@/utils/validation";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  setShowProps: (val: boolean) => void;
  show?: boolean;
  adminId: string | undefined;
  groupId: string | undefined;
};

const RoomMembers = (props: Props) => {
  const id = getCookie("id");
  const { subId } = useParams<{ subId: string }>();
  const [opened, { open, close }] = useDisclosure();
  const { data, isFetching } = useGetGroupMembersQuery(subId ?? skipToken);
  const [checkInviteEmail, result] = useLazyCheckInviteMemberQuery();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userExists, setUserExists] = useState<boolean>(false);
  const [inviteMember, invite] = useInviteMemberMutation();
  // console.log(data.)
  useEffect(() => {
    if (result.isError) {
      setErrorMessage("Something went wrong, could not verify email");
    }
    if (result.isSuccess) {
      setUserExists(result.data.exists);
      setErrorMessage("")
    }
  }, [result.isSuccess, result.isError]);
  useEffect(() => {
    if (invite.isError) {
      notifications.show({
        title: "Invite Error",
        message:
          (invite.error as any)?.data?.message || "Could not sent invite",
        autoClose: 3000,
        color: errorColor,
      });
    }
    if (invite.isSuccess) {
      notifications.show({
        title: "Invite Sent",
        message: "An initiation has been successfully sent to recipient's email",
        autoClose: 4000,
        color: successColor,
      });
      close();
    }
  }, [invite.isSuccess, invite.isError]);
  return (
    <>
      <ModalComponent
        opened={opened}
        onClose={close}
        size="lg"
        centered
        // withCloseButton
      >
        <h1 className="text-2xl font-semibold">
          Invite a user to this brainstrom group
        </h1>
        <div className="">
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values) => {
              if (result.isLoading) return
              if (!userExists) {
                return setErrorMessage(
                  "user isn't registered on this platform"
                );
              }
              setErrorMessage("");
              if (props.groupId && props.adminId) {
                inviteMember({
                  email: values.email,
                  groupId: props.groupId,
                  invitedBy: props.adminId,
                });
              }
            }}
            validationSchema={checkInviteEmailSchema}
          >
            <Form>
              <div className="flex items-center gap-6 mt-8">
                <div className="relative w-full">
                  <Field
                    classname=""
                    name="email"
                    label="Email"
                    changed={(e: React.ChangeEvent<HTMLInputElement>) => {
                      
                      if (
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                          e.target.value
                        )
                      ) {
                        checkInviteEmail(e.target.value);
                      }
                    
                    }}
                    placeholder="example@email.com"
                  />
                  {result.isFetching ? (
                    <div className="absolute right-5 top-[70%] -translate-y-1/2">
                      <Spinner dark />
                    </div>
                  ) : null}
                </div>
                <Button
                  disabled={invite.isLoading}
                  type="submit"
                  classname="rounded-full w-[5rem] flex justify-center mt-8 px-6 py-2 border border-primary bg-primary text-gray7"
                >
                  {invite.isLoading ? (
                    <div className="py-1">
                      <Spinner />
                    </div>
                  ) : (
                    "Invite"
                  )}
                </Button>
              </div>
              <div className="text-[#ce1919] mt-3 ml-4">
                <p>{errorMessage}</p>
              </div>
            </Form>
          </Formik>
        </div>
      </ModalComponent>
      <div className="bg-white rounded-md py-6 px-4">
        <div className="flex mb-10 lg:hidden">
          <div className="w-fit " onClick={() => props.setShowProps(false)}>
            <Image
              src={CancelSvg}
              alt="cancel"
              className="ml-auto mr-5 w-[1.2rem] h-[1.2rem] "
            />
          </div>
        </div>
        <div className="flex items-center border-b pb-6">
          <p className="font-semibold">Group Members</p>
          {props.groupId && props.adminId && id === props.adminId ? (
            <Button
              clicked={open}
              classname="bg-gray3 rounded-full py-2 px-6 ml-auto text-sm"
            >
              Invite
            </Button>
          ) : null}
        </div>
        {isFetching ? (
          <div className="mt-5 w-full flex justify-center ">
            <TailwindSpinner />
          </div>
        ) : (
          <div className="">
            {data?.map((el) => (
              <div key={el._id} className=" flex mt-8 items-center">
                <div className="mr-3 rounded-full overflow-hidden w-[2.4rem] h-[2.4rem]">
                  <AspectRatio ratio={1800 / 1800}>
                    <Image
                      src={el.profile.ppicture || NoProfilePic}
                      width={100}
                      height={100}
                      className="w-full"
                      alt="avatar"
                    />
                  </AspectRatio>
                </div>
                <div className="text-sm mr-auto ">
                  <p className="font-semibold mb-[0.02rem]">
                    {el.profile.fname} {el.profile.lname}
                  </p>
                  {/* <p className="leading-5 text-gray1">CEO Pledre Solutions</p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RoomMembers;
