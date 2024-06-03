import Button from "@/components/Button/Button";
import Field from "@/components/Input/Field";
import SelectComponent from "@/components/Select/Select";
import Spinner from "@/components/Spinner/Spinner";
import { useUpdateProfileMutation } from "@/lib/features/auth/profile";
import { getCookie } from "@/utils/storage";
import { notify } from "@/utils/toast";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const AdditionalInfo = (props: Props) => {
  const router = useRouter();
  const [updateProfile, { isLoading, isSuccess, isError }] =
    useUpdateProfileMutation();
  const [nonInputValues, setNonInputValues] = useState({
    title: "",
    location: "",
  });
  useEffect(() => {
    if (isSuccess) {
      notify(
        "Profile Updated Successfully!",
        "success"
      );
      router.push("/auth/register/verify");
    }
  }, [isSuccess, isError]);
  return (
    <div className="sm:px-8">
      <h1 className="font-semibold text-lg">Additional Information</h1>
      <p className="text-sm text-black2">Quick information to collect</p>
      <Formik
        initialValues={{
          pow: "",
          postiton: "",
          url: "",
        }}
        onSubmit={(values) => {
          updateProfile({
            body: {
              pow: values.pow,
              title: nonInputValues.title,
              position: values.postiton,
              country: nonInputValues.location,
              url: values.url,
            },
            userId: getCookie("id"),
          });
        }}
      >
        <Form >
          <div className="mt-8">
            <SelectComponent
            value={nonInputValues.title}
              options={[
                { label: "Software Engineer", value: "Software Engineer" },
              ]}
              thinLabel
              label="Title"
              size="sm"
              placeholder="-Select-"
              changed={(val) =>
                setNonInputValues({
                  ...nonInputValues,
                  title: val,
                })
              }
            />
          </div>
          <div className="grid xs:grid-cols-2 my-8 gap-6">
            <Field
              labelClass="text-sm font-medium"
              classname="py-[0.47rem] px-3 text-sm"
              name="pow"
              label="Where do you work?"
              placeholder="e.g Pledre"
            />
            <Field
              labelClass="text-sm font-medium"
              classname="py-[0.47rem] px-3 text-sm"
              name="position"
              label="Postion held"
              placeholder="e.g CEO"
            />
          </div>
          <div className="mt-8">
            <SelectComponent
              options={[
                {
                  label: "United State of America",
                  value: "United State of America",
                },
              ]}
              thinLabel
              label="Location"
              size="sm"
              placeholder="-Select-"
              value={nonInputValues.location}
              changed={(val) =>
                setNonInputValues({
                  ...nonInputValues,
                  location: val,
                })
              }
            />
          </div>
          <div className="mt-8">
            <Field
              labelClass="text-sm font-medium"
              classname="py-[0.47rem] px-3 text-sm"
              name="url"
              label="Website URL"
              placeholder="e.g Pledre"
            />
          </div>
          {/* <div className="mt-8">
            <Field
              labelClass="text-sm font-medium"
              classname="py-[0.47rem] px-3 text-sm"
              name="pow"
              label="Social media url"
              placeholder="e.g Pledre"
            />
          </div> */}
          <div className="flex my-10 text-sm">
            <Button
              type="button"
              clicked={() => {
                router.push("/auth/register/verify");
              }}
              classname="ml-auto text-primary font-medium mr-8"
            >
              Skip
            </Button>
            <Button
              type="submit"
              classname="w-[7rem] bg-primary text-white py-2 px-4 rounded-full flex justify-center items-center"
              clicked={() => {}}
            >
              {<div className="">{isLoading ? <Spinner /> : "Submit"}</div>}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AdditionalInfo;
