import React, { useContext } from 'react'
import { TransactionContext } from '../../../context/TransectionContext'
import { Spin } from 'antd'
import { formatDate } from '../../../config/global';
import { AuthContext } from '../../../context/AuthContext';

function HistorySection() {

    const { user } = useContext(AuthContext);
    const { transactions, loading, deleteTransaction } = useContext(TransactionContext);

    const formattedTransactions = transactions.map((t) => ({
        ...t,
        formatDate: formatDate(t.createdAt),
        type: t.amount < 0 ? 'Expense' : 'Income',
        borderColor: t.amount < 0 ? 'border-red-600' : 'border-green-600',
        amountColor: t.amount < 0 ? 'text-red-600' : 'text-green-600',
    }));

    if (loading) return <div className='text-center pt-10'><Spin size='large' /></div>
    if (!user) return <p className='text-center text-xl font-semibold'>Please Login to see your Transactions</p>;
    if (!loading && transactions.length === 0) return <p className='text-center text-2xl font-semibold'>No transactions found</p>

    return (
        <div>
            <h2 className='text-xs font-bold'>Transaction History</h2>
            <ul className='py-4 text-xs'>
                {!loading && transactions.length > 0 && (
                    formattedTransactions.map((transaction, idx) => (
                        <li key={idx} className={`p-2 mb-2 bg-white rounded border-r-4 ${transaction.borderColor}`}>
                            <p className='font-semibold flex justify-between items-center'>
                                {transaction.type}
                                <span className='font-light text-gray-400'>{transaction.formatDate}</span>
                            </p>
                            <p className='pt-2 font-light flex justify-between'>{transaction.description} <span className={`text-sm font-bold ${transaction.amountColor}`}>{transaction.amount}</span></p>
                            <div className='text-end mt-2'><button onClick={() => deleteTransaction(transaction.id)} className='text-[10px] py-1 px-2 cursor-pointer rounded-full text-white bg-black font-bold'>Delete</button></div>
                        </li>
                    ))
                )}
            </ul >
        </div >
    )
}

export default HistorySection