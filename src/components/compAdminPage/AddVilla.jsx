import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import NavAdmin from './NavAdmin';
import { useNavigate } from 'react-router-dom';


function AddVilla() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [images, setimages] = useState(villaData);
    const [imagePreviews, setImagePreviews] = useState([]);

    function handleImgChange(e) {
        setimages(e.target.files);

        const previews = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previews.push(event.target.result);
                setImagePreviews([...previews]);
            };
            reader.readAsDataURL(e.target.files[i]);
        }
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
            formdata.append('weekendprice', values.weekendprice);
            formdata.append('weekdayprice', values.weekdayprice);
            formdata.append('drivelink', values.drivelink);
            formdata.append('halls', values.halls);
            formdata.append('checkin', values.checkin);
            formdata.append('checkout', values.checkout);
            formdata.append('baths', values.baths);
            formdata.append('aboveguests', values.aboveguests);
            formdata.append('description', values.description);
            formdata.append('location', values.location);
            formdata.append('mapslink', values.mapslink);

            // Append each image separately
            // for (let i = 0; i < images.length; i++) {
            //     formdata.append('images', images[i]);
            // }

            // Append selected amenities
            formdata.append('amenities.wifi', values.wifi === true ? 'true' : 'false');
            formdata.append('amenities.tv', values.tv === true ? 'true' : 'false');
            // formdata.append('amenities', JSON.stringify({ wifi: values.wifi === true, tv: values.tv === true }));

            // Find the index of the checked image
            const checkedImageIndex = imagePreviews.findIndex((preview, index) => {
                return document.querySelectorAll('.image-preview-container input[type="checkbox"]')[index].checked;
            });

            // If at least one image is checked, move the checked image to the front
            if (checkedImageIndex !== -1) {
                const checkedImage = images[checkedImageIndex];
                formdata.append('images', checkedImage);

                // Create a copy of the images array and remove the checked image from the copy
                const updatedImages = [...images];
                updatedImages.splice(checkedImageIndex, 1);

                // Update the state with the new array
                setimages(updatedImages);
            }

            // Append the rest of the images
            for (let i = 0; i < images.length; i++) {
                formdata.append('images', images[i]);
            }


            await dispatch(addNewVilla(formdata));
            await dispatch(fetchAsync());

            navigate('/admin')
        }
    }

    return (
        <>
            <NavAdmin></NavAdmin>
            <div className="container">
                <header>Add New Villa/Property</header>
                <form noValidate onSubmit={handleSubmit(OnSubmit)} encType="multipart/form-data">
                    <div className="fields">
                        <div className="input-field">
                            <label>Name/title</label>
                            <input {...register('name', { required: "Please Enter Name" })} type="text" placeholder="Enter villa name" required />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Check-in time</label>
                            <input {...register('checkin', { required: "Please Enter Check-In Time" })} type="number" placeholder="Enter check-in time" required />
                            {errors.checkin && <p>{errors.checkin.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Check-out time</label>
                            <input {...register('checkout', { required: "Please Enter Check-Out Time" })} type="number" placeholder="Enter check-out time" required />
                            {errors.checkout && <p>{errors.checkout.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Bhk</label>
                            <input {...register('bhk', { required: "Please Enter Number of Bhk" })} type="number" placeholder="Enter number of bedrooms" required />
                            {errors.bhk && <p>{errors.bhk.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Bathrooms</label>
                            <input {...register('baths', { required: "Please Enter Number of Bathrooms" })} type="number" placeholder="Enter number of bathrooms" required />
                            {errors.baths && <p>{errors.baths.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Halls</label>
                            <input {...register('halls', { required: "Please Enter Number of Halls" })} type="number" placeholder="Enter number of halls" required />
                            {errors.halls && <p>{errors.halls.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Guests capacity(format: 10-12)</label>
                            <input {...register('capacity', { required: "Please Enter Guests Capacity" })} type="text" placeholder="Enter number capacity of guests" required />
                            {errors.capacity && <p>{errors.capacity.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Price (Weekends)</label>
                            <input {...register('weekendprice', { required: "Please Enter Weekend Price" })} type="number" placeholder="Enter price for weekends" required />
                            {errors.weekendprice && <p>{errors.weekendprice.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Price (Weekdays)</label>
                            <input {...register('weekdayprice', { required: "Please Enter Weekdays Price" })} type="number" placeholder="Enter price for weekdays" required />
                            {errors.weekdayprice && <p>{errors.weekdayprice.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Above these guests</label>
                            <input {...register('aboveguests', { required: "Please Enter Number of People" })} type="number" placeholder="Enter number of people" required />
                            {errors.aboveguests && <p>{errors.aboveguests.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Description/about</label>
                            <input {...register('description', { required: "Please Enter Description" })} type="text" placeholder="Enter description" required />
                            {errors.description && <p>{errors.description.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Location in words</label>
                            <input {...register('location', { required: "Please Enter Location in Words" })} type="text" placeholder="Enter location in words" required />
                            {errors.location && <p>{errors.location.message}</p>}
                        </div>

                        <div className="input-field">
                            <label>Maps link</label>
                            <input {...register('mapslink', { required: "Please Enter Google Map Link" })} type="text" placeholder="Enter Google Maps location link" required />
                            {errors.mapslink && <p>{errors.mapslink.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Drive link</label>
                            <input {...register('drivelink', { required: "Please Enter Google Drive Link" })} type="text" placeholder="Enter Google Drive link" required />
                            {errors.drivelink && <p>{errors.drivelink.message}</p>}
                        </div>

                        {/* <div className="input-field">
                            <label>Gender</label>
                            <select required>
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div> */}
                        <div className="checkbox-wrapper-16">
                            <label className="checkbox-wrapper">
                                <input  {...register('wifi')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={192} height={192} fill="currentColor" viewBox="0 0 256 256">
                                            <rect width={256} height={256} fill="none" />
                                            <polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                            <polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                            <line x1={16} y1={104} x2={240} y2={104} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Wifi</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('tv')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={192} height={192} fill="currentColor" viewBox="0 0 256 256">
                                            <rect width={256} height={256} fill="none" />
                                            <polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                            <polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                            <line x1={16} y1={104} x2={240} y2={104} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Tv</span>
                                </span>
                            </label>
                        </div>
                        <div className="input-field">
                            <label>Images</label>
                            <input name='images' type="file" multiple onChange={handleImgChange} />
                        </div>
                        {/* Display selected image previews */}
                        <div className="image-preview-container">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="img-preview">
                                    <input type="checkbox" value="checked" />
                                    <img  src={preview} alt={`Preview ${index}`} className="image-preview" />
                                </div>
                            ))}
                        </div>
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

