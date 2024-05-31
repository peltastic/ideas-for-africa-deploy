import React from "react";
import Button from "../Button/Button";

type Props = {};

const ShareIdeas = (props: Props) => {
  return (
    <section className="bg-butter py-32">
      <div className="w-[95%] xs:w-[80%] md:w-[60%] mm:w-[45%] mx-auto text-center">
        <h2 className="font-bold text-2xl xxs:text-3xl">
          Share your ideas and innovations with us. Together, let&apos;s shape the
          future.
        </h2>
        <Button
          classname="bg-primary text-gray7 mx-auto text-sm rounded-full border border-primary ml-3 py-[.6rem] px-6 mt-6"
        >
          Share an idea
        </Button>
      </div>
    </section>
  );
};

export default ShareIdeas;
