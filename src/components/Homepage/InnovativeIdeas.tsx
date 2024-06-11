"use client";
import React, { useState } from "react";
import InnovativeIdeasFilters from "../Filters/InnovativeIdeasFilters";
import InnovativeIdeasCard from "../Cards/InnovativeIdeasCard";

import InnovativeIdeasSkeleton from "../Skeleton/InnovativeIdeasSkeleton";
import { useGetIdeasQuery } from "@/lib/features/auth/ideas";

type Props = {};

const InnovativeIdeas = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All ideas");
  const { data, isFetching } = useGetIdeasQuery();
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
        {isFetching ? (
          <>
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
          </>
        ) : (
          <>
            {data &&
              data.ideas.map((el, index) => (
                <InnovativeIdeasCard
                  data={{
                    category: el.category,
                    createdAt: el.createdAt,
                    headline: el.headline,
                    summary: el.summary,
                    banner: el.banner,
                    fname: el.fname,
                    lname: el.lname,
                    pow: el.pow,
                    id: el._id
                  }}
                  image={el.banner}
                  key={index}
                />
              ))}
          </>
        )}
      </div>
      <div className="border border-gray2 py-4 rounded-2xl text-center sm:mr-10">
        <p className="text-xs font-medium text-[#56616B]">Show more</p>
      </div>
    </section>
  );
};

export default InnovativeIdeas;
