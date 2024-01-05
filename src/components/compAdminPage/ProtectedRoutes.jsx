import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loggedIn } from '../../features/users/userSlice';


function ProtectedRoutes(props) {
    const { Component } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function checkLoggedIn() {
        try {
            const response = await axios.get('http://localhost:3000/users/loggedin', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            if (data === true) {
                dispatch(loggedIn()); // Update Redux state
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking if the user is logged in:', error);
            navigate('/');
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return <Component />;
}

export default ProtectedRoutes;
