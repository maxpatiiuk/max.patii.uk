import React from 'react';

const baseButtonStyle =
  'inline-flex px-4 py-2 rounded-md sm:text-sm' + ' sm:w-auto text-gray-700';

interface ButtonProps {
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  extraStyles?: string;
  baseStyles?: string;
}

function Button({
  children,
  props = {},
  baseStyles = '',
  extraStyles = '',
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${baseStyles} ${baseButtonStyle} ${extraStyles}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonDanger({ children, ...props }: ButtonProps) {
  return (
    <Button baseStyles={'bg-red-600 hover:bg-red-700'} {...props}>
      {children}
    </Button>
  );
}
