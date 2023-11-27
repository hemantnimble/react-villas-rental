import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';


function NavAdmin() {
    const [modal, setModal] = useState(false);


    const Modal = () => {
        return <div className="admin-modal">
            <ul>
                <li><Link to='/admin'><i className="fa-solid fa-grip"></i>Dashboard</Link></li>
                <li><Link to='/admin/add'><i className="fa-solid fa-plus" />Add new Villa</Link></li>
                <li><Link to='/'><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link></li>
            </ul>
            <div className="admin-nav-arrow"></div>
        </div>
    }

    function handleModal() {
        setModal(true)
    }

    return (
        <div className="admin-nav-wrapper">
            <nav>
                <div className="admin-details">
                    <label className="admin-nav-logo"><Link to='/'><img src="Images/Logo/logoloc.png" alt="logo" />Villas Rental</Link></label>
                    <label className="dashboard"><Link to='/admin'><i className="fa-solid fa-grip"></i>Dashboard</Link></label>
                    <label className="addvilla"><Link to='/admin/add'><i className="fa-solid fa-plus" />Add new Villa</Link></label>
                </div>
                <div className="admin-img">
                    <img onClick={handleModal} src="Images/thumbnails/admin2.png" alt="admin" />
                    {modal && <Modal />}
                </div>
            </nav>
        </div>
    )
}

export default NavAdmin