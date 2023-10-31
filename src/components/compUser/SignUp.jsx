import React from 'react';
import '../../css/login.css'
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser } from '../../features/users/userSlice';
import { useForm } from "react-hook-form";


function SignUp() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.error);
    const success = useSelector(state => state.users.success);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    return (
        <div className="form signup">
            <div>
                {success && (
                    <p style={{ color: 'green' }}>{success}</p>
                )}
                {error.type === 'email' && (
                    <p style={{ color: 'red' }}>Email Error: {error.message}</p>
                )}
                {error.type === 'phone' && (
                    <p style={{ color: 'red' }}>Phone Error: {error.message}</p>
                )}
                {error.type === 'unknown' && (
                    <p style={{ color: 'red' }}>Unknown Error: {error.message}</p>
                )}
                {/* other form fields */}
            </div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="form-content">
                <header>Create a New Account</header>
                <form noValidate onSubmit={handleSubmit(async (values) => {
                    try {
                        await dispatch(addNewUser(values));
                        // await alert('Successfully Registered...')
                    } catch (err) {
                        // Error will be handled via the Redux state, no need to manage it here in the catch block
                    }
                })}>
                    <div className="field input-field">
                        <input {...register('username', { required: "Please Enter Your Name" })} type="text" placeholder="Name" className="input" />
                        {errors.username && <p className='field-errors'>{errors.username.message}</p>}
                    </div>
                    <div className="field input-field">
                        <input {...register('email', {
                            required: "e-mail Required...!",
                            pattern: {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                message: "Invalid e-mail"
                            }
                        })} type="email" placeholder="Email" className="input" />
                        {errors.email && <p className='field-errors'>{errors.email.message}</p>}
                        {/* {error && (
                            <p className='field-errors'>{error}</p>
                        )} */}
                    </div>
                    <div className="field input-field">
                        <input {...register('password', {
                            required: "password Required...!",
                            pattern: {
                                // value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                message: `- at least 8 characters 
                                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                - Can contain special characters`
                            }
                        })} type="password" placeholder="Create password" className="password" />
                        {errors.password && <p className='field-errors'>{errors.password.message}</p>}
                    </div>
                    <div className="field input-field">
                        <input {...register('confirmpassword', {
                            required: "please re-enter password",
                            validate: (value, formValues) => value === formValues.password || 'password not matching'
                        })} type="password" placeholder="Confirm password" className="password" />
                        {errors.confirmpassword && <p className='field-errors'>{errors.confirmpassword.message}</p>}

                    </div>
                    <div className="field input-field">
                        <input  {...register('phonenum', { required: "Phone number required" })} type="number" placeholder="Phone Number" className="input" />
                        {errors.phonenum && <p className='field-errors'>{errors.phonenum.message}</p>}

                    </div>
                    <div className="field input-field">
                        <input  {...register('city', { required: "Please Enter City Name" })} type="text" placeholder="City/Region" className="input" />
                        {errors.city && <p className='field-errors'>{errors.city.message}</p>}

                    </div>
                    <div className="field button-field">
                        <button type='submit'>Create</button>
                    </div>
                    <div className="form-link">
                        <span>Already have an account? <Link to='/login' className="link login-link">Login</Link></span>
                    </div>
                </form>
            </div>
            <div className="line" />
            <div className="media-options">
                <a href="#" className="field facebook">
                    <i className="bx bxl-facebook facebook-icon" />
                    <span>Login with Facebook</span>
                </a>
            </div>
            <div className="media-options">
                <a href="#" className="field google">
                    <img src="#" alt="" className="google-img" />
                    <span>Login with Google</span>
                </a>
            </div>
        </div>
    )
}

export default SignUp