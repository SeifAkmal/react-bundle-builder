import React from 'react';

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  onClick,
  disabled = false
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'outline-purple';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const baseStyles = 'px-6 py-3 rounded-md font-semibold transition-colors duration-200 text-sm';
  
  const variantStyles = {
    'primary': 'bg-[#4f46e5] text-white hover:bg-[#4338ca] border border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
    'outline-purple': 'bg-transparent text-[#4f46e5] border border-[#4f46e5] hover:bg-[#e0e7ff] disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
