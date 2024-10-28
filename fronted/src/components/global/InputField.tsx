import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  errorMessage?: string;
  name? : string
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
  errorMessage,
}) => {
  return (
    <div>
      <input
        className="block w-full sm:text-sm border-rounded bg bg-[var(--color-input-bg)] text-white px-4 py-4 hover:outline-none focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
