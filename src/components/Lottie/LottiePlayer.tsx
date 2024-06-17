import React from "react";
import Lottie, { Options } from "react-lottie";

type Props = {
  lottie: any;
};

const LottiePlayer = (props: Props) => {
  return (
    <Lottie
      options={{
        animationData: props.lottie,
        loop: true,
        autoplay: true,
      }}
    />
  );
};

export default LottiePlayer;
