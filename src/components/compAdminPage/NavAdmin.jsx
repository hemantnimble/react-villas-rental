import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/users/userSlice';
import toast from 'react-hot-toast';


function NavAdmin() {
    const status = useSelector(state => state.users.status);
    const error = useSelector(state => state.users.errorlogout)
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Modal = () => {
        return <div className="admin-modal">
            <div className="admin-modal-nav">
                <ul>
                    <li><Link to='/admin'><i className="fa-solid fa-grip"></i>Dashboard</Link></li>
                    <li><Link to='/admin/add'><i className="fa-solid fa-plus" />Add new Villa</Link></li>
                    <li onClick={handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</li>
                </ul>
                <div className="admin-nav-arrow"></div>
            </div>
        </div>
    }

    function handleModal() {
        setModal((prevState) => !prevState); // Toggle the modal state
    }
    async function handleLogOut() {
        await dispatch(logOut());
    }

    useEffect(() => {
        if (status === 'logoutfulfilled') {
            toast.success('Logout successful');
            navigate('/');
        } else if (status === 'logoutrejected' && status==='logoutloading' ) {
            toast.error('Error Logging out..!');
        }
    }, [status, navigate]);;

    return (
        <div className="admin-nav-wrapper">
            <nav>
                <div className="admin-details">
                    <label className="admin-nav-logo"><Link to='/'><img src="/Images/Logo/logoloc.png" alt="logo" />Villas Rental</Link></label>
                    <label className="dashboard"><Link to='/admin'><i className="fa-solid fa-grip"></i>Dashboard</Link></label>
                    <label className="addvilla"><Link to='/admin/add'><i className="fa-solid fa-plus" />Add new Villa</Link></label>
                    <label className='logoutbtn' onClick={handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</label>
                </div>
                <div className="admin-img">
                    <img onClick={handleModal} src="/Images/thumbnails/admin2.png" alt="admin" />
                    {modal && <Modal />}
                </div>
            </nav>
        </div>
    )
}

export default NavAdmin