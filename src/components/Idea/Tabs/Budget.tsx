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
            Looks like there&apos;s nothing here yet. Hang tight, we&apos;re working on
            it!
          </p>
        </div>
      ) : (
        <div className="text-black2 flex flex-wrap sm:flex-nowrap gap-10">
        <div className="w-full sm:w-auto">
            <p>Estimate Budget <span className="text-black1 font-semibold">{props.minbud}</span></p>
           <p>(Minimum)</p> 
        </div>
        <Image src={ArrowRight} alt="arrow-right" className="w-[1.2rem] hidden sm:block"  />
        <div className="mt-9 sm:mt-0">
            <p>Estimate Budget <span className="text-black1 font-semibold">{props.maxbud}</span></p>
            <p>(Maximum)</p>
        </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
