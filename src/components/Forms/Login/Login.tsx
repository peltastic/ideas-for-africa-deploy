import Image from "next/image";
import React, { useEffect, useState } from "react";
import Google from "/public/assets/google.svg";
import Facebook from "/public/assets/facebook-icon.svg";
import X from "/public/assets/x.svg";
import LinkedIn from "/public/assets/linkedin.svg";
import Microsoft from "/public/assets/microsoft.svg";
import { Form, Formik } from "formik";
import Field from "../../Input/Field";
import Button from "@/components/Button/Button";
import Link from "next/link";
import CancelImage from "/public/assets/cancel.svg";
import { useRouter } from "next/navigation";
import {
  useLazyCheckSessionQuery,
  useLoginUserMutation,
} from "@/lib/features/auth/auth";
import Spinner from "@/components/Spinner/Spinner";
import { notify } from "@/utils/toast";
import { setCookie, setTokenCookie } from "@/utils/storage";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/lib/reducers/auth";
import { loginSchema } from "@/utils/validation";
import AuthError from "@/components/Error/AuthError";

type Props = {};

const LoginForm = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const [loginUser, { isLoading, isError, isSuccess, data, error }] =
    useLoginUserMutation();
  const [checkSession, result] = useLazyCheckSessionQuery();
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      setErrorMessage((error as any)?.data?.message|| "Something went wrong")
      setLoading(false)
    }
    if (isSuccess) {
      setTokenCookie(data?.token);
      checkSession();
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      setErrorMessage((error as any)?.data?.message|| "Something went wrong")
      setLoading(false)
    }
    if (isSuccess) {
      notify("Login Successful!", "success");
      dispatch(setAuthState("LOGGED_IN"));
      setCookie("id", result.data?.user.id as string);
      setLoading(false);
      router.push("/share-idea");
    }
  }, [result.isSuccess, result.isError]);
  return (
    <>
      <div
        className=" hidden des:block absolute cursor-pointer right-2 sm:right-10 top-10"
        onClick={() => router.push("/")}
      >
        <Image src={CancelImage} alt="cancel-image" />
      </div>
      <div className="py-[2rem] lg:py-[6rem] w-full mm:w-[60%] mx-auto des:absolute left-[50%] top-[50%] des:-translate-x-[50%] des:-translate-y-[50%]">
        <div className="font-bold text-2xl text-black2">
          <h1>Ready to share an idea??</h1>
          <h1>Log in to get started</h1>
        </div>
        <div className="flex items-center my-10 justify-between">
          <div className="border border-gray9 rounded-full cursor-pointer px-5 py-2">
            <Image src={Google} alt="google" className="w-[1.1rem]" />
          </div>
          <div className="border border-gray9 rounded-full cursor-pointer px-5 py-2">
            <Image src={Facebook} alt="facebook" className="w-[1.1rem]" />
          </div>
          <div className="border border-gray9 rounded-full cursor-pointer px-5 py-2">
            <Image src={X} alt="x" className="w-[1rem]" />
          </div>
          <div className="border border-gray9 rounded-full cursor-pointer px-5 py-2">
            <Image src={LinkedIn} alt="google" className="w-[1.1rem]" />
          </div>
          <div className="border border-gray9 rounded-full cursor-pointer px-5 py-2">
            <Image src={Microsoft} alt="google" className="w-[1.1rem]" />
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
            }}
            onSubmit={(values) => {
              setLoading(true);
              loginUser(values);
            }}
            validationSchema={loginSchema}
          >
            <Form>
              <div className="w-full mt-4">
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
                  smallLabel
                  classname=""
                  name="password"
                  label="Password"
                  placeholder=""
                  password
                />
              </div>
              <p className="text-xs text-gray1 mt-2">Forgot Password?</p>
              <Button classname="rounded-full w-full mt-8 py-3 border border-primary bg-primary text-gray7">
                {loading ? (
                  <div className="flex justify-center py-1">
                    <Spinner />
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
              <p className="text-xs text-gray1 text-center mt-5">
                Don&apos;t have an account? &nbsp;
                <span className="text-primary">
                  <Link href={"/auth/register"}>Sign up</Link>
                </span>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
