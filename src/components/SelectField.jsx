// import React, {useId} from 'react'

// function SelectField({
//     options,
//     label,
//     className = "",
//     ...props
// }, ref) {

//     const id = useId();

//   return (
//     <div className='w-full'>
//         {label && <label htmlFor={id} className=''> {label} </label>}      
//         <select 
//         {...props} 
//         id={props}
//         ref={ref}
//         className={`px-3 py-2 rounded-lg bg-white text-black
//         outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//         >
//             {/* this is the syntax of optional looping where we loop it options are present also to avoid crash where their is no options values */}
//             {options?.map((option) => (
//                 <option key={option} value={option}>
//                     {option}
//                 </option>
//             ))}
//         </select>
//     </div>
//   )
// }

// export default React.forwardRef(SelectField)
// // another way of writting the forward ref

import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';

function SelectField({
  options = [],
  label,
  className = "",
  error = "",
  helpText = "",
  icon = null,
  placeholder = "Select an option",
  ...props
}, ref) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle options in different formats
  const normalizedOptions = options.map(option => {
    if (typeof option === 'object' && option !== null) {
      return option;
    }
    return { label: option, value: option };
  });
  
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-1.5 font-medium text-gray-700 dark:text-gray-300 text-sm"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">{icon}</span>
          </div>
        )}
        
        <select
          {...props}
          id={id}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            px-4 py-2.5 pr-10 rounded-lg
            border transition-all duration-200
            outline-none focus:ring-2 focus:ring-opacity-50
            w-full appearance-none
            ${icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10"
                : isFocused
                  ? "border-blue-500 focus:border-blue-500 focus:ring-blue-500 bg-blue-50 dark:bg-blue-900/10"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800"
            }
            text-gray-900 dark:text-white
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {normalizedOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`h-5 w-5 transition-colors duration-200 ${
              isFocused 
                ? "text-blue-500 dark:text-blue-400" 
                : error 
                  ? "text-red-500 dark:text-red-400" 
                  : "text-gray-400 dark:text-gray-500"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
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
}

export default React.forwardRef(SelectField);