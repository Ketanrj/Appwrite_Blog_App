import React, { forwardRef, useId } from 'react';

const Input = forwardRef(function Input(props, ref) {
    const { label, className = "", placeholder, type = "text", ...rest } = props;
    const id = useId();

    return (
        <div className={`w-full`}>
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className={`mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                placeholder={placeholder}
                type={type}
                ref={ref}
                id={id}
                {...rest}
            />
        </div>
    );
});

export default Input;
