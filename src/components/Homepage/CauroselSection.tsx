"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import CarouselCard from "../Cards/CarouselCard";
import Carouselmg from "/public/assets/carouselmg.png";
import CarouselImg2 from "/public/assets/carouselImg2.png";
import CarouselImg3 from "/public/assets/carouselImg3.png";
import CarouselImg4 from "/public/assets/cauroselmg4.png";

type Props = {};

const list = [Carouselmg, CarouselImg2, CarouselImg3, Carouselmg];
const CauroselSection = (props: Props) => {
  return (
    <Carousel
      withIndicators
      height={500}
      slideSize={{ base: "100%", sm: "50%", md: "27.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      // loop
      align="start"
    >
      {list.map((el, index) => (
        <Carousel.Slide key={index}>
          <CarouselCard image={el} />
        </Carousel.Slide>
      ))}

      {/* <CarouselSlide>2</CarouselSlide>
        <CarouselSlide>3</CarouselSlide>
        <CarouselSlide>4</CarouselSlide> */}
      {/* <Carousel.Slide>1</Carousel.Slide> */}

      {/* <div className=""></div>
        <div className=""></div> */}
      {/* <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide> */}
    </Carousel>
  );
};

export default CauroselSection;
