"use client";
import React, { useState } from "react";
import SelectComponent from "../Select/Select";
import Tabs from "@/Tabs/Tabs";
import { idea_categories_list, share_idea_categories_list } from "@/utils/constants";
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
    <div className="my-10 gap-[0.3rem] sm:gap-6 des:gap-0 flex items-center">
      <div className="des:mr-auto block w-[50%] sm:w-auto">
        <SelectComponent
          value={props.dropdownVal}
          size="md"
          placeholder="Filter"
          options={options}
          changed={(val) => {
            props.dropdoownFunction(val === "1" ? "views" : "likes", val);
          }}
        />
      </div>
      <div className=" mr-auto block des:hidden w-[50%] sm:w-auto">
        <SelectComponent
          value={props.filterVal}
          size="md"
          placeholder="Categories"
          options={share_idea_categories_list}
          changed={(val) => {
            props.setFilterVal(val);
          }}
        />
      </div>
      <div className="items-center bg-gray3 px-1 overflow-x-scroll no-scrollbar  py-1 rounded-full hidden des:flex ">
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
