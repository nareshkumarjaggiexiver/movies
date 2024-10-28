import Button from "@/components/global/Button";
import Heading from "@/components/global/Heading";
import WaveImg from "/public/images/bottomVector.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen flex-col">
        <Heading>Your movie list is empty</Heading>
        <Link href="/signin" className="mt-12">
          <Button backgroundColor="var(--color-primary)">
            Add a new movie
          </Button>
        </Link>
      </div>
      <div>
      <Image
        src={WaveImg}
        alt="vector-bottom-wave"
        className="w-full fixed bottom-0"
      />
    </div>
    </div>
  );
}
