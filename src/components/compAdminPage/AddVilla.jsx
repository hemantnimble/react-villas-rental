import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice';
import { useForm } from "react-hook-form";
import axios from 'axios';
import NavAdmin from './NavAdmin';


function AddVilla() {

    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const [images, setimages] = useState(villaData);
    // console.log(images)



    function handleImgChange(e) {
        setimages(e.target.files);
    }

    async function OnSubmit(values) {
        if (values == '') {
            alert("Enter Information")
        }
        else {
            const formdata = new FormData();

            // Append individual form fields
            formdata.append('name', values.name);
            formdata.append('bhk', values.bhk);
            formdata.append('capacity', values.capacity);
            formdata.append('price', values.price);
            formdata.append('driveLink', values.driveLink);

            // Append each image separately
            for (let i = 0; i < images.length; i++) {
                formdata.append('images', images[i]);
            }
            await dispatch(addNewVilla(formdata));
            await dispatch(fetchAsync());
            console.log(formdata)
        }
    }


    return (
        <>
            {/* <NavAdmin></NavAdmin> */}
            {/* <div className="container">
                <h1>Add Villa</h1>
                <form className="input-field fields" >
                    <input type="text" placeholder="Villa Name" />
                    <input  type="text" placeholder="Bhk?" />
                    <input  type="text" placeholder="Capacity" />
                    <input  type="text" placeholder="Price" />
                    <input  type="text" placeholder="Drive Link" />
                    <button type="submit">Add Villa</button>
                </form>
            </div> */}
            <div className="container">
                <header>Add New Villa/Property</header>
                <form noValidate onSubmit={handleSubmit(OnSubmit)} encType="multipart/form-data">
                    <div className="fields">
                        <div className="input-field">
                            <label>Name/title</label>
                            <input  {...register('name', { required: "Please Enter  Name" })} type="text" placeholder="Enter villa name" required />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        {/* <div className="input-field">
                            <label>Check-in time</label>
                            <input type="text" placeholder="Enter check-in time" required />
                        </div>
                        <div className="input-field">
                            <label>Check-out time</label>
                            <input type="text" placeholder="Enter check-out time" required />
                        </div> */}
                        <div className="input-field">
                            <label>Bhk</label>
                            <input {...register('bhk', { required: "Please Enter number od Bhk" })} type="number" placeholder="Enter number of bedrooms" required />
                            {errors.bhk && <p>{errors.bhk.message}</p>}
                        </div>
                        {/* <div className="input-field">
                            <label>Bathrooms</label>
                            <input type="number" placeholder="Enter number of bathrooms" required />
                        </div>
                        <div className="input-field">
                            <label>Halls</label>
                            <input type="number" placeholder="Enter number of halls" required />
                        </div> */}
                        <div className="input-field">
                            <label>Guests capacity(format: 10-12)</label>
                            <input {...register('capacity', { required: "Please Enter Your Name" })} type="text" placeholder="Enter number capacity of guests" required />
                        </div>
                        <div className="input-field">
                            <label>Price (Weekends)</label>
                            <input {...register('price', { required: "Please Enter Your Name" })} type="number" placeholder="Enter price for weekends" required />
                        </div>
                        <div className="input-field">
                            <label>Images</label>
                            <input name='images' type="file" multiple onChange={handleImgChange} />
                        </div>
                        {/* <div className="input-field">
                            <label>Price (Weekdays)</label>
                            <input type="number" placeholder="Enter price for weekdays" required />
                        </div>
                        <div className="input-field">
                            <label>Above these guests</label>
                            <input type="number" placeholder="Enter number of pople" required />
                        </div>
                        <div className="input-field">
                            <label>Description/about</label>
                            <input type="text" placeholder="Enter description" required />
                        </div>
                        <div className="input-field">
                            <label>Location in words</label>
                            <input type="text" placeholder="Enter location in words" required />
                        </div> */}
                        <div className="input-field">
                            <label>Maps link</label>
                            <input {...register('driveLink', { required: "Please Enter Your Name" })} type="text" placeholder="Enter google maps location link" required />
                        </div>
                        {/* <div className="input-field">
                            <label>Gender</label>
                            <select required>
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="checkbox-wrapper-16">
                            <label className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={192} height={192} fill="currentColor" viewBox="0 0 256 256">
                                            <rect width={256} height={256} fill="none" />
                                            <polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                            <polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                            <line x1={16} y1={104} x2={240} y2={104} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Sketch</span>
                                </span>
                            </label>
                        </div> */}

                    </div>
                    <button type='submit' className="nextBtn">
                        <span className="btnText">Add</span>
                        <i className="uil uil-navigator" />
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddVilla

