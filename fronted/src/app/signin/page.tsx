"use client";
import React from 'react'
import Image from "next/image";
import WaveImg from "/public/images/bottomVector.png";
import SignupForm from '@/components/form/SignupForm';

export default function page() {
  return (
    <div>
      <SignupForm />
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
