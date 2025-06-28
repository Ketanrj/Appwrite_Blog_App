import React from 'react'

function Button({
    children,
    className = 'bg-black',
    ...props
}) {
  return (
    <button className={`mt-4 py-2 px-4 rounded-sm ${className} m-auto justify-center cursor-pointer`}  {...props}>
    {children}
    </button>
  )
}

export default Button