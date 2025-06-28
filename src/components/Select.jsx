import React, { useId } from 'react'

function Select(props, ref) {
    const id = useId();
    const { label, options, className,} = props;
    return (
    <div className='w-full mt-8'>
        {label && <label className=''>{label}</label>}
        <select name="" id={id} {...props} ref={ref} className={`px-3 py-2 rounded-lg bg-white focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
            {options?.map((option, index) =>(
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select);
