import React from "react";

import Image from "next/image";
import Avatar from "/public/assets/avatar.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  image: StaticImport;
};

const CarouselCard = (props: Props) => {
  return (
    <div className="relative">
      <Image src={props.image} alt="image" className="w-full" />
      <div className="absolute bottom-4 left-[50%] -translate-x-[47%] w-[95%] text-white">
        <h2 className="font-semibold mb-4">
          Energy generation for recycling rubber
        </h2>
        <h3 className="text-gray2 font-light mb-4">
          Users can submit their startup, for getting feedbacks, beta
          subscriptions, early adopters, traffic and users. In addition, they
          can also..
        </h3>
        <div className="flex items-center">
          <div className="mr-4">
            <Image src={Avatar} alt="avatar" />
          </div>
          <div className="text-sm ">
            <p className="font-semibold">Demilade Odetara</p>
            <p className="leading-5 text-gray2">CEO Pledre Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
