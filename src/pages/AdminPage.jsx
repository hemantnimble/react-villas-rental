import React from 'react'
import SideBar from '../components/compAdminPage/SideBar'
import ControlPanel from '../components/compAdminPage/ControlPanel';
import '../css/adminPage.css'

// import NavBar from '../components/NavBar'


function AdminPage() {


    return (
        <>
            {/* <NavBar></NavBar> */}

            <div className='admin-main'>
                <SideBar></SideBar>
                <ControlPanel></ControlPanel>
            </div>
        </>
    )
}

export default AdminPage