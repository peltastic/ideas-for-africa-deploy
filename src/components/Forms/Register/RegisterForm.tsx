import Image from "next/image";
import React, { useEffect, useState } from "react";
import Google from "/public/assets/google.svg";
import { Form, Formik } from "formik";
import Field from "../../Input/Field";
import Button from "@/components/Button/Button";
import Link from "next/link";
import {
  useLazyCheckSessionQuery,
  useLoginGoogleAuthMutation,
  useRegisterUserMutation,
} from "@/lib/features/auth/auth";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import CancelImage from "/public/assets/cancel.svg";
import { registerSchema } from "@/utils/validation";
import { setCookie, setTokenCookie } from "@/utils/storage";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import AdditionalInfo from "./AdditionalInfo";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "@/lib/reducers/auth";
import AuthError from "@/components/Error/AuthError";
import { useSetFcmTokenMutation } from "@/lib/features/notifications";
import { RootState } from "@/lib/store";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { successColor } from "@/utils/constants";

type Props = {};

const RegisterForm = (props: Props) => {
  const currLink = useSelector((state: RootState) => state.route.currentLink);
  const [gLoading, setGLoading] = useState<boolean>(false);
  const fcmtoken = useSelector((state: RootState) => state.fcm.fcm);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [completeGoogleLogin, gLoginRes] = useLoginGoogleAuthMutation();
  const [checkSession, result] = useLazyCheckSessionQuery();

  const [setFcm, fcmResult] = useSetFcmTokenMutation();
  const router = useRouter();
  const [registerUser, { isLoading, isSuccess, isError, data, error }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (gLoginRes.isError) {
      setGLoading(false);
      setErrorMessage(
        (gLoginRes.error as any)?.data?.message || "Something went wrong"
      );
    }
    if (gLoginRes.isSuccess) {
      setTokenCookie(gLoginRes.data.token);
      if (gLoginRes.data.message === "User Already Exist") {
        checkSession();
      } else {
        dispatch(setAuthState("LOGGED_IN"));
        setGLoading(false);
        open();
      }
      // setTokenCookie()
    }
  }, [gLoginRes.isError, gLoginRes.isSuccess]);
  useEffect(() => {
    if (result.isError) {
      setErrorMessage(
        (result.error as any)?.data?.message || "Something went wrong"
      );
      setGLoading(false);
    }
    if (result.isSuccess) {
      dispatch(setAuthState("LOGGED_IN"));
      setCookie("id", result.data?.user.id, {
        expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      });
      notifications.show({
        title: "Notification",
        message: "You've successfully logged in",
        color: successColor,
        autoClose: 2000,
      });
      // notify("Login Successful!", "success");

      setGLoading(false);
      if (currLink) {
        return router.push(currLink);
      }
      router.push("/");
    }
  }, [result.isError, result.isLoading]);
  useEffect(() => {
    if (isError) {
      setErrorMessage((error as any)?.data?.message || "Something went wrong");
    }
    if (isSuccess) {
      notifications.show({
        title: "Registration Successful!",
        message: "Please check your email to verify your account.",
        color: successColor,
        autoClose: 2000,
      });
      setTokenCookie(data.token);
      setCookie("id", data.userId);
      dispatch(setAuthState("LOGGED_IN"));
      if (data && fcmtoken) {
        setFcm({
          userId: data.userId,
          fcmtoken,
        });
      }
      open();
    }
  }, [isError, isSuccess]);
  const googleSignup = useGoogleLogin({
    onSuccess: async (res) => {
      setGLoading(true);
      await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
          },
        })
        .then((res) => {
          completeGoogleLogin({
            email: res.data.email,
            fname: res.data.given_name,
            lname: res.data.family_name,
          });
        })
        .catch((error) => {
          setGLoading(false);
          setErrorMessage(
            "Something went wrong, could not finish login process"
          );
        });
    },
  });

  return (
    <>
      <ModalComponent size="lg" opened={opened} onClose={close}>
        <AdditionalInfo />
      </ModalComponent>
      <div
        className="hidden des:block absolute cursor-pointer right-10 top-10"
        onClick={() => router.push("/")}
      >
        <Image src={CancelImage} alt="cancel-image" />
      </div>
      <div className="py-[2rem] w-full sm:w-[80%] md:w-[70%] max-w-[50rem]  mx-auto des:absolute left-[50%] top-[55%] des:-translate-x-[50%] des:-translate-y-[50%]">
        <div className="font-bold text-2xl text-black2">
          <h1>Ready to share an idea??</h1>
          <h1>Sign up to get started</h1>
        </div>
        <div className="flex items-center my-10 justify-between">
          <div
            onClick={() => googleSignup()}
            className="border border-gray9 flex items-center rounded-md cursor-pointer px-5 py-2"
          >
            <p className="mr-2 text-sm">Signup with Google</p>
            {gLoading ? (
              <div className="">
                <Spinner dark />
              </div>
            ) : (
              <Image src={Google} alt="google" className="w-[1.1rem]" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="border-b border-b-gray9 w-[48%]"></div>
          <p>or</p>
          <div className="border-b border-b-gray9 w-[48%]"></div>
        </div>

        {errorMessage ? (
          <div className="my-6">
            <AuthError
              message={errorMessage}
              closeMessage={() => setErrorMessage("")}
            />
          </div>
        ) : null}
        <div className="">
          <Formik
            initialValues={{
              email: "",
              password: "",
              fname: "",
              lname: "",
              confirm_password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              setErrorMessage("");
              registerUser({
                email: values.email,
                password: values.password,
                lname: values.lname,
                fname: values.fname,
              });
            }}
          >
            <Form className="transition-all">
              <div className="grid sm:grid-cols-2 mt-8 gap-8">
                <Field
                  classname=""
                  name="fname"
                  label="First Name"
                  placeholder=""
                  smallLabel
                />
                <Field
                  classname=""
                  name="lname"
                  label="Last Name"
                  placeholder=""
                  smallLabel
                />
              </div>
              <div className="w-full mt-8">
                <Field
                  classname=""
                  name="email"
                  label="Email Address"
                  placeholder=""
                  smallLabel
                />
              </div>
              <div className="w-full mt-8">
                <Field
                  classname=""
                  name="password"
                  label="Password"
                  smallLabel
                  placeholder=""
                  password
                />
              </div>
              <div className="w-full mt-8">
                <Field
                  classname=""
                  smallLabel
                  name="confirm_password"
                  label="Confirm password"
                  password
                  placeholder=""
                />
              </div>
              <Button
                classname="rounded-full justify-center flex items-center w-full mt-8 py-3 border border-primary bg-primary text-gray7"
                clicked={() => {}}
              >
                <div className="">
                  {isLoading ? (
                    <div className="py-1">
                      <Spinner />
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </div>
                {/* Log in */}
              </Button>
              <p className="text-xs text-gray1 text-center mt-5">
                Already have an account?{" "}
                <span className="text-primary">
                  <Link href={"/auth/login"}>Log in</Link>
                </span>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
