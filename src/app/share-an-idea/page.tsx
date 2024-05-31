import Footer from "@/components/Footer/Footer";
import ShareAnIdeaHeader from "@/components/Header/ShareAnIdeaHeader";
import ShareIdeas from "@/components/Homepage/ShareIdeas";
import Navbar from "@/components/Navbar/Navbar";
import Faces from "@/components/MeetTheTeam/Faces";
import React from "react";

type Props = {};

const ShareAnIdeaPage = (props: Props) => {
  return (
    <div className="">
      <Navbar homepage />
      <div className="bg-primary-bg mx-auto max-w-[1500px]">
        <ShareAnIdeaHeader />
        <Faces />
        <ShareIdeas />
      </div>
      <Footer />
    </div>
  );
};

export default ShareAnIdeaPage;
