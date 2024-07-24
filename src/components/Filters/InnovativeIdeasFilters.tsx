"use client";
import React, { useState } from "react";
import SelectComponent from "../Select/Select";
import Tabs from "@/Tabs/Tabs";
import { idea_categories_list } from "@/utils/constants";
import InnovativeIdeasTab from "@/Tabs/InnovativeIdeasTab";

type Props = {
  filterVal: string;
  setFilterVal: (el: string) => void;
  dropdoownFunction: (type: "views" | "likes", value: string) => void;
  dropdownVal: string;
};

const InnovativeIdeasFilters = (props: Props) => {
  const options = [
    {
      value: "1",
      label: "Most Viewed",
    },
    {
      value: "2",
      label: "Most Liked",
    },
  ];
  const filterEl = [
    "All Categories",
    ...idea_categories_list.map((el) => el.value),
  ];
  return (
    <div className="my-10 flex items-center">
      <div className=" mr-auto hidden des:block">
        <SelectComponent
          value={props.dropdownVal}
          size="md"
          placeholder="Most viewed"
          options={options}
          changed={(val) => {
            props.dropdoownFunction(val === "1" ? "views" : "likes", val);
          }}
        />
      </div>
      <div className="items-center bg-gray3 px-1  py-1 rounded-full hidden lg:flex  ">
        {/* {filterEl.map((el) => (
          <div onClick={() => props.setFilterVal(el)}  key={el} className={`transition-all ${props.filterVal === el ? " text-black1 bg-white rounded-full" : "text-gray1"} cursor-pointer text-sm  font-medium py-3 px-4`}>
            <p>{el}</p>
          </div>
        ))} */}
        {/* <FloatingTabs /> */}
        <InnovativeIdeasTab
          elements={filterEl}
          filterVal={props.filterVal}
          setVal={(el) => props.setFilterVal(el)}
        />
      </div>
    </div>
  );
};

export default InnovativeIdeasFilters;
