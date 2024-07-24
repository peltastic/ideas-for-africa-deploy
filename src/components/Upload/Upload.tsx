import React, { useState } from "react";
import PhotoLibraryImg from "/public/assets/photo_library.svg";
import Image from "next/image";
import FileButtonComponent from "../FileButton/FileButton";
import Button from "../Button/Button";
import DeleteImg from "/public/assets/delete.svg";
import { ICreateIdeaPayload } from "@/interface/idea";
import File from "../ShareIdea/File";

type Props = {
  setFile: (key: string, value: string | File | null) => void;
  accept: string;
  files?: boolean;
  uploadDoc?: (file: File | null) => void;
  basic?: boolean;
  preview?: string;
  setBannerPreview?: (preview: string) => void;
  idea?: ICreateIdeaPayload;
  deleteFileHandler?: (index: number) => void;
  updateDocHandler?: (file: File | null, index: number) => void;
};

const Upload = (props: Props) => {
  return (
    <>
      {props.preview ? (
        <div className=" overflow-hidden rounded-2xl relative">
          <div className="overflow-hidden rounded-2xl">
            <Image
              className="w-full"
              src={props.preview}
              alt="image-preview"
              width={100}
              height={100}
            />
          </div>
          <div className="mm:absolute flex mt-8 mm:mt-0    gap-3 items-center  mm:-translate-x-1/2 mm:-translate-y-1/2 bottom-6 left-1/2">
            <FileButtonComponent
              accept={props.accept}
              setFile={(key, value) => {
                if (props.files && props.uploadDoc) {
                  props.uploadDoc(value);
                } else if (typeof value === "object") {
                  const url = URL.createObjectURL(value as File);
                  props.setBannerPreview && props.setBannerPreview(url);
                }
                props.setFile(key, value);
              }}
            >
              <div className=" w-full mm:w-auto  justify-center bg-white px-2  xxs:px-4 py-2  text-black1 items-center flex border border-gray8 rounded-full ">
                <Image
                  src={PhotoLibraryImg}
                  alt="photo-library"
                  className="w-[1.7rem] mr-1"
                />
                <p className="text-[0.6rem] xs:text-xs">Change Image</p>
              </div>
            </FileButtonComponent>

            <Button
              clicked={() =>
                props.setBannerPreview && props.setBannerPreview("")
              }
              classname=" border  flex justify-center text-[0.6rem] xs:text-xs text-black1 items-center gap-2 px-4 xxs:px-8 py-[0.9rem] rounded-full bg-white"
            >
              <Image src={DeleteImg} alt="delete-svg" />
              <p>{props.basic ? "Delete Image" : "Delete Image"}</p>
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`px-[2rem] sm:px-0 relative border rounded-tr-lg rounded-tl-lg ${
            props.files
              ? "min-h-[20rem] overflow-y-auto "
              : "h-[22rem] xxs:h-[25rem] sm:h-[30rem]"
          }  border-gray8`}
        >
          <>
            {props.idea?.files && props.idea.files?.length > 0 ? (
              props.idea.files?.map((el, index) => (
                <div className="px-10">
                  <File
                    key={el.name}
                    updateDocHandler={props.updateDocHandler || (() => {})}
                    deleteFileHandler={props.deleteFileHandler || (() => {})}
                    index={index}
                    name={el.name}
                    size={el.size}
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={PhotoLibraryImg}
                  alt="photo-library"
                  className="mx-auto"
                />
                <div className="">
                  <p className="text-black1 font-semibold py-4">
                    {props.basic
                      ? "Drop your Idea Image here"
                      : "Drop your files here"}
                  </p>
                  <p className="w-[95%] mx-auto sm:w-full text-gray1 text-xs">
                    100MB total limit
                  </p>
                </div>
              </div>
            )}
          </>
        </div>
      )}
      {props.preview ? null : (
        <div className="">
          <FileButtonComponent
            accept={props.accept}
            setFile={(key, value) => {
              if (props.files && props.uploadDoc) {
                return props.uploadDoc(value);
              } else if (typeof value === "object") {
                const url = URL.createObjectURL(value as File);
                props.setBannerPreview && props.setBannerPreview(url);
              }
              props.setFile(key, value);
            }}
          >
            <div className="w-[85%] rounded-bl-lg rounded-br-lg  justify-center mx-auto xs:w-auto px-4 py-4   font-semibold items-center flex border-l border-r border-b border-gray8">
              <Image
                src={PhotoLibraryImg}
                alt="photo-library"
                className=" w-[1.7rem] mr-1"
              />
              <p className="text-xs">click here to browse</p>
            </div>
          </FileButtonComponent>
        </div>
      )}
    </>
  );
};

export default Upload;
