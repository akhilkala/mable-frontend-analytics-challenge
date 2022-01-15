import React, { ReactElement } from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Loading(): ReactElement {
  return <Lottie options={defaultOptions} height={400} width={400} />;
}
