import React, {useId} from 'react'

function SelectField({
    options,
    label,
    className = "",
    ...props
}, ref) {

    const id = useId();

  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''> {label} </label>}      
        <select 
        {...props} 
        id={props}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black
        outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {/* this is the syntax of optional looping where we loop it options are present also to avoid crash where their is no options values */}
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(SelectField)
// another way of writting the forward ref
