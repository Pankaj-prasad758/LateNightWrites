import React from 'react'

function Button({
    children,
    bgColour = "bg-blue-600",
    textColor = "text-white",
    type = "button",
    className = "",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColour} ${textColor}`} {...props}>
        {children}
    </button>
  )
}

export default Button