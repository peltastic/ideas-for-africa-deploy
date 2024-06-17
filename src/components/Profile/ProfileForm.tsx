import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import SelectComponent from "../Select/Select";
import Field from "../Input/Field";
import { getCookie } from "@/utils/storage";
import {
  useUpdateProfileMutation,
} from "@/lib/features/profile";
import ThreeDotLoader from "../Loader/ThreeDotLoader";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import { notify } from "@/utils/toast";

type Props = {
  data: IGetUserProfileResponse | null;
};

const ProfileForm = ({ data }: Props) => {
  const id = getCookie("id");
  const [updateProfile, result] = useUpdateProfileMutation();
  const [nonInputValues, setNonInputValues] = useState({
    title: data?.profile?.title,
    location: data?.profile?.country,
  });

  useEffect(() => {
    if (result.isSuccess) {
      notify("Profile updated successfully", "success");
    }
  }, [result.isError, result.isSuccess]);

  useEffect(() => {
    if (data) {
      setNonInputValues({
        title: data?.profile?.title || "",
        location: data?.profile?.country || "",
      });
    }
  }, [data]);

  return (
    <div>
      <h1 className="text-xl font-semibold">Personal Information</h1>
      <p className="text-gray1 text-sm">
        Update the contact name, email address & password
      </p>
      <div className="w-full lg:w-[70%] mt-6">
        <Formik
          initialValues={{
            pow: data?.profile?.pow || "",
            position: data?.profile?.position || "",
            url: data?.profile?.url || "",
            email: data?.email || "",
            lname: data?.lname || "",
            fname: data?.fname || "",
          }}
          onSubmit={(values) => {
            updateProfile({
              body: {
                pow: values.pow,
                position: values.position,
                url: values.url,
                country: nonInputValues.location,
                title: nonInputValues.title,
              },
              userId: id,
            });
          }}
        >
          <Form>
            <div className="w-full mt-4">
              <SelectComponent
                value={nonInputValues.title}
                changed={(val) =>
                  setNonInputValues({
                    ...nonInputValues,
                    title: val,
                  })
                }
                options={[
                  { label: "Software Engineer", value: "Software Engineer" },
                ]}
                label="Title"
                size="lg"
                placeholder={"Select an option"}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-10 mt-10 sm:mt-8">
              <Field
                classname=""
                name="fname"
                label="First name"
                placeholder=""
                value={data?.fname || ""}
                disabled
              />
              <Field
                classname=""
                name="lname"
                label="Last name"
                disabled
                placeholder=""
                value={data?.lname || ""}
              />
            </div>
            <div className="mt-8">
              <Field
                disabled
                classname=""
                name="email"
                label="Email"
                placeholder=""
                value={data?.email || ""}
              />
            </div>
            <div className="grid  sm:grid-cols-2 gap-10 mt-10 sm:mt-8">
              <Field
                classname=""
                name="pow"
                label="Where do you work"
                placeholder=""
              />
              <Field
                classname=""
                name="position"
                label="Position held"
                placeholder=""
              />
            </div>

            <div className="mt-10 sm:mt-8">
              <SelectComponent
                value={nonInputValues.location}
                changed={(val) =>
                  setNonInputValues({
                    ...nonInputValues,
                    location: val,
                  })
                }
                options={[
                  {
                    label: "United State of America",
                    value: "United State of America",
                  },
                ]}
                label="Location"
                size="lg"
                placeholder={"Select an option"}
              />
            </div>
            <div className="mt-10 sm:mt-8">
              <Field
                classname=""
                name="url"
                label="Website URL"
                placeholder=""
              />
            </div>
            {/* <div className="mt-10 sm:mt-8">
              <Field
                classname=""
                name="first"
                label="Twitter URL"
                placeholder=""
              />
            </div> */}
          
            <div className="flex justify-between my-10">
              <Button
                type="button"
                classname="bg-gray3 text-black1 rounded-full px-8 py-2"
              >
                Discard
              </Button>
              <Button
                type="submit"
                classname="bg-primary flex justify-center items-center text-white rounded-full px-8 py-2"
              >
                {result.isLoading ? <Spinner /> : " Save"}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
