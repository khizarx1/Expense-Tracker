import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './Authentication';
import Frontend from './Frontend';
import Dashboard from './Dashboard';

function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Frontend />} />
                <Route path="/Dashboard/*" element={<Dashboard />} />
                <Route path="/Authentication/*" element={<Authentication />} />
            </Routes>
        </BrowserRouter>
    )
}

export default index