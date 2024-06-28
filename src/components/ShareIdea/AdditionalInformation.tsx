import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { IoMdAdd } from "react-icons/io";
import SelectComponent from "../Select/Select";
import Upload from "../Upload/Upload";
import { ICreateIdeaPayload } from "@/interface/idea";
import File from "./File";
import { idea_categories_list } from "@/utils/constants";

type Props = {
  setIdea: (key: string, value: string | File | null) => void;
  idea: ICreateIdeaPayload;
  updatePitchHandler: (value: string, count: string) => void;
  addNewPitchHandler: () => void;
  addDocHandler: (file: File | null) => void;
  deleteFileHandler: (index: number) => void;
  updateDocHandler: (file: File | null, index: number) => void
};

const AdditionalInformation = ({
  setIdea,
  idea,
  updatePitchHandler,
  addNewPitchHandler,
  addDocHandler,
  deleteFileHandler,
  updateDocHandler
}: Props) => {
  return (
    <div className="pb-[5rem]">
      <h1 className="font-bold text-2xl xxs:text-3xl">
        Share your existing idea
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
        className="flex items-center justify-center border text-center py-2 text-sm rounded-full mt-8 border-gray8"
      >
        <IoMdAdd className="mr-1 text-lg" />
        <p>Add more</p>
      </div>
      <h1 className="text-sm font-bold mt-8 mb-4">Price range</h1>
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2">
        <div className="">
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
        <div className="">
          <label className="text-sm  mb-2 block">Maximum budget</label>
          <Input
            value={idea.maxbud}
            changed={(e) => {
              setIdea("maxbud", `${e.target.value}`);
            }}
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
          options={idea_categories_list}
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
          accept="application/pdf"
          setFile={setIdea}
        />
      </div>
      <div className="mt-8">
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
      </div>
    </div>
  );
};

export default AdditionalInformation;
