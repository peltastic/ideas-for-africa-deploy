import Image from "next/image";
import React, { useEffect, useState } from "react";
import ModifyIdeaImg from "/public/assets/auto_fix.svg";
import InfoImg from "/public/assets/info.svg";
import Avatar1 from "/public/assets/version-pfp-1.jpg";
import CancelSvg from "/public/assets/cancel2.svg";
import TrendingIdeas from "./TrendingIdeas";
import { useRouter } from "next/navigation";
import { formatNameRoute, getRandomColor } from "@/utils/helperfunctions";
import { useLazyGetModifiedIdeasQuery } from "@/lib/features/ideas";
import ModalComponent from "../Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import NotLoggedInModal from "../ModalComponents/NotLoggedInModal";
import { useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { RootState } from "@/lib/store";

import LikedImg from "/public/assets/unlike.svg";

type Props = {
  mid: string;
  modifiedIdea?: boolean;
  closeVH: () => void;
  name: string;
  id: string;
  original: {
    fname: string;
    lname: string;
    pow?: string;
  };
};

const modifyIdeasColorPallet = [
  {
    light: "#8d493a2f",
    dark: "#8D493A",
  },
  {
    light: "#7569b62e",
    dark: "#7469B6",
  },
  {
    light: "#0042253c",
    dark: "#004225",
  },
  {
    light: "#9a031f20",
    dark: "#9A031E",
  },
  {
    light: "#f7c46630",
    dark: "#815607",
  },
];
const ModifyIdeaGrid = (props: Props) => {
  const [colors, setColors] = useState<string[]>([]);
  const [getModifiedIdeas, { isFetching, data }] =
    useLazyGetModifiedIdeasQuery();
  const router = useRouter();
  useEffect(() => {
    getModifiedIdeas(props.id);
  }, []);
  const [opened, { open, close }] = useDisclosure();
  useEffect(() => {
    if (data) {
      const colors = data.modifiedIdeas?.map(() => `bg-[${getRandomColor()}]`);
      setColors(colors);
    }
  }, [data]);

  return (
    <>
      <ModalComponent size="md" centered opened={opened} onClose={close}>
        <NotLoggedInModal title="You need to be logged in to modify ideas" />
      </ModalComponent>
      <div className="border h-screen des:h-auto rounded-md bg-white border-gray3 px-2 xxs:px-6">
        <div onClick={props.closeVH} className="my-8 flex des:hidden">
          <Image src={CancelSvg} alt="cancel-svg" className=" w-[1.2rem]" />
        </div>
        <div className="flex  justify-between items-center">
          <h1 className="text-black1 font-semibold text-lg my-6">
            Version History
          </h1>
        </div>
        {/* <div className="bg-amber-bg text-amber-dark flex flex-wrap xs:flex-nowrap px-5 py-3 gap-3 items-center justify-center rounded-lg">
          <Image
            src={InfoImg}
            alt="info-img"
            className="w-[2rem] xxs:w-[3rem]"
          />
          <p>
            Have a different perspective? Modify the original idea and share
            your thought process with fellow users.
          </p>
        </div> */}
        <div className="xxs:border my-6 border-gray3 rounded-md p-2 xxs:p-4">
          <div
            onClick={() =>
              router.push(`/idea/${props.id}/${formatNameRoute(props.name)}`)
            }
            className={`flex  py-4 px-4 rounded-md ${
              props.mid ? "" : "bg-gray3"
            } transition-all  items-center mb-4  cursor-pointer `}
          >
            <div className="mr-4 ">
              <Image src={Avatar1} alt="avatar" className="w-[3rem]" />
            </div>
            <div className="w-full mt-3 sm:mt-0 sm:w-auto mr-auto">
              <div className="text-black1 text-xs mr-auto ">
                <p className="text-base font-medium mb-[0..5rem]">
                  {props.original.fname} {props.original.lname}
                </p>
                <p className="text-gray1 leading-5 text-[0.9rem]">
                  {props.original.pow}
                </p>
              </div>
            </div>
            <p className="text-primary text-sm font-medium">Original</p>
          </div>
          <div className="">
            {data &&
              colors?.length > 0 &&
              data.modifiedIdeas?.map((el, index) => (
                <div
                  onClick={() =>
                    router.push(
                      `/idea/${props.id}/${formatNameRoute(
                        props.name
                      )}/modified-idea/${el._id}`
                    )
                  }
                  key={el._id}
                  style={{
                    background:
                      props.mid === el._id
                        ? "#EFF1F6"
                        : modifyIdeasColorPallet[
                            index % modifyIdeasColorPallet.length
                          ].light,
                    color:
                      props.mid === el._id
                        ? "#000"
                        : modifyIdeasColorPallet[
                            index % modifyIdeasColorPallet.length
                          ].dark,
                  }}
                  className={` 
            } transition-all  flex cursor-pointer py-4 px-4 rounded-md items-center mb-4 `}
                >
                  <div className="mr-4 ">
                    <Image src={Avatar1} alt="avatar" className="w-[3rem]" />
                  </div>
                  <div className="w-full mt-3 sm:mt-0 sm:w-auto mr-auto">
                    <div className=" text-xs mr-auto ">
                      <p className="text-base font-medium mb-[0..5rem]">
                        {el.fname} {el.lname}
                      </p>
                      <p className=" leading-5 text-[0.9rem]">{el.pow}</p>
                    </div>
                  </div>
                  {props.mid === el._id ? (
                    <IoMdCheckmark className="text-xl mr-1" />
                  ) : null}
                  <div className="flex items-center">
                    <Image src={LikedImg} className="mr-1" alt="liked-img" />
                    <p>{el.likes}</p>
                  </div>
                  {/* <p className="text-primary text-sm font-medium">Original</p> */}
                </div>
              ))}
          </div>
        </div>
        <div className="hidden des:block">
          <TrendingIdeas />
        </div>
      </div>
    </>
  );
};

export default ModifyIdeaGrid;
