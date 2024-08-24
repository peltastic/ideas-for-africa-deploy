"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import InnovativeIdeasFilters from "../Filters/InnovativeIdeasFilters";
import { useLazyGetAllIdeasQuery } from "@/lib/features/ideas";
import { IGetIdeasResponse } from "@/interface/idea";
import InnovativeIdeasSkeleton from "../Skeleton/InnovativeIdeasSkeleton";
import InnovativeIdeasCard from "../Cards/InnovativeIdeasCard";
import { Pagination } from "@mantine/core";

type Props = {};

const AllIdeas = (props: Props) => {
  const [getAllIdeas, { data, isSuccess, isFetching, isError }] =
    useLazyGetAllIdeasQuery();
  const [dropDownValue, setDropDownValue] = useState<string>("");
  const [ideasData, setIdeasData] = useState<IGetIdeasResponse[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [selectedFilter, setSelectedFilter] =
    useState<string>("All Categories");

  useEffect(() => {
    getAllIdeas({
      category: "",
      type: "filter",
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setPage(data.currentPage);
      setIdeasData(data.ideas);
    }
  }, [isSuccess, data, isSuccess, isError]);

  const setSelectedFilterHandler = (el: string) => {
    setSelectedFilter(el);
    setDropDownValue("");
    if (el === "All Categories") {
      getAllIdeas({
        category: "",
        type: "filter",
      });
    } else {
      getAllIdeas({
        category: el,
        type: "filter",
      });
    }
  };

  const popularityFilterFuctions = (type: "views" | "likes", value: string) => {
    if (selectedFilter !== "All Categories") {
      getAllIdeas({
        category: selectedFilter,
        type: "filter",
        filterType: type,
      });
    } else {
      getAllIdeas({
        category: "",
        type: "filter",
        filterType: type,
      });
    }

    setDropDownValue(value);
  };

  return (
    <div className="px-8">
      <div className="mb-6 mt-5">
        <h1 className="text-3xl xs:text-4xl font-bold mb-3 text-black1">
          Explore innovative ideas
        </h1>
        <h2 className="text-gray1">
          Browse through a collection of ideas from some of the smartest minds
          around. Ideas are open and free to use
        </h2>
      </div>
      <div className="relative sm:w-[70%] mm:w-[40%] rounded-md border py-3 px-2">
        <div className="text-lg absolute top-1/2 -translate-y-1/2 left-2 text-gray4">
          <CiSearch />
        </div>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
            getAllIdeas({
              category: "",
              type: "search",
              search: e.target.value,
            });
          }}
          value={searchValue}
          type="text"
          placeholder={`Search Idea`}
          className="outline-none h-full w-[90%] ml-7 "
        />
      </div>
      {searchValue ? null : (
        <div className="">
          <InnovativeIdeasFilters
            dropdownVal={dropDownValue}
            dropdoownFunction={popularityFilterFuctions}
            setFilterVal={setSelectedFilterHandler}
            filterVal={selectedFilter}
          />
        </div>
      )}
      <div
        className={` ${
          searchValue ? "mt-10" : ""
        } grid grid-cols-2 mm:grid-cols-3 des:grid-cols-4 xs:gap-6 `}
      >
        {isFetching ? (
          <>
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
            <InnovativeIdeasSkeleton />
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
                    likes: el.likes || el.likeCount,
                    viewCount: el.viewCount,
                    wordpm: el.wordpm,
                    modified: el.modified,
                  }}
                  // image={el.banner || el.thumb && el.thumb[0].path}
                  key={index}
                />
              ))}
          </>
        )}
      </div>
      <div className="mt-8">
        {data ? (
          <Pagination
            total={data.totalPages}
            value={page}
            onChange={(val) => {
              setPage(val)
              getAllIdeas({
                category:
                  selectedFilter === "All Categories" ? "" : selectedFilter,
                page: val,
                type: searchValue ? "search" : "filter",
                search: "",
                filterType: dropDownValue,
              });
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AllIdeas;
