import Lottie from "lottie-react";
import animationData from "./loading_Estaditica.json"; // Ruta al archivo JSON

interface IconProps {
  height?: number;
  width?: number;
}


const LoadingEstaditica = ({ height = 34, width = 34 }: IconProps) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ height, width }}
    />
  );
};

export default LoadingEstaditica;