import React from 'react'
import ControlPanel from '../components/compAdminPage/ControlPanel';
import '../css/adminPage.css'
import NavAdmin from '../components/compAdminPage/NavAdmin';


function AdminPage() {

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

