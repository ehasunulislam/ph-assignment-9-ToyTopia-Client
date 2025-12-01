import React from "react";
import { assets } from "../../assets/assets";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={assets.loading}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Loading;
