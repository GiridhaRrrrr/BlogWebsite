// import React from 'react'

// function Button({
//     children,
//     type = 'button',
//     bgColor = 'bg-blue-600',
//     textColor = 'text-white',
//     className = "",
//     ...props
// }) {
//   return (
//     <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `
//     } {...props}>
//         {children}      
//     </button>
//   )
// }

// export default Button

import React from 'react';
import { motion } from 'framer-motion';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = "",
  disabled = false,
  icon = null,
  iconPosition = "left",
  size = "md",
  variant = "filled",
  rounded = "md",
  loading = false,
  loadingText = "Processing...",
  onClick,
  ...props
}) {
  // Handle size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-2.5 text-lg",
    xl: "px-8 py-3 text-xl"
  };

  // Handle rounded classes
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  };

  // Handle variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case 'outlined':
        return `border-2 border-current bg-transparent hover:bg-opacity-10 ${textColor || `text-${bgColor.replace('bg-', '')}`}`;
      case 'ghost':
        return `bg-transparent hover:bg-opacity-10 ${textColor || `text-${bgColor.replace('bg-', '')}`}`;
      case 'filled':
      default:
        return `${bgColor} ${textColor} hover:opacity-90`;
    }
  };

  // Disabled classes
  const disabledClasses = disabled || loading ? 
    "opacity-60 cursor-not-allowed" : 
    "transform active:scale-95 transition-transform duration-75";

  return (
    <motion.button
      type={type}
      className={`
        flex items-center justify-center font-medium
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-blue-500
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${getVariantClasses()}
        ${disabledClasses}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}

export default Button;
