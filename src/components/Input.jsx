// import React, {useId} from 'react'

// const Input = React.forwardRef(function Input( 
//         {
//             label,
//             type = "text",
//             className = "",
//             ...props
//         },ref)  
//     {
//         const id = useId();
//         return (
//             <div className='w-full'>
//                 {label &&
//                  <label htmlFor={id} className='inline-block mb-1 pl-1'>
//                     {label}
//                 </label>}            
//                 <input 
//                 type={type}
//                 className={`px-3 py-2 rounded-lg bg-white text-black
//                 outline-none focus:bg-gray-50duration-200 border-grey-200 w-full
//                  ${className}`}  
//                  ref={ref}
//                  id={id}  
//                  {...props}                              
//                 />
//             </div>
//         )
//     }
    
//     )

// export default Input

import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    containerClassName = "",
    labelClassName = "",
    error = "",
    icon = null,
    iconPosition = "left",
    helpText = "",
    showPasswordToggle = false,
    ...props
  }, ref
) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine actual input type for password fields
  const actualType = showPasswordToggle && type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;

  // Handle input focus
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Determine input state classes (error, focused, etc)
  const getInputStateClasses = () => {
    if (error) return "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50";
    if (isFocused) return "border-blue-500 focus:border-blue-500 focus:ring-blue-500 bg-blue-50 dark:bg-blue-900/10";
    return "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800";
  };

  return (
    <motion.div 
      className={`w-full ${containerClassName}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={id} 
          className={`block mb-1.5 font-medium text-gray-700 dark:text-gray-300 text-sm ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">{icon}</span>
          </div>
        )}
        
        <input
          type={actualType}
          className={`
            px-4 py-2.5 rounded-lg
            border transition-all duration-200
            outline-none focus:ring-2 focus:ring-opacity-50
            w-full
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${(showPasswordToggle || (icon && iconPosition === "right")) ? "pr-10" : ""}
            ${getInputStateClasses()}
            dark:text-white
            ${className}
          `}
          ref={ref}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {icon && iconPosition === "right" && !showPasswordToggle && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">{icon}</span>
          </div>
        )}
        
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p 
          className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}
    </motion.div>
  );
});

export default Input;
