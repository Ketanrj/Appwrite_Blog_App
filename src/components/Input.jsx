import React from 'react'
import { forwardRef, useId } from 'react'

const Input = forwardRef ( function Input(prop, ref) {
    const { label, className, placeholder, type = "text", ...props} = prop;
    const id = useId();
    return(
        <div className={`w-full ${className}`}>
            {label && 
                <label className={`inline-block mb-1 pl`} htmlFor={id}>{label}</label>
            }
            <input className={`${className}`}
            placeholder={placeholder} type={type} ref={ref} id={id} {...props} />
        </div>
    )
})

export default Input;