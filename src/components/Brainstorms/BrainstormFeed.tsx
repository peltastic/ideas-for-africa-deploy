"use client";
import React, { useEffect, useState } from "react";
import SelectComponent from "../Select/Select";
import { CiSearch } from "react-icons/ci";
import { useLazySearchBrainstormsQuery } from "@/lib/features/brainstorms";
import SearchedBrainstorms from "./SearchedBrainstorms";
import IdeaPageSkeleton from "../Skeleton/IdeaPageSkeleton";
import IdeasSkeleton from "../Skeleton/IdeasSkeleton";
import { getCookie } from "@/utils/storage";

type Props = {};

const BrainstormFeed = (props: Props) => {
  const id = getCookie("id")
  const options = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "idea",
      label: "Idea",
    },
  ];
  const [value, setValue] = useState<"admin" | "idea">("idea");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchIdea, { isFetching, data }] = useLazySearchBrainstormsQuery();
  useEffect(() => {
    searchIdea({
      searchValue,
      type: value,
      userId: id
    });
  }, []);
  return (
    <div className="px-4 sm:px-0 md:px-6 sm:mx-6 py-8 bg-primary-bg rounded-xl min-h-screen">
      <h1 className="text-[2rem] font-semibold">Brainstorms</h1>
      <div className="border  w-full sm:w-[70%] des:w-[40%] flex items-center mt-4 rounded-[0.48rem]">
        <div className="w-[6rem] sm:w-[8rem]">
          <SelectComponent
            variant="filled"
            value={value}
            changed={(value) => setValue(value)}
            size="sm"
            options={options}
            radius="md"
          />
        </div>
        <div className="relative w-[65%]">
          <div className="text-lg absolute top-1/2 -translate-y-1/2 left-1 text-gray4">
            <CiSearch />
          </div>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
              searchIdea({
                searchValue: e.target.value,
                type: value,
                userId: id
              });
            }}
            value={searchValue}
            type="text"
            placeholder={`Search by ${value}`}
            className="outline-none h-full w-full ml-7 "
          />
        </div>
      </div>
      <div className=" w-full md:w-[90%] lg:w-[60%] des:w-auto grid  des:grid-cols-2 my-12 md:gap-x-10 gap-y-8 ">
        {isFetching ? (
          <>
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
            <IdeasSkeleton />
          </>
        ) : (
          <>
            {data?.groups.map((el) => (
              <SearchedBrainstorms data={el} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BrainstormFeed;
