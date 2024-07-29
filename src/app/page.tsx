"use client";
import Footer from "@/components/Footer/Footer";
import SetRoute from "@/components/HOC/setRoute";
import HomepageHeader from "@/components/Header/HomepageHeader";
import CauroselSection from "@/components/Homepage/CauroselSection";
import InnovativeIdeas from "@/components/Homepage/InnovativeIdeas";
import StayUpdated from "@/components/Homepage/StayUpdated";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect } from "react";

function Home() {
  return (
    <div className="">
      <Navbar homepage />
      <div className="mx-auto bg-primary-bg max-w-[1500px]">
        <HomepageHeader />
        <div className="ml-4 mr-4   sm:ml-10 mt-[10rem]">
          {/* <CauroselSection /> */}
          <InnovativeIdeas />
        </div>
        <StayUpdated />
        {/* <ShareIdeas /> */}
      </div>
      <Footer />
    </div>
  );
}

export default SetRoute(Home);
