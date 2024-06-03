import { Form, Formik } from "formik";
import React from "react";
import Input from "../Input/Input";
import Editor from "../Editor/Editor";
import Upload from "../Upload/Upload";
import { ICreateIdeaPayload } from "@/interface/idea";

type Props = {
  setIdea: (key: string, value: string | File | null) => void;
  idea: ICreateIdeaPayload;
};

const BasicInformation = ({ setIdea, idea }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl xxs:text-3xl">Share your existing idea</h1>
      <p className="text-xs xxs:text-sm mt-2 text-gray4">
        Turn your idea into a sensation. Share it now and let the buzz begin!
      </p>
      <div className="">
        <div className="">
          <label className="text-sm font-bold mt-8 mb-4 block">Headline</label>
          <Input
            value={idea.headline}
            changed={(e) => {
              setIdea("headline", e.target.value);
            }}
            placeholder="Give your idea a headline"
            class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
        <div className="">
          <label className="text-sm font-bold mt-8 mb-4 block">Summary</label>
          <Input
            value={idea.summary}
            changed={(e) => {
              setIdea("summary", e.target.value);
            }}
            placeholder="A brief summary of what your ideas entails"
            class="rounded-lg w-full px-4 py-2 border border-gray8 placeholder:text-gray1 placeholder:text-sm outline-none"
          />
        </div>
        <div className="">
          <label className="text-sm font-bold mt-8 mb-4 block">Body</label>
          <Editor content={idea.body} setIdea={setIdea} />
        </div>
        <div className="mb-[5rem]">
          <label className="text-sm font-bold mt-8 mb-4 block">Image</label>
          <Upload accept="image/png,image/jpeg" setFile={setIdea} />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
