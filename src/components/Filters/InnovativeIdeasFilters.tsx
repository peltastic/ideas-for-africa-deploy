"use client";
import React from "react";
import SelectComponent from "../Select/Select";

type Props = {
  filterVal: string;
  setFilterVal: (el: string) => void;
};

const InnovativeIdeasFilters = (props: Props) => {
  const options = [
    {
      value: "1",
      label: "Most Viewed",
    },
  ];
  const filterEl = [
    "All ideas",
    "Business",
    "Technology",
    "Manufucturing",
    "Analytics",
    "Academia",
    "Healthcare",
    "Sustainability",
  ];

  return (
    <div className="my-10 flex items-center">
      <div className=" mr-auto">
        <SelectComponent placeholder="Most viewed" options={options} />
      </div>
      <div className="flex items-center bg-gray3 px-1  py-1 rounded-full ">
        {filterEl.map((el) => (
          <div onClick={() => props.setFilterVal(el)}  key={el} className={`${props.filterVal === el ? " text-black1 bg-white rounded-full" : "text-gray1"} cursor-pointer text-sm  font-medium py-3 px-4`}>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InnovativeIdeasFilters;
