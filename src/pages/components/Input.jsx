import React from 'react'

function Input({label, type, name, placeholder, onChange, customClass, span, value }) {
    return (
        <>
            <label htmlFor={name} className='font-bold'>{label} <span className='text-xs block font-semibold'>{span}</span></label>
            <input onChange={onChange} value={value} className={`p-2 border border-gray-300 bg-white text-sm rounded-lg outline-0 ${customClass}`} type={type} id={name} name={name} placeholder={placeholder}/>
        </>
    )
}

export default Input