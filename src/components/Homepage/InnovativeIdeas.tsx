"use client";
import React, { useEffect, useState } from "react";
import InnovativeIdeasFilters from "../Filters/InnovativeIdeasFilters";
import InnovativeIdeasCard from "../Cards/InnovativeIdeasCard";

import InnovativeIdeasSkeleton from "../Skeleton/InnovativeIdeasSkeleton";
import {
  useGetIdeasQuery,
  useLazyGetIdeaBycategoryQuery,
  useLazyGetIdeasQuery,
} from "@/lib/features/ideas";
import { IGetIdeasResponse } from "@/interface/idea";

type Props = {};

const InnovativeIdeas = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All ideas");
  const [ideasData, setIdeasData] = useState<IGetIdeasResponse[] | null>(null);
  const { data, isFetching } = useGetIdeasQuery();
  const [getIdeas, ideasRes] = useLazyGetIdeasQuery();
  const [filterIdeasbyCategory, result] = useLazyGetIdeaBycategoryQuery();
  const setSelectedFilterHandler = (el: string) => {
    setSelectedFilter(el);
    if (el === "All ideas") {
      getIdeas();
    } else {
      filterIdeasbyCategory(el);
    }
  };

  useEffect(() => {
    if (data) {
      setIdeasData(data.ideas);
    }
  }, [data]);

  useEffect(() => {
    if (ideasRes.data) {
      setIdeasData(ideasRes.data.ideas);
    }
  }, [ideasRes]);

  useEffect(() => {
    if (result.isError) {
      setIdeasData(null);
    }
    if (result.isSuccess) {
      setIdeasData(result.data.ideas);
    }
  }, [result.isError, result.isSuccess, result.data]);

  return (
    <section className=" mt-10 xxs:mt-28">
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
        {isFetching || result.isFetching ? (
          <>
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
          </>
        ) : (
          <>
            {ideasData &&
              ideasData.map((el, index) => (
                <InnovativeIdeasCard
                  data={{
                    category: el.category,
                    createdAt: el.createdAt,
                    headline: el.headline,
                    summary: el.summary,
                    banner:  el.thumb && el.thumb[0]?.path || el.banner,
                    fname: el.fname,
                    lname: el.lname,
                    pow: el.pow,
                    id: el._id,
                    userId: el.userId,
                    ppicture: el.profile?.ppicture,
                  }}
                  // image={el.banner || el.thumb && el.thumb[0].path}
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
