import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';

export const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: null };

const reducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { isAuthenticated: true, user: action.payload.user };
        case 'LOGOUT':
            return { isAuthenticated: false, user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'LOGIN', payload: { user } })
            } else {
                console.log('user is signed out');
                dispatch({ type: 'LOGOUT' })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
