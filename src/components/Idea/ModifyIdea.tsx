import { IGetSingleIdeaResponse } from "@/interface/idea";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NoProfilePic from "/public/assets/no-profile.jpg";
import moment from "moment";
import InfoImg from "/public/assets/info.svg";
import Editor from "../Editor/Editor";
import Input from "../Input/Input";

import Button from "../Button/Button";
import { IoMdAdd } from "react-icons/io";
import { useModifyIdeaMutation } from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { formatNameRoute } from "@/utils/helperfunctions";
import Spinner from "../Spinner/Spinner";
import { IoChevronBackSharp } from "react-icons/io5";
import curr_list from "@/data/currencies.json";
import SelectComponent from "../Select/Select";
import Upload from "../Upload/Upload";
import { AspectRatio } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  data: IGetSingleIdeaResponse;
};

const ModifyIdea = (props: Props) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [currencyValue, setCurrencyValue] = useState<string>(
    props.data.idea.minbud?.split(" ")[0] || "$"
  );
  const [currencyOptions, setCurrencyOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  useEffect(() => {
    const formattedCurrData = curr_list.map((el) => {
      return {
        label: el.code,
        value: el.symbol,
      };
    });
    setCurrencyOptions(formattedCurrData);
  }, []);
  const router = useRouter();
  const id = getCookie("id");
  const [modifyIdea, { isLoading, isError, isSuccess, error, data }] =
    useModifyIdeaMutation();
  const [modifiedData, setModifiedData] = useState({
    // headline: data.idea.headline,
    summary: props.data.idea.summary,
    pitches: [{ step: "", count: "" }],
    minbud: props.data.idea.minbud?.split(" ")[1] || "",
    maxbud: props.data.idea.maxbud?.split(" ")[1] || "",
    // category: props.data.idea.category,
    banner: props.data.thumbs[0]?.path,
  });
  useEffect(() => {
    if (props.data.pitches) {
      const entryMap = props.data.pitches.map(({ count, step }) => {
        return {
          step,
          count,
        };
      });
      const sortedEntryMap = entryMap.sort(
        (a, b) => parseFloat(a.count) - parseFloat(b.count)
      );
      setModifiedData({
        ...modifiedData,
        pitches: sortedEntryMap,
      });
    }
  }, [props.data.pitches]);

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Error Modifying Idea",
        message: (error as any)?.data?.message || "Something went wrong",
        autoClose: 3000,
        color: errorColor,
      });
    }
    if (isSuccess && props.data) {
      notifications.show({
        title: "Success!",
        message: "Idea modified successfuly!",
        autoClose: 3000,
        color: successColor,
      });
      router.push(
        `/idea/${props.data.idea._id}/${formatNameRoute(
          props.data.idea.headline
        )}/modified-idea/${data.modiId}`
      );
    }
  }, [isError, isSuccess, props.data]);

  const [modifiedIdea, setModifiedIdea] = useState<string>(
    props.data.idea.body
  );
  const setModifiedIdeaHandler = (key: string, value: string | File) => {
    setModifiedIdea(value as string);
  };

  const setModifiedDataHandler = (key: string, el: string) => {
    setModifiedData({
      ...modifiedData,
      [key]: el,
    });
  };
  const updatePitchHandler = (value: string, count: string) => {
    if (!modifiedData.pitches) {
      return;
    }
    const newEntry = {
      count,
      step: value,
    };
    const currentPitch = [...modifiedData.pitches];
    currentPitch.splice(Number(count), 1, newEntry);
    setModifiedData((prev) => ({
      ...prev,
      pitches: currentPitch,
    }));
  };

  const addNewPictchHandler = () => {
    if (!modifiedData.pitches) {
      return;
    }
    const newEntry = {
      count: "",
      step: "",
    };
    const currentPitch = [...modifiedData.pitches];
    currentPitch.push(newEntry);
    setModifiedData((prev) => ({
      ...prev,
      pitches: currentPitch,
    }));
  };

  const modifyIdeaHandler = () => {
    let pitchsIsEmpty = true;
    for (const el of modifiedData.pitches) {
      if (el.step) {
        pitchsIsEmpty = false;
        break;
      }
    }
    modifyIdea({
      body: {
        body: modifiedIdea,
        category: props.data.idea.category,
        headline: props.data.idea.headline,
        maxbud: `${currencyValue} ${modifiedData.maxbud}`,
        minbud: `${currencyValue} ${modifiedData.minbud}`,
        pitches: JSON.stringify(pitchsIsEmpty ? [] : modifiedData.pitches),
        summary: modifiedData.summary,
        userId: id,
        files,
      },
      ideaId: props.data.idea._id,
    });
  };

  return (
    <div className="relative bg-white pt-10 mx-auto w-full xs:w-[98%] min-h-[90vh] rounded-sm">
      <Button
        clicked={() => router.back()}
        classname="flex bg-gray8 py-1 px-2 mb-6 ml-6 rounded-lg left-8 items-center text-lg"
      >
        <IoChevronBackSharp />
        <p className="text-sm">Back</p>
      </Button>
      <div className="w-[95%] sm:w-[80%] lg:w-[60%] mx-auto">
        <h1 className="text-xl font-semibold">{props.data.idea.headline}</h1>
        <div className="flex flex-wrap items-center  mt-8">
          <div className="rounded-full overflow-hidden mr-4 h-[2.4rem] w-[2.4rem]">
            <AspectRatio ratio={1800 / 1800}>
              <Image
                width={50}
                height={50}
                src={props.data.profile?.ppicture || NoProfilePic}
                alt="avatar"
              />
            </AspectRatio>
          </div>
          <div className="w-full mt-3 sm:mt-0 sm:w-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="  text-base mb-[0..5rem]">
                {props.data.user.fname} {props.data.user.lname}
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                {props.data.profile?.title} {props.data.profile?.pow} • 5 min
                read •{" "}
                {moment(props.data.idea.createdAt).startOf("day").fromNow()}
              </p>
            </div>
          </div>
        </div>

        {/* <div className=""> */}
        {/* <label className="text-sm font-bold mt-8 mb-4 block">Headline</label>
          <Input
            value={modifiedData.headline}
            changed={(e) => {
              setModifiedDataHandler("headline", e.target.value);
            }}
            placeholder="Give your idea a headline"
            class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div> */}
        {/* <div className=""> */}
        {/* <label className="text-sm font-bold mt-8 mb-4 block">Summary</label>
          <Input
            value={modifiedData.summary}
            changed={(e) => {
              setModifiedDataHandler("summary", e.target.value);
            }}
            placeholder="A brief summary of what your ideas entails"
            class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div> */}
        <h1 className="text-sm font-bold mt-8 mb-4">Price range</h1>
        <div className="mt-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
          <div className="w-[100%] sm:w-[20%]">
            {currencyOptions.length > 0 ? (
              <>
                <label className="text-sm  mb-2 block">Currency</label>
                <SelectComponent
                  value={currencyValue}
                  size="md"
                  radius="md"
                  searchable
                  options={currencyOptions}
                  changed={(val) => setCurrencyValue(val)}
                />
              </>
            ) : null}
          </div>
          <div className="w-[100%] sm:w-[38%]">
            <label className="text-sm  mb-2 block">Minimum Budget</label>
            <Input
              value={modifiedData.minbud}
              changed={(e) => {
                setModifiedDataHandler("minbud", `${e.target.value}`);
              }}
              placeholder=""
              class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
            />
          </div>
          <div className="w-[100%] sm:w-[38%]">
            <label className="text-sm  mb-2 block">Maximum budget</label>
            <Input
              value={modifiedData.maxbud}
              changed={(e) => {
                setModifiedDataHandler("maxbud", `${e.target.value}`);
              }}
              placeholder=""
              class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
            />
          </div>
        </div>
        {modifiedData.pitches &&
          modifiedData.pitches?.map((el, index) => (
            <div key={index} className="">
              <label className="text-sm  mt-8 mb-2 block">
                Step {index + 1}
              </label>
              <Input
                value={el.step}
                changed={(e) => {
                  updatePitchHandler(e.target.value, index.toString());
                }}
                placeholder="A brief summary of what your ideas entails"
                class="rounded-md w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
              />
            </div>
          ))}
        <div
          onClick={addNewPictchHandler}
          className="cursor-pointer flex items-center justify-center border text-center py-2 text-sm rounded-full mt-8 border-gray8"
        >
          <IoMdAdd className="mr-1 text-lg" />
          <p>Add more</p>
        </div>

        {/* <div className="mb-8 bg-amber-bg text-sm mt-8 text-amber-dark flex flex-wrap xs:flex-nowrap px-5 py-3 gap-3 items-center justify-center rounded-lg">
          <Image
            src={InfoImg}
            alt="info-img"
            className="w-[2rem] xxs:w-[2.5rem]"
          />
          <p>
            When making changes to an idea, you can&apos;t delete it entirely;
            you can only modify it. The &lsquo;Delete&rsquo; function will only
            &lsquo;strikethrough&rsquo; selected characters, and your new text
            will appear in red print.
          </p>
        </div> */}
        <div className="mt-6">
          <h1 className="text-xl mb-5">Body</h1>
          <Editor
            isModify
            contentProps={modifiedIdea}
            setIdea={setModifiedIdeaHandler}
          />
        </div>
        <div className="w-full mt-6">
          <Image
            src={modifiedData.banner}
            alt="banner"
            width={100}
            height={100}
            className="w-full"
          />
        </div>
        <h2 className="font-bold text-sm mt-8">Document</h2>
        <p className="text-sm mt-1 text-gray4">
          Please provide the necessary documents to support your modified idea.
        </p>
        <div className="mt-4">
          <Upload
            uploadDoc={(file) => {
              if (!file) return;
              let fileList;
              if (!files) {
                fileList = [file];
              } else {
                fileList = [...files];
                fileList.push(file);
              }
              setFiles(fileList);
            }}
            files
            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
            idea={files}
            updateDocHandler={(file, index) => {
              if (!files || !file) return;
              const fileList = [...files];
              fileList.splice(index, 1, file);
              setFiles(fileList);
            }}
            deleteFileHandler={(index) => {
              if (!files) return;
              const fileList = [...files];
              fileList.splice(index, 1);
              setFiles(fileList);
            }}
          />
        </div>
      </div>
      <div className="flex py-10 px-4">
        <Button clicked={() => router.back()} classname="bg-gray3 w-[7rem] mr-auto rounded-full py-2 px-5">
          Discard
        </Button>
        <Button
          clicked={modifyIdeaHandler}
          disabled={isLoading}
          classname="bg-primary w-[7rem] flex justify-center items-center text-white py-2 px-5 rounded-full"
        >
          {isLoading ? <Spinner /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default ModifyIdea;
