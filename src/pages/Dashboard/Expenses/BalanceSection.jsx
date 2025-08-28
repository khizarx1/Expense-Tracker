import React, { useContext, useMemo } from 'react'
import { TransactionContext } from '../../../context/TransectionContext'
import { AuthContext } from '../../../context/AuthContext';

function BalanceSection() {

    const { transactions } = useContext(TransactionContext);
    const { user } = useContext(AuthContext);

    const { balance, income, expense } = useMemo(() => {
        let balance = 0;
        let income = 0;
        let expense = 0;
        if (!user) return { balance, income, expense };

        transactions.forEach((t) => {
            if (t.amount > 0) income += t.amount;
            if (t.amount < 0) expense += Math.abs(t.amount);
            balance += t.amount;
        })
        return { balance, income, expense };
    }, [transactions]);

    return (
        <div className='sticky left-0 top-14 bg-gray-100'>
            <h2 className='text-xs font-semibold'>YOUR BALANCE</h2>
            <p className='pb-4 text-2xl font-bold'>${balance}</p>
            <div className='py-6 px-10 flex justify-between items-center bg-white rounded-lg shadow-lg'>
                {/* income */}
                <div className='font-semibold text-center'>
                    <p className='text-xs'>INCOME</p>
                    <p className='text-lg text-green-600'>${income}</p>
                </div>
                {/* divider */}
                <div className='h-10 border border-gray-300'></div>
                {/* expense */}
                <div className='font-semibold text-center'>
                    <p className='text-xs'>EXPENSE</p>
                    <p className='text-lg text-red-600'>${expense}</p>
                </div>
            </div>
        </div>
    )
}

export default BalanceSection