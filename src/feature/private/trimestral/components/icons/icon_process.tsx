import Lottie from "lottie-react";
import animationData from "./icon_process.json";

interface IconProcessProps {
  height?: number;
  width?: number;
}

const IconProcess = ({ height = 34, width = 34 }: IconProcessProps) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ height, width }}
    />
  );
};

export default IconProcess;