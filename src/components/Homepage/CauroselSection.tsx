"use client";
import { Carousel } from "@mantine/carousel";
import React, { useEffect } from "react";
import CarouselCard from "../Cards/CarouselCard";
import TopLikedImage from "/public/assets/top-liked.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import classes from "@/app/styles/carousel.module.css";
import { getCookie } from "@/utils/storage";
import {
  useGetTopLikedIdeasQuery,
  useLazyGetTopLikedIdeasQuery,
} from "@/lib/features/ideas";
import InnovativeIdeasSkeleton from "../Skeleton/InnovativeIdeasSkeleton";
import Image from "next/image";
import { AspectRatio } from "@mantine/core";
import { FaArrowRightLong } from "react-icons/fa6";

type Props = {};

const CauroselSection = (props: Props) => {
  const id = getCookie("id");
  const [getTopLiked, { data, isFetching }] = useLazyGetTopLikedIdeasQuery();
  useEffect(() => {
    getTopLiked({});
  }, []);
  // const { data, isFetching } = useGetTopLikedIdeasQuery({} ?? null, {
  //   refetchOnMountOrArgChange: true,
  // });
  return (
    <>
      {isFetching && !data ? (
        <Carousel
          withIndicators
          height={500}
          slideSize={{
            base: "100%",
            sm: "40%",
            md: "27.333333%",
            xl: "27.333%",
            lg: "27.333%",
            xs: "60%",
          }}
          slideGap={{ base: "sm", sm: "md" }}
          classNames={{
            controls: classes.controls,
            indicator: classes.indicator,
            control: classes.control,
          }}
          align="start"
          nextControlIcon={
            <IoIosArrowForward className="text-white top-[50rem] bg-primary p-1 rounded-full text-4xl " />
          }
          previousControlIcon={
            <IoIosArrowBack className="text-white bg-primary p-1 rounded-full text-4xl" />
          }
        >
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
          <Carousel.Slide>
            <InnovativeIdeasSkeleton />
          </Carousel.Slide>
        </Carousel>
      ) : (
        <Carousel
          // loop
          withIndicators
          height={500}
          slideSize={{
            base: "100%",
            sm: "60%",
            md: "40%",
            xl: "27.333%",
            lg: "27.333%",
            xs: "80%",
          }}
          slideGap={{ base: "sm", sm: "md" }}
          classNames={{
            controls: classes.controls,
            indicator: classes.indicator,
            control: classes.control,
          }}
          align="start"
          nextControlIcon={
            <IoIosArrowForward className="text-white top-[50rem] bg-primary p-1 rounded-full text-4xl " />
          }
          previousControlIcon={
            <IoIosArrowBack className="text-white bg-primary p-1 rounded-full text-4xl" />
          }
        >
          <>
            <Carousel.Slide>
              <div className="h-[85%] rounded-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 bg-[#050505c2] w-full h-full"></div>
                <div className="hover:scale-110 transition-all cursor-pointer duration-1000  text-white w-[80%] absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-1/2 ">
                  <h1 className="text-3xl xs:text-4xl font-semibold text-center ">
                    Top Liked Ideas
                  </h1>
                  <FaArrowRightLong className="text-4xl mt-4 mx-auto" />
                </div>
                <div className="hidden rb:block">
                  <AspectRatio ratio={900 / 1120}>
                    <Image
                      src={TopLikedImage}
                      alt="top-liked-img"
                      className="h-full"
                    />
                  </AspectRatio>
                </div>
                <div className="block rb:hidden">
                  <AspectRatio ratio={800 / 1120}>
                    <Image
                      src={TopLikedImage}
                      alt="top-liked-img"
                      className="h-full"
                    />
                  </AspectRatio>
                </div>
              </div>
            </Carousel.Slide>
            {data &&
              data?.ideas.map((el, index) => (
                <Carousel.Slide key={el._id}>
                  <CarouselCard
                    banner={el.thumbPath as string}
                    headline={el.headline}
                    lname={el.lname as string}
                    pow={el.pow as string}
                    ppicture={el.ppicture as string}
                    summaary={el.summary}
                    userId={el.userId}
                    id={el._id}
                  />
                </Carousel.Slide>
              ))}
          </>
          {/* <CarouselSlide>2</CarouselSlide>
        <CarouselSlide>3</CarouselSlide>
      <CarouselSlide>4</CarouselSlide> */}
          {/* <Carousel.Slide>1</Carousel.Slide> */}
          {/* <div className=""></div>
        <div className=""></div> */}
          {/* <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide> */}
        </Carousel>
      )}
    </>
  );
};

export default CauroselSection;
