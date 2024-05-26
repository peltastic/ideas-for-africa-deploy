import { Form, Formik } from "formik";
import React from "react";
import SelectComponent from "../Select/Select";
import Field from "../Input/Field";
import NoProfilePic from "/public/assets/no-profile.jpg";
import Image from "next/image";
import Photo from "/public/assets/photo.svg";
import Delete from "/public/assets/delete.svg"

type Props = {};

const ProfileForm = (props: Props) => {
  return (
    <div>
      <h1 className="text-xl font-semibold">Personal Information</h1>
      <p className="text-gray1 text-sm">
        Update the contact name, email address & password
      </p>
      <div className="w-[70%] mt-6">
        <Formik
          initialValues={{
            first_name: "",
          }}
          onSubmit={() => {}}
        >
          <Form>
            <div className="w-full mt-4">
              <SelectComponent
                label="Title"
                size="lg"
                placeholder="Select an option"
              />
            </div>
            <div className="grid grid-cols-2 gap-10 mt-8">
              <Field
                classname=""
                name="first"
                label="First name"
                placeholder=""
              />
              <Field
                classname=""
                name="first"
                label="Last name"
                placeholder=""
              />
            </div>
            <div className="grid grid-cols-2 gap-10 mt-8">
              <Field
                classname=""
                name="first"
                label="First name"
                placeholder=""
              />
              <Field
                classname=""
                name="first"
                label="Last name"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <Field classname="" name="first" label="Email" placeholder="" />
            </div>
            <div className="grid grid-cols-2 gap-10 mt-8">
              <Field
                classname=""
                name="first"
                label="Where do you work"
                placeholder=""
              />
              <Field
                classname=""
                name="first"
                label="Position held"
                placeholder=""
              />
            </div>

            <div className="mt-8">
              <Field
                classname=""
                name="first"
                label="Location"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <Field
                classname=""
                name="first"
                label="Website URL"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <Field
                classname=""
                name="first"
                label="Twitter URL"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <p className="font-semibold">Image</p>
              <div className="flex items-center mt-4 gap-10">
                <div className="w-[6rem]">
                  <Image src={NoProfilePic} alt="no-profile-image" />
                </div>
                <div className="gap-3 flex border rounded-full px-7 py-3">
                  <Image src={Photo} alt="photo" />
                  <p>Change image</p>
                </div>
                <div className="gap-3 flex border rounded-full px-7 py-3">
                  <Image src={Delete} alt="delete-photo" />
                  <p>Delete image</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Field
                classname=""
                name="first"
                label="Old password"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <Field
                classname=""
                name="first"
                label="New password"
                placeholder=""
              />
            </div>
            <div className="mt-8">
              <Field
                classname=""
                name="first"
                label="Confirm new password"
                placeholder=""
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
