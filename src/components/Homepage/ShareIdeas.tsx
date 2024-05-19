import React from "react";
import Button from "../Button/Button";

type Props = {};

const ShareIdeas = (props: Props) => {
  return (
    <section className="bg-butter py-32">
      <div className="w-[45%] mx-auto text-center">
        <h2 className="font-bold text-2xl">
          Share your ideas and innovations with us. Together, let's shape the
          future.
        </h2>
        <Button
          classname="bg-primary text-gray7 mx-auto text-xs rounded-full border border-primary ml-3 py-[.6rem] px-6 mt-6"
          clicked={() => {}}
        >
          Share an idea
        </Button>
      </div>
    </section>
  );
};

export default ShareIdeas;
