"use client";
import Button from "@/components/Button/Button";
import Navbar from "@/components/Navbar/Navbar";
import AdditionalInformation from "@/components/ShareIdea/AdditionalInformation";
import BasicInformation from "@/components/ShareIdea/BasicInformation";
import Spinner from "@/components/Spinner/Spinner";
import { ICreateIdeaPayload } from "@/interface/idea";
import { useCreateIdeaMutation } from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WIthAuth from "@/components/HOC/ProtectRoute";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {};

const ShareIdea = (props: Props) => {
  const id = getCookie("id");
  const router = useRouter();
  const [createIdea, { isLoading, isError, isSuccess, error }] =
    useCreateIdeaMutation();
  const [step, setStep] = useState<"basic" | "additional">("basic");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [currencyValue, setCurrencyValue] = useState<string>("$");
  const [checked, setChecked] = useState<boolean>(false);
  const [ideaPayload, setIdeaPayload] = useState<ICreateIdeaPayload>({
    headline: "",
    summary: "",
    category: "",
    body: "",
    pitchs: [
      {
        count: "",
        step: "",
      },
      {
        count: "",
        step: "",
      },
    ],
    minbud: "",
    maxbud: "",
    banner: null,
    files: null,
  });
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Error Creating Idea",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
    }
    if (isSuccess) {
      notifications.show({
        title: "Success!",
        message: "Idea posted successfuly!",
        autoClose: 3000,
        color: successColor,
      });
      router.push("/");
    }
  }, [isError, isSuccess]);

  const createIdeaHandler = () => {
    let pitchsIsEmpty = true;
    let trimmedPitches = ideaPayload.pitchs.filter((el) => !!el.step);
    if (trimmedPitches.length === 0) {
      pitchsIsEmpty = false;
    }

    const payload: {
      headline: string;
      summary: string;
      category: string;
      body: string;
      pitches: string;
      minbud?: string;
      maxbud?: string;
      userId?: string;
      banner: File | null;
      files?: File[] | null;
    } = {
      banner: ideaPayload.banner,
      headline: ideaPayload.headline,
      category: ideaPayload.category,
      summary: ideaPayload.summary,
      body: ideaPayload.body,
      pitches: JSON.stringify(pitchsIsEmpty ? [] : trimmedPitches),
      userId: id,
      files: ideaPayload.files,
    };
    if (ideaPayload.minbud) {
      payload.minbud = `${currencyValue} ${ideaPayload.minbud}`;
    }
    if (ideaPayload.maxbud) {
      payload.maxbud = `${currencyValue} ${ideaPayload.maxbud}`;
    }
    createIdea(payload);
  };
  const setIdeaPayloadHandler = (key: string, value: string | File | null) => {
    setIdeaPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const updatePitch = (value: string, count: string) => {
    const newEntry = {
      count,
      step: value,
    };
    const currentPitch = [...ideaPayload.pitchs];
    currentPitch.splice(Number(count), 1, newEntry);
    setIdeaPayload({
      ...ideaPayload,

      pitchs: currentPitch,
    });
  };

  const addNewPitch = () => {
    const newEntry = {
      count: "",
      step: "",
    };
    const currentPitch = [...ideaPayload.pitchs];
    currentPitch.push(newEntry);
    setIdeaPayload((prev) => ({
      ...prev,
      pitchs: currentPitch,
    }));
  };

  const addDocumentFilesHandler = (file: File | null) => {
    if (!file) return;
    let updatedFileList;
    if (ideaPayload.files) {
      const currentFileList = [...ideaPayload.files];
      currentFileList.push(file);
      updatedFileList = currentFileList;
    } else {
      updatedFileList = [file];
    }

    setIdeaPayload({
      ...ideaPayload,
      files: updatedFileList,
    });
  };
  const deleteDocumentHandler = (index: number) => {
    if (!ideaPayload.files) return;
    const currrentFileList = [...ideaPayload.files];
    currrentFileList.splice(index, 1);
    setIdeaPayload({
      ...ideaPayload,
      files: currrentFileList,
    });
  };
  const updateDocumentHandler = (file: File | null, index: number) => {
    if (!file || !ideaPayload.files) return;
    const fileList = [...ideaPayload.files];
    fileList.splice(index, 1, file);
    setIdeaPayload({
      ...ideaPayload,
      files: fileList,
    });
  };

  const setBannerPreviewHandler = (preview: string) => {
    setBannerPreview(preview);
  };

  const setCurrencyValueHandler = (val: string) => {
    setCurrencyValue(val);
  };

  const setCheckedHandler = (checked: boolean) => {
    setChecked(checked);
  };

  return (
    <div className="">
      <Navbar />
      <motion.div className="max-w-[1700px] mx-auto">
        <div className="flex gap-3 px-6 xs:px-[2.4rem] des:px-[10rem] mt-[3rem]">
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
                setBannerPreview={setBannerPreviewHandler}
                preview={bannerPreview}
                idea={ideaPayload}
                setIdea={setIdeaPayloadHandler}
              />
            ) : (
              <AdditionalInformation
                checked={checked}
                setChecked={setCheckedHandler}
                addDocHandler={addDocumentFilesHandler}
                updateDocHandler={updateDocumentHandler}
                addNewPitchHandler={addNewPitch}
                updatePitchHandler={updatePitch}
                idea={ideaPayload}
                setIdea={setIdeaPayloadHandler}
                deleteFileHandler={deleteDocumentHandler}
                currValue={currencyValue}
                setCurrValue={setCurrencyValueHandler}
              />
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
                ((!(ideaPayload.pitchs.length > 0) || !ideaPayload.category || !checked) &&
                  step === "additional")
              }
              classname="bg-primary px-5 py-2 disabled:cursor-not-allowed rounded-full ml-auto disabled:bg-[#A6ABAF] text-white"
              clicked={() => {
                if (step === "additional") {
                  return createIdeaHandler();
                }
                setStep("additional");
              }}
            >
              {isLoading ? (
                <div className="mx-8">
                  <Spinner />
                </div>
              ) : (
                <p>{step === "basic" ? "Next" : "Share idea"}</p>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WIthAuth(ShareIdea);
