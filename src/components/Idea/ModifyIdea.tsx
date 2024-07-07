import { IGetSingleIdeaResponse } from "@/interface/idea";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NoProfilePic from "/public/assets/no-profile.jpg";
import moment from "moment";
import InfoImg from "/public/assets/info.svg";
import Editor from "../Editor/Editor";
import Input from "../Input/Input";
import SelectComponent from "../Select/Select";
import { idea_categories_list } from "@/utils/constants";
import Button from "../Button/Button";
import { IoMdAdd } from "react-icons/io";
import { useModifyIdeaMutation } from "@/lib/features/ideas";
import { getCookie } from "@/utils/storage";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { formatNameRoute } from "@/utils/helperfunctions";
import Spinner from "../Spinner/Spinner";

type Props = {
  data: IGetSingleIdeaResponse;
};

const ModifyIdea = ({ data }: Props) => {
  const router = useRouter();
  const id = getCookie("id");
  const [modifyIdea, { isLoading, isError, isSuccess, error }] =
    useModifyIdeaMutation();
  const [modifiedData, setModifiedData] = useState({
    headline: data.idea.headline,
    summary: data.idea.summary,
    pitches: [{ step: "", count: "" }],
    minbud: data.idea.minbud,
    maxbud: data.idea.maxbud,
    category: data.idea.category,
    banner: data.thumbs[0]?.path,
  });
  useEffect(() => {
    if (data.pitches) {
      const entryMap = data.pitches.map(({ count, step }) => {
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
  }, [data.pitches]);

  useEffect(() => {
    if (isError) {
      notify((error as any)?.data?.message || "Something went wrong");
    }
    if (isSuccess) {
      notify("Idea Modified Successfully Successfully", "success");
      router.push(
        `/idea/${data.idea._id}/${formatNameRoute(data.idea.headline)}`
      );
    }
  }, [isError, isSuccess]);

  const [modifiedIdea, setModifiedIdea] = useState<string>(data.idea.body);
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
        category: modifiedData.category,
        headline: modifiedData.headline,
        maxbud: modifiedData.maxbud as string,
        minbud: modifiedData.minbud as string,
        pitches: JSON.stringify(pitchsIsEmpty ? [] : modifiedData.pitches),
        summary: modifiedData.summary,
        userId: id,
      },
      ideaId: data.idea._id,
    });
  };

  return (
    <div className="bg-white pt-10 mx-auto w-full xs:w-[98%] min-h-[90vh] rounded-sm">
      <div className="w-[95%] sm:w-[80%] lg:w-[60%] mx-auto">
        <h1 className="text-xl font-semibold">{data.idea.headline}</h1>
        <div className="flex flex-wrap items-center  mt-8">
          <div className="rounded-full overflow-hidden mr-4 w-[2.4rem]">
            <Image
              width={50}
              height={50}
              src={data.profile?.ppicture || NoProfilePic}
              alt="avatar"
            />
          </div>
          <div className="w-full mt-3 sm:mt-0 sm:w-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="  text-base mb-[0..5rem]">
                {data.user.fname} {data.user.lname}
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                {data.profile?.title} {data.profile?.pow} • 5 min read •{" "}
                {moment(data.idea.createdAt).startOf("day").fromNow()}
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <label className="text-sm font-bold mt-8 mb-4 block">Headline</label>
          <Input
            value={modifiedData.headline}
            changed={(e) => {
              setModifiedDataHandler("headline", e.target.value);
            }}
            placeholder="Give your idea a headline"
            class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
        <div className="">
          <label className="text-sm font-bold mt-8 mb-4 block">Summary</label>
          <Input
            value={modifiedData.summary}
            changed={(e) => {
              setModifiedDataHandler("summary", e.target.value);
            }}
            placeholder="A brief summary of what your ideas entails"
            class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
        <h1 className="text-sm font-bold mt-8 mb-4">Price range</h1>
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="">
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
          <div className="">
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
        <h2 className="font-bold text-sm mt-8">Category</h2>
        <p className="text-sm mt-1 text-gray4">
          Select a relevant history your idea belongs to
        </p>
        <div className="mt-6">
          <SelectComponent
            value={modifiedData.category}
            changed={(val) => setModifiedDataHandler("category", val)}
            options={idea_categories_list}
            placeholder="Select an option"
            size="md"
            radius="sm"
          />
        </div>
        <div className="mb-8 bg-amber-bg text-sm mt-8 text-amber-dark flex flex-wrap xs:flex-nowrap px-5 py-3 gap-3 items-center justify-center rounded-lg">
          <Image
            src={InfoImg}
            alt="info-img"
            className="w-[2rem] xxs:w-[2.5rem]"
          />
          <p>
            When making changes to an idea, you can't delete it entirely; you
            can only modify it. The 'Delete' function will only “strikethrough”
            selected characters, and your new text will appear in red print.
          </p>
        </div>
        <div className="mt-6">
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
      </div>
      <div className="flex py-10 px-4">
        <Button classname="bg-gray3 w-[7rem] mr-auto rounded-full py-2 px-5">
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
