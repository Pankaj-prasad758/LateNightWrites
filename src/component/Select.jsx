import React, {useId} from 'react'


function Select({
    //options give you an array
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        >
            {options?.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ) )}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)