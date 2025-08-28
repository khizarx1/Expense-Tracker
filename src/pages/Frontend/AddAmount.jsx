import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { TransactionContext } from '../../context/TransectionContext'
import Navbar from '../Header/FrontendNavbar'
import Input from '../components/Input'
import Button from '../components/Button'
import { toast } from 'react-toastify';
import '../../config/global'

import { serverTimestamp } from 'firebase/firestore'

function AddAmount() {

    const initialState = {
        amount: '',
        description: ''
    };

    const inputs = [
        { label: 'Amount', type: 'number', name: 'amount', placeholder: 'Enter your amount...', span: '(Negative for expenses, positive for income)' },
        { label: 'Description', type: 'text', name: 'description', placeholder: 'Enter description...' },
    ]

    const { user } = useContext(AuthContext);
    const { addTransaction, isProcessing } = useContext(TransactionContext);
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let { amount, description } = state;
        amount = Number(amount);

        if (amount === 0 || description.trim() === '') {
            toast.error('Please fill in all fields');
            return;
        }

        const formData = { amount, description }

        formData.id = window.getRandomId();
        formData.createdAt = serverTimestamp();
        formData.createdBy = {
            email: user.email,
            uid: user.uid
        }
        addTransaction(formData);
        setState(initialState);
    }

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='w-full px-4 flex-1 flex flex-col justify-center bg-[#F6F6F6]'>
                <h1 className='pb-6 text-xl font-bold text-center'>Add Transaction</h1>
                <form onSubmit={handleSubmit} className='w-full grid grid-cols-1 gap-2'>
                    {inputs.map((input, idx) => (
                        <Input key={idx} span={input.span} onChange={handleChange} value={state[input.name]} label={input.label} type={input.type} name={input.name} placeholder={input.placeholder} />
                    ))}
                    <Button isProcessing={isProcessing} text={'Add transaction'} />
                </form>
            </div>
        </div>
    )
}

export default AddAmount
