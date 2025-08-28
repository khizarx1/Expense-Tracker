import React from 'react'
import { whiteSpinner } from '../components/WhiteSpinner'
import { Spin } from 'antd'

function Button({ text, onClick, isProcessing }) {

    return (
        <button onClick={onClick} className='mt-4 bg-black cursor-pointer font-semibold text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200'>{isProcessing ? <Spin indicator={whiteSpinner} /> : text}</button>

    )
}

export default Button