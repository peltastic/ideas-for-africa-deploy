import React from "react";
import PhotoImg from "/public/assets/picture_as_pdf.svg";
import Image from "next/image";
import MenuComponent from "../Menu/Menu";
import { SlOptions } from "react-icons/sl";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import FileButtonComponent from "../FileButton/FileButton";

type Props = {
  name: string;
  size: number;
  index: number;
  deleteFileHandler: (index: number) => void;
  updateDocHandler: (file: File | null, index: number) => void;
};

const File = (props: Props) => {
  return (
    <div className="flex items-center my-6">
      <div className="bg-gray3 rounded-lg mr-6 py-4 px-4 flex items-center justify-center ">
        <Image src={PhotoImg} alt="photo-img" />
      </div>
      <div className="text-sm mr-auto">
        <p>{props.name}</p>
        <p className="text-gray1x">{(props.size / 1000000).toFixed(2)} MB</p>
      </div>
      <MenuComponent
        target={
          <div>
            <SlOptions className="cursor-pointer" />
          </div>
        }
      >
        <div className="bg-white shadow-md py-3 px-4 text-sm">
          <FileButtonComponent
            accept="application/pdf"
            setFile={(key, value) => props.updateDocHandler(value, props.index)}
          >
            <div className="flex items-center">
              <MdOutlineEdit className="mr-3" />
              <p>Change File</p>
            </div>
          </FileButtonComponent>
          <div
            onClick={() => props.deleteFileHandler(props.index)}
            className="flex cursor-pointer items-center text-red1 mt-3"
          >
            <RiDeleteBinLine className="mr-3" />
            <p>Delete File</p>
          </div>
        </div>
      </MenuComponent>
    </div>
  );
};

export default File;
