import React, { useEffect } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Image from "next/image";
import * as StayUpdatedLottie from "@/data/stay-updated.json";
import LottiePlayer from "../Lottie/LottiePlayer";
// import { useSubscribeEmailNotificationMutation } from "@/lib/features/notifications";
import { Form, Formik } from "formik";
import { subscribeSchema } from "@/utils/validation";
import Field from "../Input/Field";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";
import { useSubscribeEmailNotificationMutation } from "@/lib/features/subscribe";

type Props = {};

const StayUpdated = (props: Props) => {
  const [subscribe, { data, isLoading, isSuccess, isError, error }] =
    useSubscribeEmailNotificationMutation();

  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong", "error");
    }
    if (isSuccess) {
      notify("Subscription successful!", "success");
    }
  }, [isSuccess, isError]);

  // const [email];
  return (
    <section className="mt-8 pt-20 py-10 mm:py-3 bg-lightBlue">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-[85%] sm:w-[70%] md:w-[40%]">
          <h1 className="text-black1 text-3xl font-bold">Stay updated</h1>
          <h2 className="text-gray1 mb-12 sm:mb-auto my-5">
            Want to stay in the loop when new ideas are shared? Just enter your
            email address, and you&apos;ll be the first to get notified.
          </h2>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(value) => {
              subscribe(value.email);
            }}
            validationSchema={subscribeSchema}
          >
            <Form>
              <div className="flex flex-wrap items-center mt-3">
                <Field
                  classname=""
                  name="email"
                  label="Email Address"
                  placeholder="example@gmail.com"
                  smallLabel
                />
                {/* <Input
                  changed={() => {}}
                  class="border-gray5 border px-4 py-3 rounded-full w-full sm:w-[60%] mb-3 sm:mb-0 placeholder:text-gray6 outline-none"
                  placeholder="example@gmail.com"
                /> */}
                <Button classname="flex w-[10rem] justify-center mt-6   bg-primary text-gray7 text-sm rounded-full border border-primary  py-[.8rem] px-4 ">
                  {isLoading ? (
                    <div className="py-1">
                      <Spinner />
                    </div>
                  ) : (
                    "Get Notified"
                  )}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className=" w-full md:w-[45%] mm:w-[40%]">
          <LottiePlayer lottie={StayUpdatedLottie} />
          {/* <Image src={StayUpdatedImg} alt="stay-updated" className="w-full" /> */}
        </div>
      </div>
    </section>
  );
};

export default StayUpdated;
