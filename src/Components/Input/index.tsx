import { InputHTMLAttributes } from 'react';

type InputProps = {
  labelText?: string,
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ labelText = '', ...rest }: InputProps) {
  return (
    <label>
      { labelText }
      <input
        { ...rest }
      />
    </label>
  );
}
