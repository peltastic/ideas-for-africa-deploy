import SelectComponent from "@/components/Select/Select";
import React, { useState } from "react";

type Props = {
  elements: any[];
  setVal: (el: any) => void;
  filterVal: string;
};
const InnovativeIdeasTab = (props: Props) => {
  const [value, setValue] = useState<string>("");
  return (
    <div
      className={
        "items-center bg-gray3 px-1  py-1 rounded-full hidden des:flex w-[180%]  "
      }
    >
      {props.elements.map((el, index) => (
        <div
          onClick={() => props.setVal(el)}
          key={el}
          className={` transition-all ${
            props.filterVal === el
              ? " text-black1 font-medium bg-white rounded-full"
              : "text-gray1"
          } cursor-pointer   font-medium  py-2 text-[0.9rem]
            px-2 xxs:px-4`}
        >
          <p>{el}</p>
        </div>
      ))}
      <div className="w-[10rem]">
        <SelectComponent
        value={value}
          variant="filled"
          options={[
            {
              label: "Health Care",
              value: "Health Care",
            },
            {
              label: "Arts and Entertainment",
              value: "Arts and Entertainment",
            },
            {
              label: "Environment",
              value: "Environment",
            },
          ]}
          changed={(val) => {
            props.setVal(val);
            setValue(val);
          }}
          placeholder="More"
          size="md"
        />
      </div>
    </div>
  );
};

export default InnovativeIdeasTab;
