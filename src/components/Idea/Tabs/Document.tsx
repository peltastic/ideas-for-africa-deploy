import { IIdeaDocumentData } from "@/interface/idea";
import Image from "next/image";
import React from "react";
import PhotoImg from "/public/assets/picture_as_pdf.svg";
import Button from "@/components/Button/Button";
import DownloadSvg from "/public/assets/download-icon.svg";
import Link from "next/link";

type Props = {
  data: IIdeaDocumentData[];
};

const Document = ({ data }: Props) => {
  return (
    <div>
      {data.map((el) => (
        <div className="flex flex-wrap sm:flex-nowrap items-center my-6" key={el._id}>
          <div className="bg-gray3 rounded-lg mr-6 py-4 px-4 flex items-center justify-center ">
            <Image src={PhotoImg} alt="photo-img" />
          </div>
          <p className="mr-auto mt-4 xs:mt-0">{el.originalName}</p>
          <Link href={el.path} target="_blank">
            <Button classname="w-full mt-6 sm:mt-0  md:w-auto flex items-center rounded-full px-6 py-3 md:py-3 text-xs text-white bg-primary md:mr-8 border-primary border">
              <div className="mr-3">
                <Image src={DownloadSvg} alt="download-svg" />
              </div>
              <p>Download</p>
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Document;
