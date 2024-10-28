import Image from "next/image";
import React from "react";
import WaveImg from "/public/images/bottomVector.png";

const BottomWave = () => {
  return (
    <div>
      <Image
        src={WaveImg}
        alt="vector-bottom-wave"
        className="w-full"
      />
    </div>
  );
};

export default BottomWave;
