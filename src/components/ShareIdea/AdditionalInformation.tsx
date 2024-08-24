import React, { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import { IoMdAdd } from "react-icons/io";
import SelectComponent from "../Select/Select";
import Upload from "../Upload/Upload";
import { ICreateIdeaPayload } from "@/interface/idea";
import {
  idea_categories_list,
  share_idea_categories_list,
} from "@/utils/constants";
import { motion } from "framer-motion";
import curr_list from "@/data/currencies.json";
import CheckboxComponent from "../Checkbox/CheckboxComponent";
import Link from "next/link";

type Props = {
  setIdea: (key: string, value: string | File | null) => void;
  idea: ICreateIdeaPayload;
  updatePitchHandler: (value: string, count: string) => void;
  addNewPitchHandler: () => void;
  addDocHandler: (file: File | null) => void;
  deleteFileHandler: (index: number) => void;
  updateDocHandler: (file: File | null, index: number) => void;
  currValue: string;
  setCurrValue: (val: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const AdditionalInformation = ({
  setIdea,
  idea,
  updatePitchHandler,
  addNewPitchHandler,
  addDocHandler,
  deleteFileHandler,
  updateDocHandler,
  setCurrValue,
  currValue,
  checked,
  setChecked,
}: Props) => {
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        bounce: 1,
      }}
      className="pb-[5rem]"
    >
      <h1 className="font-bold text-2xl xxs:text-3xl">
        Additional Information
      </h1>
      <p className="text-xs xxs:text-sm mt-2 text-gray4">
        Turn your idea into a sensation. Share it now and let the buzz begin!
      </p>

      <h2 className="font-bold text-sm mt-8">Pitch (optional)</h2>
      <p className="text-sm mt-1 text-gray4">
        Add a step by step process in realising this idea
      </p>
      {idea.pitchs.map((el, index) => (
        <div key={index} className="">
          <label className="text-sm  mt-8 mb-2 block">Step {index + 1}</label>
          <Input
            value={el.step}
            changed={(e) => {
              updatePitchHandler(e.target.value, index.toString());
            }}
            placeholder="A brief summary of what your ideas entails"
            class="rounded-full w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
      ))}
      {/* <div className="">
        <label className="text-sm  mt-4 mb-2 block">Step 2</label>
        <Input
          changed={(e) => {
            console.log(e);
          }}
          placeholder="A brief summary of what your ideas entails"
          class="rounded-full w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
        />
      </div> */}
      <div
        onClick={addNewPitchHandler}
        className="flex cursor-pointer items-center justify-center border text-center py-2 text-sm rounded-full mt-8 border-gray8"
      >
        <IoMdAdd className="mr-1 text-lg" />
        <p>Add more</p>
      </div>
      <h1 className="text-sm font-bold mt-8 mb-4">Price range</h1>
      <div className="mt-6 flex flex-wrap sm:flex-nowrap items-center gap-6">
        <div className="w-full sm:w-[20%]">
          {currencyOptions.length > 0 ? (
            <>
              <label className="text-sm  mb-2 block">Currency</label>
              <SelectComponent
                value={currValue}
                size="md"
                options={currencyOptions}
                searchable
                changed={(val) => setCurrValue(val)}
              />
            </>
          ) : null}
        </div>
        <div className="w-full sm:w-[38%]">
          <label className="text-sm  mb-2 block">Minimum Budget</label>
          <Input
            value={idea.minbud}
            changed={(e) => {
              setIdea("minbud", `${e.target.value}`);
            }}
            placeholder=""
            class="rounded-full w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
        <div className="w-full sm:w-[38%]">
          <label className="text-sm  mb-2 block">Maximum budget</label>
          <Input
            value={idea.maxbud}
            changed={(e) => {
              setIdea("maxbud", `${e.target.value}`);
            }}
            type="number"
            placeholder=""
            class="rounded-full w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
      </div>
      <h2 className="font-bold text-sm mt-8">Category</h2>
      <p className="text-sm mt-1 text-gray4">
        Select a relevant history your idea belongs to
      </p>
      <div className="mt-6">
        <SelectComponent
          value={idea.category}
          changed={(val) => setIdea("category", val)}
          options={share_idea_categories_list}
          placeholder="Select an option"
          size="sm"
        />
      </div>
      <h2 className="font-bold text-sm mt-8">Document</h2>
      <p className="text-sm mt-1 text-gray4">
        Please provide the necessary documents to support your idea.
      </p>
      <div className="mt-4">
        <Upload
          uploadDoc={addDocHandler}
          files
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
          setFile={setIdea}
          idea={idea.files}
          updateDocHandler={updateDocHandler}
          deleteFileHandler={deleteFileHandler}
        />
      </div>
      <div className="mt-10 flex items-center ">
        <CheckboxComponent checked={checked} setChecked={setChecked} />
        <p className="ml-4">
          By checking the box indicating your agreement with these{" "}
          <span className="underline text-primary">
            <Link href={"/terms-and-conditions"} target="_blank">
              Terms & Conditions
            </Link>
          </span>
          , you acknowledge that you have read, understood, and agree to be
          bound by these{" "}
          <span className="underline text-primary">
            <Link href={"/terms-and-conditions"} target="_blank">Terms</Link>
          </span>
        </p>
      </div>
      {/* <div className="mt-8">
        {idea
          ? idea.files?.map((el, index) => (
              <File
                key={el.name}
                updateDocHandler={updateDocHandler}
                deleteFileHandler={deleteFileHandler}
                index={index}
                name={el.name}
                size={el.size}
              />
            ))
          : null}
      </div> */}
    </motion.div>
  );
};

export default AdditionalInformation;
