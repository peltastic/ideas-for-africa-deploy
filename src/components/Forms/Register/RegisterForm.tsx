import Image from "next/image";
import React, { useEffect } from "react";
import Google from "/public/assets/google.svg";
import Facebook from "/public/assets/facebook-icon.svg";
import X from "/public/assets/x.svg";
import LinkedIn from "/public/assets/linkedin.svg";
import Microsoft from "/public/assets/microsoft.svg";
import { Form, Formik } from "formik";
import Field from "../../Input/Field";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useRegisterUserMutation } from "@/lib/features/auth/auth";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import CancelImage from "/public/assets/cancel.svg";

type Props = {};

const RegisterForm = (props: Props) => {
  const router = useRouter();
  const [registerUser, { isLoading, isSuccess, isError, data }] =
    useRegisterUserMutation();
  useEffect(() => {
    if (isSuccess) {
      notify(data?.message, "success");
      router.push("/auth/login");
    }
  }, [isError, isSuccess]);
  return (
    <>
      <div
        className="hidden des:block absolute cursor-pointer right-10 top-10"
        onClick={() => router.push("/")}
        >
        <Image src={CancelImage} alt="cancel-image" />
        </div>
      <div className="py-[2rem] w-full sm:w-[80%] md:w-[60%] mx-auto des:absolute left-[50%] top-[50%] des:-translate-x-[50%] des:-translate-y-[50%]">
        <div className="font-bold text-2xl text-black2">
          <h1>Ready to share an idea??</h1>
          <h1>Sign up to get started</h1>
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
        <div className="">
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirm_password: "",
            }}
            onSubmit={(values) => {
              registerUser({
                email: values.email,
                password: values.password,
              });
            }}
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
                  classname=""
                  name="password"
                  label="Password"
                  smallLabel
                  placeholder=""
                  />
              </div>
              <div className="w-full mt-8">
                <Field
                  classname=""
                  smallLabel
                  name="confirm_password"
                  label="Confirm password"
                  placeholder=""
                />
              </div>
              <Button
                classname="rounded-full justify-center flex items-center w-full mt-8 py-3 border border-primary bg-primary text-gray7"
                clicked={() => {}}
              >
                <div className="">{isLoading ? <Spinner /> : "Sign up"}</div>
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
