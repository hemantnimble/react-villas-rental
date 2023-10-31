import React from 'react';
import '../css/userPanel.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserAsync } from '../features/users/userSlice';
import { useParams } from 'react-router-dom';



const UserPanel = () => {
    const { id } = useParams();
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUserAsync());
        }
    }, [dispatch]);

    

    return (
        <div>
            <header>
                <h1>Villas Rental</h1>
            </header>
            <nav>
                <a href="#">Trips</a>
                <a href="#">Wishlist</a>
                {/* <a href="#"></a> */}
                <a href="#">Logout</a>
            </nav>
            <div className="user-dashboard">
                <h2>Welcome, User!</h2>

                {/* User Profile Section */}
                <div className="user-profile">
                    <h3>Your Profile</h3>
                    <p>Name: John Doe</p>
                    <p>Email: john@example.com</p>
                    {/* Add more profile information here */}
                </div>

                {/* User's Villas Section */}
                <div className="user-villas">
                    <h3>Rented Villas</h3>
                    {villaData.map((data, _id) => (
                        <div key={data._id}>
                            <h3>{data.name} <button>Cancel Booking</button></h3>

                        </div>
                    ))}
                    {/* List user's villas here */}
                </div>
                <Link to='/'>
                    <button className="btn">Rent a Villa</button>
                </Link>
                <button className="btn">Edit Profile</button>
            </div>
        </div>
    );
}

export default UserPanel;
