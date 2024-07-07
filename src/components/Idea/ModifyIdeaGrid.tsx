import Image from "next/image";
import React from "react";
import ModifyIdeaImg from "/public/assets/auto_fix.svg";
import InfoImg from "/public/assets/info.svg";
import Avatar1 from "/public/assets/version-pfp-1.jpg";
import Avatar2 from "/public/assets/version-pfp-2.png";
import LikeImg from "/public/assets/unlike.svg";
import CancelSvg from "/public/assets/cancel2.svg";
import TrendingIdeas from "./TrendingIdeas";
import { useRouter } from "next/navigation";
import { formatNameRoute } from "@/utils/helperfunctions";

type Props = {
  closeVH: () => void;
  name: string;
  id: string;
};

const ModifyIdeaGrid = (props: Props) => {
  const router = useRouter();

  return (
    <div className="border h-screen des:h-auto rounded-md bg-white border-gray3 px-2 xxs:px-6">
      <div onClick={props.closeVH} className="my-8 flex des:hidden">
        <Image src={CancelSvg} alt="cancel-svg" className=" w-[1.2rem]" />
      </div>
      <div className="flex  justify-between items-center">
        <h1 className="text-black1 font-semibold text-lg">Version History</h1>
        <button
          onClick={() =>
            router.push(`/idea/${props.id}/${formatNameRoute(props.name)}/modify`)
          }
          className="flex items-center text-sm rounded-full px-4 py-2 my-6 bg-primary text-white border-primary border"
        >
          <Image src={ModifyIdeaImg} className="mr-2" alt="brainstorm svg" />
          <p>Modify idea</p>
        </button>
      </div>
      <div className="bg-amber-bg text-amber-dark flex flex-wrap xs:flex-nowrap px-5 py-3 gap-3 items-center justify-center rounded-lg">
        <Image src={InfoImg} alt="info-img" className="w-[2rem] xxs:w-[3rem]" />
        <p>
          Have a different perspective? Modify the original idea and share your
          thought process with fellow users.
        </p>
      </div>
      <div className="xxs:border my-6 border-gray3 rounded-md p-2 xxs:p-4">
        <div className="flex  py-4 px-4 rounded-md bg-gray3 items-center mb-4 ">
          <div className="mr-4 ">
            <Image src={Avatar1} alt="avatar" className="w-[3rem]" />
          </div>
          <div className="w-full mt-3 sm:mt-0 sm:w-auto mr-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="text-base font-medium mb-[0..5rem]">
                Demilade Odetara
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                C.E.O Pledre Solutions
              </p>
            </div>
          </div>
          <p className="text-primary text-sm font-medium">Original</p>
        </div>
        <div className="flex  py-4 px-4 rounded-md  items-center mb-4 ">
          <div className="mr-4 ">
            <Image src={Avatar2} alt="avatar" className="w-[3rem]" />
          </div>
          <div className="w-full mt-2 sm:mt-0 sm:w-auto mr-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="text-base font-medium mb-[0..5rem]">
                Demilade Odetara
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                C.E.O Pledre Solutions
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Image src={LikeImg} alt="avatar" className="w-[1.2rem] mr-1" />
            <p className="text-gray1">10</p>
          </div>
        </div>
        <div className="flex  py-4 px-4 rounded-md  items-center mb-4 ">
          <div className="mr-4 ">
            <Image src={Avatar2} alt="avatar" className="w-[3rem]" />
          </div>
          <div className="w-full mt-2 sm:mt-0 sm:w-auto mr-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="text-base font-medium mb-[0..5rem]">
                Demilade Odetara
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                C.E.O Pledre Solutions
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Image src={LikeImg} alt="avatar" className="w-[1.2rem] mr-1" />
            <p className="text-gray1">10</p>
          </div>
        </div>
        <div className="flex  py-4 px-4 rounded-md  items-center mb-4 ">
          <div className="mr-4 ">
            <Image src={Avatar2} alt="avatar" className="w-[3rem]" />
          </div>
          <div className="w-full mt-2 sm:mt-0 sm:w-auto mr-auto">
            <div className="text-black1 text-xs mr-auto ">
              <p className="text-base font-medium mb-[0..5rem]">
                Demilade Odetara
              </p>
              <p className="text-gray1 leading-5 text-[0.9rem]">
                C.E.O Pledre Solutions
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Image src={LikeImg} alt="avatar" className="w-[1.2rem] mr-1" />
            <p className="text-gray1">10</p>
          </div>
        </div>
      </div>
      <div className="hidden des:block">
        <TrendingIdeas />
      </div>
    </div>
  );
};

export default ModifyIdeaGrid;
