import React from "react";

type Props = {
  pitches?: { step: string }[] ;
};

const Steps = (props: Props) => {
  return (
    <div className="">
      {props.pitches ? (
        <div className="">
          {props.pitches.map((el, index) => (
            <div className="flex items-start mb-5" key={el.step}>
              <p className="mr-2 w-[10rem] font-medium">Step {index + 1}:</p>
              <p>{el.step}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          Looks like there&apos;s nothing here yet. Hang tight, we&apos;re working on it!
        </p>
      )}
    </div>
  );
};

export default Steps;
