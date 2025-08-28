import React from 'react'
import DashboardNavbar from '../../Header/DashboardNavbar'
import BalanceSection from './BalanceSection'
import HistorySection from './HistorySection'

function index() {
    return (
        <div className='min-h-screen bg-[#F6F6F6]'>
            <DashboardNavbar />
            <div className='p-4 flex flex-col gap-6'>
                <h1 className='text-xl font-semibold text-center'>Expense Tracker</h1>
                <BalanceSection />
                <HistorySection />
            </div>
        </div>
    )
}

export default index