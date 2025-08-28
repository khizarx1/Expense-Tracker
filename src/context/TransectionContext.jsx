import { createContext, useEffect, useState } from "react";
import { firestore } from '../config/firebase';
import { collection, query, where, deleteDoc, doc, setDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";


export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.uid) return;
        setLoading(true);
        const q = query(collection(firestore, 'transactions'), where('createdBy.uid', '==', user.uid), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let array = [];
            querySnapshot.forEach((doc) => {
                array.push({ id: doc.id, ...doc.data() });
            });
            setTransactions(array);
            setLoading(false);
        }, (err) => {
            console.error('error fetching transection', err);
            toast.error('Error fetching transactions');
        });
        return () => unsubscribe();
    }, [user])

    // Add transaction
    const addTransaction = async (formData) => {
        setIsProcessing(true);
        try {
            await setDoc(doc(firestore, 'transactions', formData.id), formData);
        } catch (err) {
            console.error('error adding transection', err);
            toast.error('Error adding transaction');
        } finally {
            setIsProcessing(false);
        }
    }

    // Delete transaction
    const deleteTransaction = async (id) => {
        setLoading(true);

        try {
            await deleteDoc(doc(firestore, 'transactions', id));
        } catch (err) {
            console.error('error deleting transaction', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TransactionContext.Provider value={{ transactions, loading, isProcessing, deleteTransaction, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}
