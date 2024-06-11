import React, { useState } from "react";
import PhotoLibraryImg from "/public/assets/photo_library.svg";
import Image from "next/image";
import FileButtonComponent from "../FileButton/FileButton";
import Button from "../Button/Button";
import DeleteImg from "/public/assets/delete.svg";

type Props = {
  setFile: (key: string, value: string | File | null) => void;
  accept: string;
  files?: boolean;
  uploadDoc?: (file: File | null) => void;
  basic?: boolean;
  preview?: string;
  setBannerPreview?: (preview: string) => void;
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
              <p>
                {props.basic
                  ? "1600 *1200 (4:3) recommended, up to 10MB each. You can add up-to 5 photos"
                  : "Delete Image"}
              </p>
            </Button>
          </div>
        </div>
      ) : (
        <div className=" px-[2rem] sm:px-0 relative border rounded-lg h-[25rem] xxs:h-[28rem] sm:h-[35rem] border-gray8">
          <div className="w-full text-center absolute top-[40%] xxs:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={PhotoLibraryImg}
              alt="photo-library"
              className="mx-auto"
            />
            <div className="">
              <p className="text-black1 font-semibold py-4">
                {props.basic
                  ? "Drop your Idea Image here"
                  : "Drop your file here"}
              </p>
              <p className="w-[95%] mx-auto sm:w-full text-gray1 text-xs">
                100MB total limit
              </p>
            </div>
          </div>
          <div className="">
            <FileButtonComponent
              accept={props.accept}
              setFile={(key, value) => {
                if (props.files && props.uploadDoc) {
                  console.log("sdllds");
                  return props.uploadDoc(value);
                } else if (typeof value === "object") {
                  const url = URL.createObjectURL(value as File);
                  props.setBannerPreview && props.setBannerPreview(url);
                }
                props.setFile(key, value);
              }}
            >
              <div className="w-[85%]  justify-center mx-auto xs:w-auto absolute px-4 py-2 -translate-x-1/2 -translate-y-1/2 bottom-6 left-1/2  font-semibold items-center flex border border-gray8 rounded-full ">
                <Image
                  src={PhotoLibraryImg}
                  alt="photo-library"
                  className=" w-[1.7rem] mr-1"
                />
                <p className="text-xs">click here to browse</p>
              </div>
            </FileButtonComponent>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
