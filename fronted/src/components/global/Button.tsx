import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  backgroundColor,
  borderColor,
   type
}) => {
  return (
    <button
      style={{
        backgroundColor,
        borderColor,
        border: `1px solid ${borderColor}`,
        
      }}
      className="text-white px-7 py-4 text-base font-bold rounded-[10px] w-full cursor-pointer "
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
