import Lottie from "lottie-react";
import animationData from "./icon_check.json";

interface IconCheckProps {
  height?: number;
  width?: number;
}

const IconCheck = ({ height = 34, width = 34 }: IconCheckProps) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ height, width }}
    />
  );
};

export default IconCheck;