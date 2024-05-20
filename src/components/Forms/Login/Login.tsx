import Image from "next/image";
import React from "react";
import Google from "/public/assets/google.svg";
import Facebook from "/public/assets/facebook-icon.svg";
import X from "/public/assets/x.svg";
import LinkedIn from "/public/assets/linkedin.svg";
import Microsoft from "/public/assets/microsoft.svg";
import { Form, Formik } from "formik";
import Field from "../../Input/Field";
import Button from "@/components/Button/Button";
import Link from "next/link";
type Props = {};

const LoginForm = (props: Props) => {
  return (
    <div className="py-[6rem] w-[60%] mx-auto">
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
      <div className="">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={() => {}}
        >
          <Form>
            <div className="w-full mt-4">
              <Field
                classname=""
                name="email"
                label="Email Address"
                placeholder=""
              />
            </div>
            <div className="w-full mt-8">
              <Field
                classname=""
                name="password"
                label="Password"
                placeholder=""
              />
            </div>
            <p className="text-xs text-gray1 mt-2">Forgot Password?</p>
            <Button
              classname="rounded-full w-full mt-8 py-3 border border-primary bg-primary text-gray7"
              clicked={() => {}}
            >
              Log in
            </Button>
            <p className="text-xs text-gray1 text-center mt-5">
              Don't have an account?{" "}
              <span className="text-primary">
                <Link href={"/auth/register"}>Sign up</Link>
              </span>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
