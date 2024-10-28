import React from "react";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  releaseYear: number;
  imageSrc: string;
  alt: string;
}



const MovieCard:React.FC<MovieCardProps> = ({
  title,
  releaseYear,
  imageSrc,
  alt,
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-[var(--color-card-color)]">
      <div className="flex flex-col justify-between flex-1 ">
        <div className="flex flex-col justify-between flex-1 p-3 ">
          <div className="relative w-full md:h-[400px] h-[264px] ">
          <Image src={imageSrc} alt={alt} className="rounded-lg object-cover" layout="fill" />
          </div>
        </div>
        <div className="flex items-center px-3 py-4 bg-var--color-card-color">
          <div className="ml-3">
            <p className="text-xl font-medium leading-5 text-white mb-4">
              {title}
            </p>
            <p className="mt-1 text-white text-sm">{releaseYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
