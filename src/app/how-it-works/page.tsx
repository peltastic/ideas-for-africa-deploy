"use client";
import Footer from "@/components/Footer/Footer";
import ShareAnIdeaHeader from "@/components/Header/ShareAnIdeaHeader";
import ShareIdeas from "@/components/Homepage/ShareIdeas";
import Faces from "@/components/MeetTheTeam/Faces";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import SetRoute from "@/components/HOC/setRoute";
import Image from "next/image";
import ShareAnIdeaImg from "/public/assets/ShareAnIdea.png";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import { GrSteps } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { BiCategoryAlt } from "react-icons/bi";
import { IoDocumentOutline } from "react-icons/io5";

type Props = {};

const MeetTheTeam = (props: Props) => {
  return (
    <div className="">
      <Navbar homepage />
      <div className="max-w-[1700px] mx-auto">
        <div className="px-8 py-6 mt-8 flex items-center w-full">
          <div className="w-[90%] mm:w-[70%] des:w-[55%] xxl:w-[65%]">
            <p className="text-gray1 text-base xxl:text-2xl mb-0 xxl:mb-5">HOW IT WORKS</p>
            <h1 className="text-4xl sm:text-5xl  xxl:text-[5rem] font-bold">How to Use IdeasAfrica.org</h1>
            <h2 className="text-xl xxl:text-3xl pt-2 xxl:pt-8 mb-8">
              Unleash the Power of Your Ideas
            </h2>
            <p className="text-base xxl:text-xl">
              IdeasAfrica.org is a platform designed to bridge the gap between
              ideators and executors, fostering innovation and progress in
              Africa. Here&apos;s how to use the site to share your ideas:
            </p>
          </div>
        </div>
        <Image src={ShareAnIdeaImg} className="w-full" alt="how-it-works" />
        <div className=" mt-8 xxl:mt-10 px-8">
          <h2 className="text-2xl xxl:text-4xl font-semibold ">1. Create Your Idea</h2>
          <div className="grid sm:grid-cols-2 mm:grid-cols-3 gap-10 lg:gap-20 w-full lg:w-[90%] xxl:w-full mx-auto mt-10">
            <div className="text-center">
              <div className=" h-12 w-16 rounded-full text-primary justify-center flex items-center text-4xl font-semibold mx-auto">
                H
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Headline
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Craft a catchy headline that accurately summarizes your idea
              </h2>
            </div>
            <div className="text-center">
              <div className="text-primary h-12 flex items-center">
                <IoNewspaperOutline className="mx-auto text-4xl" />
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Body
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Write a detailed article explaining the significance of your
                idea, how it works, and its potential impact.
              </h2>
            </div>
            <div className="text-center">
              <div className="text-primary h-12 flex items-center">
                <FaImage className="mx-auto text-4xl" />
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Image
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Upload a relevant image that visually represents your idea
              </h2>
            </div>
            <div className="text-center">
              <div className="text-primary h-12 flex items-center">
                <GrSteps className="mx-auto text-4xl" />
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Pitch
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Outline a step-by-step process for executing your idea.
              </h2>
            </div>
            <div className="text-center">
              <div className="text-primary h-12 flex items-center">
                <GrMoney className="mx-auto text-4xl" />
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Budget Range
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Specify your budget expectations, if applicable.
              </h2>
            </div>
            <div className="text-center">
              <div className="text-primary h-12 flex items-center">
                <BiCategoryAlt className="mx-auto text-4xl" />
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Category
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Select a category that best fits your idea to help others find
                it
              </h2>
            </div>
            <div className="text-center">
              <div className="text-primary h-12 flex items-center">
                <IoDocumentOutline className="mx-auto text-4xl" />
              </div>
              <h1 className="text-lg xxl:text-2xl mb-1 mt-4 font-semibold text-black3">
                Documents
              </h1>
              <h2 className=" text-black1 text-base xxl:text-lg">
                Upload any supporting documents, such as research papers or
                schematics.
              </h2>
            </div>
          </div>
          <div className="mt-20 xxl:mt-30">
            <h2 className="text-2xl xxl:text-3xl font-semibold ">2. Share Your Idea.</h2>
            <p className="text-base xxl:text-xl mt-0 xxl:mt-4">
              Once you&apos;ve completed your idea, click the &lsquo;Submit&rsquo; button. Your
              idea will then be published on the IdeasAfrica.org platform for
              everyone to see.
            </p>
          </div>
          <div className="mt-20 xxl:mt-30">
            <h2 className="text-2xl xxl:text-3xl font-semibold ">
              3. Collaborate and Iterate.
            </h2>
            <p className="text-base xxl:text-xl mt-0 xxl:mt-4">
              Remember, IdeasAfrica.org is a collaborative space. Feel free to
              modify your idea as needed, and encourage others to contribute
              their thoughts and suggestions.
            </p>
          </div>
          <div className="mt-20 xxl:mt-30">
            <h2 className="text-2xl xxl:text-3xl font-semibold ">
              4. Connect with Executors.
            </h2>
            <p className="text-base xxl:text-xl  mt-0 xxl:mt-4">
              As your idea gains traction, you may attract potential executors
              who are interested in bringing your vision to life.
            </p>
          </div>
          <div className="py-20">
            <p className="text-base xxl:text-xl">
              <span className="font-bold text-lg xxl:text-2xl">Important Note</span> <br /> By
              submitting your idea, you agree to the Terms & Conditions, which
              stipulate that your idea will be publicly accessible and may be
              modified by others.
            </p>
          </div>
        </div>
        {/* <div className="bg-primary-bg mx-auto max-w-[1500px]">
        <ShareAnIdeaHeader />
        <Faces />
        <ShareIdeas />
      </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default SetRoute(MeetTheTeam);
