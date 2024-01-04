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

            // console.log('All cookies:', document.cookie);
            // const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
            // console.log('Retrieved token:', token);

            // if (!token) {
            //     console.log('no token');
            //     navigate('/');
            //     return;
            // }
            // await dispatch(loggedIn(token))

            const response = await axios.get('http://localhost:3000/users/loggedin', {
                withCredentials: true, // Include credentials (cookies) in the request
                headers: {
                    'Content-Type': 'application/json',
                    // Other headers as needed
                },
            });

            const data = response.data;
            // console.log("store data:", data);

            if (data === true) {
                console.log('User is logged in');
                dispatch(loggedIn()); // Update Redux state

            } else {
                // User is not logged in, redirect them to the home page
                console.log('User is not logged in');
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking if the user is logged in:', error);

            // Handle error, e.g., redirect to the home page
            navigate('/');
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return <Component />;
}

export default ProtectedRoutes;
