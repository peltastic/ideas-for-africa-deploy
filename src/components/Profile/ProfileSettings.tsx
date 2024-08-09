import Image from "next/image";
import React, { useEffect, useState } from "react";
import Field from "../Input/Field";
import { Form, Formik } from "formik";
import NoProfilePic from "/public/assets/no-profile.jpg";
import Photo from "/public/assets/photo.svg";
import Delete from "/public/assets/delete.svg";
import FileButtonComponent from "../FileButton/FileButton";
import {
  useChangePasswordMutation,
  useUploadProfilePictureMutation,
} from "@/lib/features/profile";
import { getCookie } from "@/utils/storage";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import { changePasswordSchema } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  tempPfp?: string;
  setTempPfp: (pfp: string) => void;
};

const ProfileSettings = (props: Props) => {
  const router = useRouter();
  const id = getCookie("id");
  const [changePfp, { data, isLoading, isSuccess, isError, error }] =
    useUploadProfilePictureMutation();
  const [changePassword, result] = useChangePasswordMutation();
  const [pfpFile, setPfpFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const changePfpHandler = () => {
    if (!pfpFile) return;
    changePfp({
      id,
      pfp: pfpFile,
    });
  };
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Upload unsuccessful",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      return () => {};
    }
    if (isSuccess) {
      notifications.show({
        title: "Success!",
        message: "Profile uploaded successfully!",
        autoClose: 3000,
        color: successColor,
      });
      props.setTempPfp(data?.ppicture);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (result.isError) {
      notifications.show({
        title: "Password change unsuccessful",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
      return () => {};
    }
    if (result.isSuccess) {
      notifications.show({
        title: "Success!",
        message: "Password changed successfully successfully",
        autoClose: 3000,
        color: successColor,
      });
      router.push("/profile");
    }
  }, [result.isError, result.isSuccess]);
  return (
    <div>
      <div className="mt-8">
        <p className="font-semibold text-xl mb-5">Image</p>
        <div className="flex flex-wrap items-center mt-4 gap-8">
          <div className="w-[5rem] overflow-hidden rounded-full mx-0">
            <Image
              src={imagePreview || props.tempPfp || NoProfilePic}
              width={100}
              height={100}
              alt="no-profile-image"
            />
          </div>
          <div className="flex flex-wrap  sm:justify-center xxs:justify-start w-full sm:w-auto items-center gap-2 sm:gap-10">
            <FileButtonComponent
              setFile={(_, value) => {
                setPfpFile(value);

                const url = URL.createObjectURL(value as File);
                setImagePreview(url);
              }}
              accept="image/png,image/jpeg"
            >
              <div className="gap-3 w-full  xxs:w-auto justify-center xxs:justify-start flex border rounded-full px-3 sm:px-7 py-3">
                <Image src={Photo} alt="photo" />
                <p className="text-sm sm:text-base">Change image</p>
              </div>
            </FileButtonComponent>
            <div className="gap-3 w-fit justify-center xxs:justify-start  xxs:w-auto flex border rounded-full px-3 sm:px-7 py-3">
              <Image src={Delete} alt="delete-photo" />
              <p className="text-sm sm:text-base">Delete image</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={changePfpHandler}
        disabled={!pfpFile}
        className="flex w-[8rem] items-center text-sm rounded-full px-8 py-3 my-6 bg-primary disabled:bg-gray6 disabled:border-0 disabled:cursor-not-allowed text-white md:mr-8 border-primary border mt-6"
      >
        {isLoading ? (
          <div className="flex w-full justify-center py-1">
            <Spinner />
          </div>
        ) : (
          <p>Change</p>
        )}
      </button>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfrim: "",
        }}
        onSubmit={(values) => {
          changePassword({
            userId: id,
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          });
        }}
        validationSchema={changePasswordSchema}
      >
        <Form className="w-full sm:w-[60%]">
          <h1 className="mt-20 font-semibold text-xl">Change Password</h1>
          <div className="mt-10 sm:mt-8">
            <Field
              classname=""
              name="oldPassword"
              label="Old password"
              placeholder=""
              password
            />
          </div>
          <div className="mt-10 sm:mt-8">
            <Field
              classname=""
              name="newPassword"
              label="New password"
              password
              placeholder=""
            />
          </div>
          <div className="mt-10 sm:mt-8">
            <Field
              classname=""
              password
              name="newPasswordConfrim"
              label="Confirm new password"
              placeholder=""
            />
          </div>
          <Button classname="rounded-full w-[8rem] mb-6 mt-8 py-3 border border-primary bg-primary text-gray7">
            {result.isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <p>Save</p>
            )}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileSettings;
