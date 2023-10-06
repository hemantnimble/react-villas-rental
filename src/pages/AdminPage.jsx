import React from 'react'
import SideBar from '../components/compAdminPage/SideBar'
import ControlPanel from '../components/compAdminPage/ControlPanel'
// import NavBar from '../components/NavBar'


function AdminPage() {


    return (
        <>
            {/* <NavBar></NavBar> */}

            <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 100px" }}>
                <SideBar></SideBar>
                <ControlPanel></ControlPanel>
            </div>
        </>
    )
}

export default AdminPage