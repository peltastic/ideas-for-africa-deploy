"use client";
import Button from "@/components/Button/Button";
import Navbar from "@/components/Navbar/Navbar";
import AdditionalInformation from "@/components/ShareIdea/AdditionalInformation";
import BasicInformation from "@/components/ShareIdea/BasicInformation";
import { ICreateIdeaPayload } from "@/interface/idea";
import React, { useState } from "react";

type Props = {};

const ShareIdea = (props: Props) => {
  const [step, setStep] = useState<"basic" | "additional">("basic");
  const [ideaPayload, setIdeaPayload] = useState<ICreateIdeaPayload>({
    headline: "",
    summary: "",
    category: "",
    body: "",
    pitch: "",
    minbud: "",
    maxbud: "",
    banner: null,
    files: null,
  });
  const setIdeaPayloadHandler = (key: string, value: string | File | null) => {
    setIdeaPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="">
      <Navbar />
      <div className="max-w-[1700px] mx-auto">
        <div className="flex gap-3  px-[2.4rem] des:px-[10rem] mt-[3rem]">
          <div className=" hidden lg:block w-[30%]">
            <div className="flex mb-6">
              <div
                onClick={() => setStep("basic")}
                className={`mr-4 text-sm transition-all cursor-pointer ${
                  step === "basic"
                    ? "bg-primary text-white"
                    : "bg-gray2 text-gray1"
                }  rounded-full h-[1.7rem] w-[1.7rem] flex justify-center items-center`}
              >
                <p>1</p>
              </div>
              <p>Basic Information</p>
            </div>
            <div className="flex">
              <div
                onClick={() => setStep("additional")}
                className={`mr-4 text-sm transition-all cursor-pointer ${
                  step === "additional"
                    ? "bg-primary text-white"
                    : "bg-gray2 text-gray1"
                }  rounded-full h-[1.7rem] w-[1.7rem] flex justify-center items-center`}
              >
                <p>2</p>
              </div>
              <p>Addition Information</p>
            </div>
          </div>
          <div className="w-full sm:w-[95%] mm:w-[80%] lg:w-[65%] mx-auto ">
            {step === "basic" ? (
              <BasicInformation
                idea={ideaPayload}
                setIdea={setIdeaPayloadHandler}
              />
            ) : (
              <AdditionalInformation setIdea={setIdeaPayloadHandler} />
            )}
          </div>
        </div>
        <div className="flex ">
          <div className="border-t-2 border-black w-[50%] py-6 px-4">
            <Button
              disabled={step === "basic"}
              clicked={() => setStep("basic")}
              classname="disabled:text-gray6 text-black1 bg-gray3 py-2 px-5 rounded-full"
            >
              Back
            </Button>
          </div>
          <div
            className={`border-t-2 ${
              step === "additional" ? "border-black" : "border-gray3"
            }  w-[50%] flex px-4 py-6`}
          >
            <Button
              disabled={
                !ideaPayload.headline ||
                !ideaPayload.summary ||
                !ideaPayload.body ||
                !ideaPayload.banner ||
                ((!ideaPayload.maxbud ||
                  !ideaPayload.minbud ||
                  !ideaPayload.pitch ||
                  !ideaPayload.category) &&
                  step === "additional")
              }
              classname="bg-primary px-5 py-2 disabled:cursor-not-allowed rounded-full ml-auto disabled:bg-[#A6ABAF] text-white"
              clicked={() => setStep("additional")}
            >
              {step === "basic" ? "Next" : "Share idea"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareIdea;
