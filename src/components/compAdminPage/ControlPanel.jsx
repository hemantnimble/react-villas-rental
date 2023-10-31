import React, { useEffect } from 'react';
import AddVilla from './AddVilla';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAsync } from '../../features/users/userSlice';

function ControlPanel() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(fetchUserAsync());
    }, [dispatch]);

    return (
        <>
            <div style={{ margin: "auto", marginLeft: "17rem", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <h1>ControlPanel</h1>
                <AddVilla></AddVilla>
                <Link to="/">
                    <button>Home Page</button>
                </Link>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ControlPanel;
