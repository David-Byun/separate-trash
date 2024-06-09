import { ButtonHTMLAttributes, RefObject } from 'react';

interface ButtonProps {
  text: string;
  ref?: RefObject<HTMLButtonElement>;
  id?: string;
}

export default function Button({ text, ref, id }: ButtonProps) {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed "
      ref={ref}
      id={id}
    >
      {text}
    </button>
  );
}
