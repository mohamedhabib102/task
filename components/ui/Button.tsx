import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-[#ff7b00] text-white hover:bg-[#e66f00] shadow-md shadow-[#ff7b00]/20',
      secondary: 'bg-white text-gray-900 hover:bg-gray-100',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100/10 text-white',
      ghost: 'hover:bg-white/10 text-white',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-lg rounded-full',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
