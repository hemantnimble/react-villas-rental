import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes(props) {
    const { Component } = props;
    const admin = useSelector(state => state.users.admin)
    const navigate = useNavigate()
    useEffect(() => {
        if (admin === null) {
            navigate('/')
        }
    })
    return (
        <Component />
    )
}

export default ProtectedRoutes