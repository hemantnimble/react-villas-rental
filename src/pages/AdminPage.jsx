import React from 'react'
import ControlPanel from '../components/compAdminPage/ControlPanel';
import '../css/adminPage.css'
import NavAdmin from '../components/compAdminPage/NavAdmin';
import { useEffect } from 'react';


function AdminPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }
    ), []

    return (
        <>
            <NavAdmin></NavAdmin>
            <div className="admin-page">
                <ControlPanel></ControlPanel>
            </div>
        </>
    )
}

export default AdminPage

