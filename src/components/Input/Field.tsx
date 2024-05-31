import { FieldHookConfig, useField } from "formik";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";

type Props = {};
interface OtherProps {
  label: string;
  classname: string;
  placeholder: string;
  password?: boolean;
  changed?: any;
  borderError?: boolean;
  smallLabel?: boolean;
  labelClass?: string
}

const Field = (props: FieldHookConfig<string> & OtherProps) => {
  const [field, meta, helpers] = useField(props);
  const [typePassword, setTypePassword] = useState<boolean>(true);

  return (
    <div className="w-full">
      <label className="">
        <p
          className={`${props.labelClass || "font-semibold"} ${props.smallLabel ? "text-sm" : ""}  mb-3`}
        >
          {props.label}
        </p>

        <div className="relative ">
          <input
            autoComplete="off"
            {...field}
            onChange={(e) => {
              if (props.changed) {
                props.changed(e);
              }
              field.onChange(e);
            }}
            placeholder={props.placeholder}
            type={typePassword && props.password ? "password" : props.type}
            className={` rounded-full w-full  placeholder:text-gray6 outline-none
             ${props.classname || "px-4 py-3"} ${meta.error && meta.touched  ? "border border-errorRed" : "border border-gray8"}`}
          />
          {props.password ? (
            <div
              onClick={() => setTypePassword(!typePassword)}
              className="text-2xl cursor-pointer text-[#828080] absolute right-4 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {typePassword ? <IoEyeOff /> : <IoMdEye />}
            </div>
          ) : null}
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="text-[#eb4040] mt-2 text-xs font-medium ">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default Field;
