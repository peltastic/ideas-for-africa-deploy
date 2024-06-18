import Image from 'next/image'
import React from 'react'
import ArrowFoward from "/public/assets/arrow_forward.svg";
import Trending from "/public/assets/trending.png";

type Props = {}

const TrendingIdeas = (props: Props) => {
  return (
    <div>
        <h1 className="font-semibold text-lg">Trending ideas</h1>
      <div className="border-gray3 border py-4 px-4 rounded-lg my-4">
        <div className="flex items-center">
          <Image src={Trending} alt="avatar" className="w-[3rem] mr-6" />
          <div className="mr-auto w-[70%]">
            <p className="font-semibold text-sm">
              Green revolution. The scam and scum
            </p>
            <p className="text-xs text-gray1">Dr Ajibike Shola</p>
          </div>
          <div className="">
            <Image src={ArrowFoward} alt="avatar" className="w-[1.1rem]" />
          </div>
        </div>
      </div>
      <div className="border-gray3 border py-4 px-4 rounded-lg my-4">
        <div className="flex items-center">
          <Image src={Trending} alt="avatar" className="w-[3rem] mr-6" />
          <div className="mr-auto w-[70%]">
            <p className="font-semibold text-sm">
              Green revolution. The scam and scum
            </p>
            <p className="text-xs text-gray1">Dr Ajibike Shola</p>
          </div>
          <div className="">
            <Image src={ArrowFoward} alt="avatar" className="w-[1.1rem]" />
          </div>
        </div>
      </div>
      <div className="border-gray3 border py-4 px-4 rounded-lg my-4">
        <div className="flex items-center">
          <Image src={Trending} alt="avatar" className="w-[3rem] mr-6" />
          <div className="mr-auto w-[70%]">
            <p className="font-medium text-sm">
              Green revolution. The scam and scum
            </p>
            <p className="text-xs text-gray1">Dr Ajibike Shola</p>
          </div>
          <div className="">
            <Image src={ArrowFoward} alt="avatar" className="w-[1.1rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingIdeas