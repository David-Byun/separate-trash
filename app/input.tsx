import { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
}

export default function Input({
  name,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <input
        {...rest}
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 transition focus:ring-green-500 border-none placeholder:text-neutral-400 pl-2 "
      ></input>
    </div>
  );
}
