import React, { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <>
      <h2 className="md:text-5xl text-2xl font-semibold text-white">{children}</h2>
    </>
  );
};

export default Heading;
