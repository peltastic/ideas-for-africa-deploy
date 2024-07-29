"use client";
import React, { useEffect, useState } from "react";
import InnovativeIdeasFilters from "../Filters/InnovativeIdeasFilters";
import InnovativeIdeasCard from "../Cards/InnovativeIdeasCard";

import InnovativeIdeasSkeleton from "../Skeleton/InnovativeIdeasSkeleton";
import {
  useGetIdeasQuery,
  useLazyGetIdeaBycategoryQuery,
  useLazyGetIdeasQuery,
  useLazyGetTopLikedIdeasQuery,
  useLazyGetTopViewedIdeasQuery,
} from "@/lib/features/ideas";
import { IGetIdeasResponse } from "@/interface/idea";
import { getCookie } from "@/utils/storage";

type Props = {};

const InnovativeIdeas = (props: Props) => {
  const [dropDownValue, setDropDownValue] = useState<string>("");
  const id = getCookie("id");
  const [selectedFilter, setSelectedFilter] =
    useState<string>("All Categories");
  const [ideasData, setIdeasData] = useState<IGetIdeasResponse[] | null>(null);
  // const { data, isFetching } = useGetIdeasQuery();
  const [getIdeas, ideasRes] = useLazyGetIdeasQuery();
  const [getTopLikedIdeas, topLiked] = useLazyGetTopLikedIdeasQuery();
  const [getTopViewedIdeas, topViewes] = useLazyGetTopViewedIdeasQuery();
  const [filterIdeasbyCategory, result] = useLazyGetIdeaBycategoryQuery();
  const setSelectedFilterHandler = (el: string) => {
    setSelectedFilter(el);
    if (el === "All Categories") {
      getIdeas();
      setDropDownValue("");
    } else {
      if (dropDownValue === "1") {
        getTopViewedIdeas({
          id,
          category: el,
          limit: "30",
        });
      } else if (dropDownValue === "2") {
        getTopLikedIdeas({
          id,
          category: el,
          limit: "30",
        });
      } else {
        filterIdeasbyCategory(el);
      }
    }
  };

  useEffect(() => {
    getIdeas();
  }, []);
  useEffect(() => {
    if (ideasRes.data && ideasRes.isSuccess) {
      setIdeasData(ideasRes.data.ideas);
    }
  }, [ideasRes.data, ideasRes.isSuccess, ideasRes.isFetching]);

  useEffect(() => {
    if (topViewes.data && topViewes.isSuccess) {
      setIdeasData(topViewes.data.ideas);
    }
  }, [topViewes.data, topViewes.isSuccess, topViewes.isFetching]);

  useEffect(() => {
    if (topLiked.data && topLiked.isSuccess) {
      setIdeasData(topLiked.data.ideas);
    }
  }, [topLiked.data, topLiked.isSuccess, topLiked.isFetching]);

  useEffect(() => {
    if (result.isError) {
      setIdeasData(null);
    }
    if (result.isSuccess && result.data) {
      setIdeasData(result.data.ideas);
    }
  }, [result.isError, result.isSuccess, result.data, result.isFetching]);

  const popularityFilterFuctions = (type: "views" | "likes", value: string) => {
    if (type === "views") {
      if (selectedFilter !== "All Categories") {
        getTopViewedIdeas({
          id,
          limit: "30",
          category: selectedFilter,
        });
      } else {
        getTopViewedIdeas(id);
      }
    } else {
      if (selectedFilter !== "All Categories") {
        getTopLikedIdeas({
          id,
          limit: "30",
          category: selectedFilter,
        });
      } else {
        getTopLikedIdeas(id);
      }
    }
    setDropDownValue(value);
  };

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
          dropdoownFunction={popularityFilterFuctions}
          setFilterVal={setSelectedFilterHandler}
          filterVal={selectedFilter}
          dropdownVal={dropDownValue}
        />
      </div>
      <div className="grid grid-cols-2 mm:grid-cols-3 des:grid-cols-4 xs:gap-6 sm:mr-10">
        {ideasRes.isFetching ||
        result.isFetching ||
        topLiked.isFetching ||
        topViewes.isFetching ? (
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
                    banner:
                      (el.thumb && el.thumb[0]?.path) ||
                      el.thumbPath ||
                      el.banner,
                    fname: el.fname,
                    lname: el.lname,
                    pow: el.pow || el.profile?.pow,
                    id: el._id,
                    userId: el.userId,
                    ppicture: el.ppicture || el.profile?.ppicture,
                    user: el.user,
                    likes: el.likes,
                    viewCount: el.viewCount,
                    wordpm: el.wordpm
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
