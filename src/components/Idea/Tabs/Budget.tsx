import React from "react";
import ArrowRight from "/public/assets/arrow_forward.svg"
import Image from "next/image";

type Props = {
  maxbud?: string;
  minbud?: string;
};

const Budget = (props: Props) => {
  return (
    <div>
      {!props.maxbud && !props.minbud ? (
        <div className="">
          <p className="text-center">
            Looks like there's nothing here yet. Hang tight, we're working on
            it!
          </p>
        </div>
      ) : (
        <div className="text-black2 flex justify-between">
        <div className="">
            <p>Estimate Budget <span className="text-black1 font-semibold">{props.minbud}</span></p>
           <p>(Minimum)</p> 
        </div>
        <Image src={ArrowRight} alt="arrow-right" className="w-[1.2rem]"  />
        <div className="">
            <p>Estimate Budget <span className="text-black1 font-semibold">{props.maxbud}</span></p>
            <p>(Maximum)</p>
        </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
