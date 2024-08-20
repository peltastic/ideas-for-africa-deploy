import EditImg from "/public/assets/edit.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileSvg from "/public/assets/profile-svg.svg";

import NoProfilePic from "/public/assets/no-profile.jpg";

import ProfileSvgMobile from "/public/assets/profile-svg-mobile.svg";
import FileButtonComponent from "../FileButton/FileButton";
import { useUploadProfilePictureMutation } from "@/lib/features/profile";
import Spinner from "../Spinner/Spinner";
import { getCookie } from "@/utils/storage";
import { AspectRatio } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";
import { IoMdAdd } from "react-icons/io";


type Props = {
  fname: string;
  lname: string;
  email: string;
  url?: string;
  pfp?: string;
  readonly?: boolean;
  // refetch?: () => void;
  // setEdit: (param: boolean) => void
};

const ProfileHeader = (props: Props) => {
  const id = getCookie("id");
  const [preview, setPreview] = useState<string>("");
  const [changePfp, { data, isLoading, isSuccess, isError, error }] =
    useUploadProfilePictureMutation();

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Upload unsuccessful",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      setPreview("");
      return () => {};
    }
    if (isSuccess) {
      notifications.show({
        title: "Success!",
        message: "Profile uploaded successfully!",
        autoClose: 3000,
        color: successColor,
      });
    }
  }, [isError, isSuccess]);

  return (
    <div className="relative flex items-center overflow-hidden bg-gradient-to-b py-6 rounded-xl mt-9 px-4 sm:px-10 from-primary-light to-primary">
      <div className="flex flex-wrap items-center ">
        <div className="relative w-fit mr-4">
          {isLoading ? (
            <>
              <div className="h-full rounded-full w-full absolute left-0 top-0 bg-[#000000a1]"></div>
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            </>
          ) : null}
          {props.readonly ? (
            <div className=" w-[4.5rem] h-[4.5rem] overflow-hidden rounded-full">
              <AspectRatio ratio={1800 / 1800}>
                <Image
                  src={preview || props.url || NoProfilePic}
                  width={100}
                  height={100}
                  alt="avatar"
                  className="w-full h-full"
                />
              </AspectRatio>
            </div>
          ) : (
            <FileButtonComponent
              setFile={(_, value) => {
                if (value) {
                  changePfp({
                    id,
                    pfp: value,
                  });
                  const url = URL.createObjectURL(value as File);
                  setPreview(url);
                }
              }}
              accept="image/png,image/jpeg"
            >
              <div className="relative">

                <div className="text-primary absolute right-0 rounded-full bottom-2 bg-white">
                  <IoMdAdd />
                </div>
              <div className=" w-[4.5rem] h-[4.5rem]  overflow-hidden rounded-full">
                <AspectRatio ratio={1800 / 1800}>
                  <Image
                    src={preview || props.url || NoProfilePic}
                    width={100}
                    height={100}
                    alt="avatar"
                    className="h-full w-full"
                    />
                </AspectRatio>
              </div>
                    </div>
            </FileButtonComponent>
          )}
        </div>
        <div className="w-full mt-3 sm:mt-0 sm:w-auto">
          <div className="text-xs mr-auto text-white ">
            <p className="font-bold text-xl sm:text-2xl mb-1">
              {props.fname} {props.lname}
            </p>
            <p className="leading-5 text-white text-[0.9rem]">
              {props.email} • Created Feb 23, 2024
            </p>
          </div>
        </div>
      </div>
      {/* <div onClick={() => props.setEdit(true)}  className="relative z-[10] flex items-center rounded-full bg-white ml-auto px-3 text-xs py-2 gap-2 cursor-pointer">
        <Image src={EditImg} alt="edit-img" />
        <p>Edit</p>
      </div> */}
      <div className="absolute right-0 top-0">
        <div className="hidden des:block">
          <Image src={ProfileSvg} alt="profile-svg" />
        </div>
        <div className="block des:hidden">
          <Image src={ProfileSvgMobile} alt="profile-svg" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
