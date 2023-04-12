import React from 'react';

interface InputProps {
  value?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  onChange,
  disabled,
  value,
  type,
  placeholder,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      className='w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed'
    />
  );
};

export default Input;
