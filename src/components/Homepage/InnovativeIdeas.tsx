"use client";
import React, { useState } from "react";
import InnovativeIdeasFilters from "../Filters/InnovativeIdeasFilters";
import InnovativeIdeasCard from "../Cards/InnovativeIdeasCard";

import InnovativeImg from "/public/assets/InnovativeImg1.png";
import Innovative2 from "/public/assets/Innovative2.png";
import Innovative3 from "/public/assets/innovative3.png";
import Innovative4 from "/public/assets/innovative4.png";
import Innovative5 from "/public/assets/innovative5.png";
import Innovative6 from "/public/assets/innovative6.png";
import Innovative7 from "/public/assets/innovative7.png";
import Innovative8 from "/public/assets/innovative8.png";

type Props = {};
const imgs = [
  InnovativeImg,
  Innovative2,
  Innovative3,
  Innovative4,
  Innovative5,
  Innovative6,
  Innovative7,
  Innovative8,
  Innovative5,
  Innovative6,
  Innovative7,
  Innovative8,
];
const InnovativeIdeas = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All ideas");
  const setSelectedFilterHandler = (el: string) => {
    setSelectedFilter(el);
  };
  return (
    <section className=" mt-28">
      <div className="">
        <h1 className="text-3xl xs:text-4xl font-bold mb-3 text-black1">
          Explore innovative ideas
        </h1>
        <h2 className="text-gray1">
          Bring visionary ideas to fruition through collection and shared
          inspiration
        </h2>
      </div>
      <div className="mr-12">
        <InnovativeIdeasFilters
          setFilterVal={setSelectedFilterHandler}
          filterVal={selectedFilter}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mm:grid-cols-3 des:grid-cols-4 gap-6 sm:mr-10">
        {imgs.map((el, index) => (
          <InnovativeIdeasCard image={el} key={index} />
        ))}
      </div>
      <div className="border border-gray2 py-4 rounded-2xl text-center sm:mr-10">
        <p className="text-xs font-medium text-[#56616B]">Show more</p>
      </div>
    </section>
  );
};

export default InnovativeIdeas;
