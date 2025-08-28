import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input'
import Button from '../../components/Button'
import { toast } from 'react-toastify';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

function Login() {
    const initialState = {
        email: '',
        password: ''
    };

    const inputs = [
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
        { label: 'Password', type: 'password', name: 'password', placeholder: 'Enter your password' },
    ]

    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        setIsProcessing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                setState(initialState);
                navigate('/Dashboard');
            }).catch((err) => {
                console.error('Error logging in:', err);
                toast.error('Invalid email or password');
                return;
            }).finally(() => {
                setIsProcessing(false);
            })
    }

    return (
        <div className='w-full h-screen px-4 flex-1 flex flex-col justify-center bg-[#F6F6F6]'>
            <h2 className='pb-4 text-2xl font-bold text-center'>Login Form</h2>
            <form onSubmit={handleSubmit} className='w-full grid grid-cols-1 gap-2'>
                {inputs.map((input, idx) => (
                    <Input key={idx} span={input.span} onChange={handleChange} value={state[name]} label={input.label} type={input.type} name={input.name} placeholder={input.placeholder} />
                ))}
                <Button isProcessing={isProcessing} text={'Login'} />
                <div className='flex justify-between items-center text-sm'>
                    <p>Don't have an account?</p>
                    <Link to={'/Authentication/Register'} className='underline'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login