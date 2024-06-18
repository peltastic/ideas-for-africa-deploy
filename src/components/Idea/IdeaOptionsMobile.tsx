import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Backdrop from "../Backdrop/Backdrop";
import Hamburger from "/public/assets/menu.svg";
import Button from "../Button/Button";
import Image from "next/image";
import ModifyIdeaImg from "/public/assets/auto_fix _black.svg";
import Brainstorm from "/public/assets/psychology_alt_black.svg";

type Props = {
  setOpenVH: () => void;
};

const IdeaOptionsMobile = (props: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      {clicked ? <Backdrop clicked={() => setClicked(false)} /> : null}
      <div
        className={` mb-3 fixed z-[120] top-[50%] -translate-y-1/2 right-5 transition-all ${
          clicked ? "translate-x-0" : "translate-x-[200%]"
        }`}
      >
        <ul className="text-white">
          <li onClick={props.setOpenVH} className="flex items-center text-lg">
            <p className="mr-3 ml-auto">Version History</p>
            <Button classname="bg-gray11 h-[3.5rem] w-[3.5rem] flex justify-center items-center rounded-full">
              <Image src={Hamburger} alt="hamburger" />
            </Button>
          </li>
          <li onClick={props.setOpenVH} className="flex items-center mt-6">
            <p className="mr-3 ml-auto">Modify Idea</p>
            <Button classname="bg-gray11 h-[3.5rem] w-[3.5rem] flex justify-center items-center rounded-full">
              <Image src={ModifyIdeaImg} alt="modify-idea" />
            </Button>
          </li>
          <li className="flex items-center mt-6">
            <p className="mr-3 ml-auto">Brainstorm idea</p>
            <Button classname="bg-gray11 h-[3.5rem] w-[3.5rem] flex justify-center items-center rounded-full">
              <Image src={Brainstorm} alt="modify-idea" />
            </Button>
          </li>
          <li className="flex mt-6">
            <div
              onClick={() => setClicked(false)}
              className={`ml-auto transition-all rotate-45 bg-primary rounded-full shadow-xl h-[3.5rem] xxs:h-[4rem] w-[3.5rem] xxs:w-[4rem] flex items-center justify-center`}
            >
              <IoMdAdd className="text-white text-[2rem]" />
            </div>
          </li>
        </ul>
      </div>
      <div className="absolute z-[120] right-0 -top-4">
        <div className="flex">
          <div
            onClick={() => setClicked(true)}
            className={`ml-auto ${
              clicked ? "hidden" : "block"
            } transition-all bg-primary rounded-full shadow-xl h-[3.5rem] xxs:h-[4rem] w-[3.5rem] xxs:w-[4rem] flex items-center justify-center`}
          >
            <IoMdAdd className="text-white text-[2rem]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeaOptionsMobile;
