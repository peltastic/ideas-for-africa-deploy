"use client";
import Footer from "@/components/Footer/Footer";
import SetRoute from "@/components/HOC/setRoute";
import HomepageHeader from "@/components/Header/HomepageHeader";
import InnovativeIdeas from "@/components/Homepage/InnovativeIdeas";
import StayUpdated from "@/components/Homepage/StayUpdated";
import Navbar from "@/components/Navbar/Navbar";

function Home() {
  return (
    <div className="">
      <Navbar homepage />
      <div className="bg-primary-bg">
        <div className="mx-auto  max-w-[1500px]">
          <HomepageHeader />
          <div className="ml-4 mr-4   sm:ml-10 mt-[6rem] sm:mt-[10rem]">
            <InnovativeIdeas />
          </div>
          <StayUpdated />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SetRoute(Home);
