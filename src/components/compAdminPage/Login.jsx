import React, { useState } from 'react';
import '../../css/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/users/userSlice';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


function Login() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.errorlogin);
    const status = useSelector(state => state.users.status);
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    async function onSubmit(values) {
        await dispatch(login(values));
    }

    useEffect(() => {
        if (status === 'loginfulfilled') {
            toast.success('Login successful');
            navigate('/admin');
        } else if (status === 'loginrejected' && error.type && error.message) {
            toast.error(`${error.message}`);
        }
    }, [status, error, navigate]);;


    // console.log(errors)
    return (
        <>
            <div className="main-login">
                <div className='form-img'>
                    {/* <img src="Images/thumbnails/about.jpg" alt="" /> */}
                </div>
                <div className="form signup">
                    {/* {success && (<p style={{ color: 'green' }}>{success}</p>)} */}
                    {/* {error.type && (<p style={{ color: 'red' }}>Error: {error.message}</p>)} */}

                    <div className="form-content">
                        <header>LogIn</header>
                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <div className="field input-field">
                                <input {...register('email', {
                                    required: "e-mail Required...!",
                                    pattern: {
                                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                        message: "Invalid e-mail"
                                    }
                                })} type="email" placeholder={errors.email && errors.email.message ? errors.email.message : 'Email'} className="input" />
                                {errors.email && <p className='field-errors'>{errors.email.message}</p>}
                            </div>
                            <div className="field input-field">
                                <input {...register('password', {
                                    required: "password Required...!"
                                })} type="password" placeholder="Enter password" className="password" />
                                {errors.password && <p className='field-errors'>{errors.password.message}</p>}
                            </div>
                            <div className="field button-field">
                                <button type='submit'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login