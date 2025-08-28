import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Input from '../../components/Input'
import Button from '../../components/Button'
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore } from '../../../config/firebase';
import { auth } from '../../../config/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore/lite';

function Register() {

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const inputs = [
        { label: 'First Name', type: 'text', name: 'firstName', placeholder: 'Enter your firstname' },
        { label: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Enter your lastname' },
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email' },
        { label: 'Password', type: 'password', name: 'password', placeholder: 'Enter your password' },
    ]

    const { isAuthenticated, dispatch } = useContext(AuthContext);;
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const { firstName, lastName, email, password } = state;
        if (!firstName || !lastName || !email || !password) {
            toast.error('Please fill in all fields');
            setIsProcessing(false);
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                let user = userCredential.user;
                addDocument(user, firstName, lastName, email)
                toast.success('User registered successfully');
                dispatch({ type: 'LOGIN', payload: { user } })                
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                toast.error('Something went wrong, please try again');
            }).finally(() => {
                setIsProcessing(false);
                setState(initialState);
                navigate('/Authentication/Login');
            })
    }

    const addDocument = async (user, firstName, lastName) => {
        // Function to add user document to Firestore
        try {
            await setDoc(doc(firestore, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp()
            });
        }
        catch (error) {
            console.error(error)
            toast.error('Something went wrong, please try again');
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className='w-full h-screen px-4 flex-1 flex flex-col justify-center bg-[#F6F6F6]'>
            <h2 className='pb-4 text-2xl font-bold text-center'>Register Form</h2>
            <form onSubmit={handleSubmit} className='w-full grid grid-cols-1 gap-2'>
                {inputs.map((input, idx) => (
                    <Input key={idx} span={input.span} onChange={handleChange} value={state[input.name]} label={input.label} type={input.type} name={input.name} placeholder={input.placeholder} />
                ))}
                <Button isProcessing={isProcessing} text={'Register'} />
                <div className='flex justify-between items-center text-sm'>
                    <p>Already have an account?</p>
                    <Link to={'/Authentication/Login'} className='underline'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register