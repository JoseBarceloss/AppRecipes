import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      { ...rest }
    >
      {children}
    </button>
  );
}
