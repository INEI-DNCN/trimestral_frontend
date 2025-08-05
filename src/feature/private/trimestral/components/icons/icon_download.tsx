import Lottie from "lottie-react";
import animationData from "./download.json";

interface IconDownloadProps {
  height?: number;
  width?: number;
}

const IconDownload = ({ height = 34, width = 34 }: IconDownloadProps) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ height, width }}
    />
  );
};

export default IconDownload;