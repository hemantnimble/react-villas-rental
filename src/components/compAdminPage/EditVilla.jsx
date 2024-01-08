import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import NavAdmin from './NavAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditVilla() {

    const status = useSelector(state => state.villaInfo.status);
    const { villaId } = useParams();
    const villaData = useSelector(state => state.villaInfo.villaInfo);
    const [selectedVilla, setSelectedVilla] = useState({});
    const baseURL = 'http://localhost:3000/';

    useEffect(() => {
        window.scrollTo(0, 0);

        if (villaId && villaData) {
            const singleVilla = Array.isArray(villaData) ? villaData.find((data) => data._id === villaId) : villaData;
            setSelectedVilla(singleVilla);
        }
    }, [villaId, villaData]);

    // console.log(selectedVilla.amenities.wifi)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setimages] = useState(villaData);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [checkedIndex, setCheckedIndex] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue, // Add this line to use setValue function
        formState: { errors },
    } = useForm()

    useEffect(() => {
        setValue('name', selectedVilla.name || '');
        setValue('checkin', selectedVilla.checkin || '');
        setValue('checkout', selectedVilla.checkout || '');
        setValue('checkin', selectedVilla.checkin || '');
        setValue('bhk', selectedVilla.bhk || '');
        setValue('baths', selectedVilla.baths || '');
        setValue('halls', selectedVilla.halls || '');
        setValue('capacity', selectedVilla.capacity || '');
        setValue('weekendprice', selectedVilla.weekendprice || '');
        setValue('weekdayprice', selectedVilla.weekdayprice || '');
        setValue('aboveguests', selectedVilla.aboveguests || '');
        setValue('description', selectedVilla.description || '');
        setValue('location', selectedVilla.location || '');
        setValue('mapslink', selectedVilla.mapslink || '');
        setValue('drivelink', selectedVilla.drivelink || '');
        // amenities 
        setValue('wifi', selectedVilla?.amenities?.wifi || false);
        setValue('tv', selectedVilla?.amenities?.tv || false);
        setValue('parking', selectedVilla?.amenities?.parking || false);
        setValue('pool', selectedVilla?.amenities?.pool || false);
        setValue('bathtub', selectedVilla?.amenities?.bathtub || false);
        setValue('kitchen', selectedVilla?.amenities?.kitchen || false);
        setValue('ac', selectedVilla?.amenities?.ac || false);
        setValue('geyser', selectedVilla?.amenities?.geyser || false);
        setValue('waterfilter', selectedVilla?.amenities?.waterfilter || false);
        setValue('lawn', selectedVilla?.amenities?.lawn || false);
        setValue('bbq', selectedVilla?.amenities?.bbq || false);
        setValue('speakers', selectedVilla?.amenities?.speakers || false);
        setValue('inverter', selectedVilla?.amenities?.inverter || false);
        setValue('bonfire', selectedVilla?.amenities?.bonfire || false);
        setValue('mtview', selectedVilla?.amenities?.mtview || false);
        setValue('gazebo', selectedVilla?.amenities?.gazebo || false);
        setValue('games', selectedVilla?.amenities?.games || false);
        setValue('fridge', selectedVilla?.amenities?.fridge || false);
        setValue('terrace', selectedVilla?.amenities?.terrace || false);
        setValue('barcounter', selectedVilla?.amenities?.barcounter || false);
        setValue('matress', selectedVilla?.amenities?.matress || false);
        setValue('projector', selectedVilla?.amenities?.projector || false);
        setValue('oven', selectedVilla?.amenities?.oven || false);
        setValue('pets', selectedVilla?.amenities?.pets || false);
    }, [setValue, selectedVilla]);

    const handleCheckboxChange = (index) => {
        setCheckedIndex(index === checkedIndex ? null : index);
    };

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

    const handleSetMainImage = (index) => {
        const updatedImages = [...selectedVilla.images];
        const selectedImage = updatedImages.splice(index, 1)[0];
        updatedImages.unshift(selectedImage);
        setSelectedVilla({ ...selectedVilla, images: updatedImages });
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...selectedVilla.images];
        updatedImages.splice(index, 1);
        setSelectedVilla({ ...selectedVilla, images: updatedImages });
    };

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

            // Append amenities
            const amenityNames = ['wifi', 'tv', 'parking', 'pool', 'bathtub', 'kitchen', 'ac', 'geyser', 'waterfilter', 'lawn', 'bbq', 'speakers', 'inverter', 'bonfire', 'mtview', 'gazebo', 'games', 'fridge', 'terrace', 'barcounter', 'matress', 'projector', 'oven','pets'];
            amenityNames.forEach((amenity) => {
                formdata.append(`amenities.${amenity}`, values[amenity] === true ? 'true' : 'false');
            });
            // Assuming newImages is an array of file objects with a property 'path'
            selectedVilla.images.forEach((image) => {
                formdata.append('existingImages', image);
            });


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
            if (imagePreviews.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    formdata.append('images', images[i]);
                }
            }
            await dispatch(updateVilla({ id: villaId, formdata }));
            await dispatch(fetchAsync());

            navigate('/admin')
        }
    }
    useEffect(() => {
        if (status === 'updatesuccess') {
            toast.success('Villa updated successfully');
        } else if (status === 'updaterejected') {
            toast.error('Error updating villa');
        }
    }, [status]);;

    return (
        <>
            <NavAdmin></NavAdmin>
            <div className="container">
                <header>Edit Villa/Property</header>
                <form noValidate onSubmit={handleSubmit(OnSubmit)} encType="multipart/form-data">
                    <div className="fields">
                        <div className="input-field">
                            <label>Name/title</label>
                            <input {...register('name', { required: "Please Enter Villa Name" })} type="text" placeholder="Enter villa name" required />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Check-in time</label>
                            <input  {...register('checkin', { required: "Please Enter Check-In Time" })} type="number" placeholder="Enter check-in time" required />
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
                            <input {...register('baths', { required: "Please Enter Number of Bathrooms" })} type="number" placeholder="Enter number of bathrooms" />
                            {errors.baths && <p>{errors.baths.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Halls</label>
                            <input {...register('halls', { required: "Please Enter Number of Halls" })} type="number" placeholder="Enter number of halls" />
                            {errors.halls && <p>{errors.halls.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Guests capacity(format: 10-12)</label>
                            <input {...register('capacity', { required: "Please Enter Guests Capacity" })} type="text" placeholder="Enter number capacity of guests" />
                            {errors.capacity && <p>{errors.capacity.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Price (Weekends)</label>
                            <input {...register('weekendprice', { required: "Please Enter Weekend Price" })} type="number" placeholder="Enter price for weekends" />
                            {errors.weekendprice && <p>{errors.weekendprice.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Price (Weekdays)</label>
                            <input {...register('weekdayprice', { required: "Please Enter Weekdays Price" })} type="number" placeholder="Enter price for weekdays" />
                            {errors.weekdayprice && <p>{errors.weekdayprice.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Above these guests</label>
                            <input {...register('aboveguests', { required: "Please Enter Number of People" })} type="number" placeholder="Enter number of people" />
                            {errors.aboveguests && <p>{errors.aboveguests.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Description/about</label>
                            <input {...register('description', { required: "Please Enter Description" })} type="text" placeholder="Enter description" />
                            {errors.description && <p>{errors.description.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Location in words</label>
                            <input {...register('location', { required: "Please Enter Location in Words" })} type="text" placeholder="Enter location in words" />
                            {errors.location && <p>{errors.location.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Maps link</label>
                            <input {...register('mapslink', { required: "Please Enter Google Map Link" })} type="text" placeholder="Enter Google Maps location link" />
                            {errors.mapslink && <p>{errors.mapslink.message}</p>}
                        </div>
                        <div className="input-field">
                            <label>Drive link</label>
                            <input {...register('drivelink', { required: "Please Enter Google Drive Link" })} type="text" placeholder="Enter Google Drive link" />
                            {errors.drivelink && <p>{errors.drivelink.message}</p>}
                        </div>

                        {/* AMENITIES */}

                        <div className="input-field">
                            <label>Select Amenities </label>
                        </div>

                        <div className="checkbox-wrapper-16">
                            <label className="checkbox-wrapper">
                                <input {...register('wifi')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,21c-1.1,0-2-.9-2-2s.9-2,2-2,2,.9,2,2-.9,2-2,2Zm0-3c-.55,0-1,.45-1,1s.45,1,1,1,1-.45,1-1-.45-1-1-1Zm6.81-4.12c.21-.18,.23-.5,.05-.71-.16-.18-.32-.37-.5-.54-1.7-1.7-3.96-2.64-6.36-2.64s-4.66,.94-6.36,2.64c-.17,.17-.34,.35-.5,.54-.18,.21-.16,.53,.05,.71,.21,.18,.53,.16,.71-.05,.14-.17,.29-.33,.44-.48,1.51-1.51,3.52-2.34,5.66-2.34s4.15,.83,5.66,2.34c.16,.16,.3,.32,.44,.48,.1,.12,.24,.17,.38,.17,.12,0,.23-.04,.33-.12Zm5.03-4.9c.21-.19,.22-.5,.04-.71-.18-.2-.37-.39-.56-.59-3.02-3.02-7.04-4.69-11.31-4.69S3.71,4.66,.69,7.69c-.19,.19-.38,.39-.56,.59-.19,.21-.17,.52,.04,.71,.21,.18,.52,.17,.71-.04,.17-.19,.34-.37,.52-.55,2.83-2.83,6.6-4.39,10.61-4.39s7.77,1.56,10.61,4.39c.18,.18,.35,.36,.52,.55,.1,.11,.23,.17,.37,.17,.12,0,.24-.04,.33-.13Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Wifi</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('tv')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#555555" height="800px" width="800px" version="1.1" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <g id="Layer_1">
                                                <path d="M1,38h23v3H12v2h26v-2H26v-3h23V8H1V38z M3,10h44v26H3V10z" />
                                            </g>
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Tv</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input  {...register('parking')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M13.5,5h-3c-1.93,0-3.5,1.57-3.5,3.5v10c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-4.5h5.5c2.481,0,4.5-2.019,4.5-4.5s-2.019-4.5-4.5-4.5Zm0,8h-5.5v-4.5c0-1.378,1.121-2.5,2.5-2.5h3c1.93,0,3.5,1.57,3.5,3.5s-1.57,3.5-3.5,3.5ZM19.5,0H4.5C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V4.5c0-2.481-2.019-4.5-4.5-4.5Zm3.5,19.5c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5h15c1.93,0,3.5,1.57,3.5,3.5v15Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Parking</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('pool')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" shapersendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 414.47"><path fillRule="nonzero" d="M296.13 137.2V88.29H195.58v49.16c.49.8 1.39 1.34 2.28 1.34h95.9c.95 0 1.91-.7 2.37-1.59zm-155.51 98.91c-3 .16-5.58-2.14-5.74-5.14-.16-3.01 2.14-5.59 5.14-5.75 3.81-.21 6.94-1.35 9.5-3.27 2.68-2.01 4.89-4.97 6.71-8.72 2.07-4.26 8.2-3.98 9.96.32 7.25 14.19 25.43 15.42 32.16.17 1.86-4.23 7.76-4.33 9.84-.34 9.73 17.53 21.9 13.86 32.74-.71 2.41-3.26 7.71-2.85 9.55.8 7.6 15.1 24.68 17.69 32.06 1.36 1.71-3.72 6.84-4.38 9.35-1 10.84 14.57 23 18.26 32.73.72 2.09-4.01 7.98-3.9 9.84.33 6.87 15.58 25.36 13.69 32.32-.48 3.14-6.43 12.93-1.66 9.78 4.78-6.96 14.16-23.8 22.09-38.47 14.88-3.25-1.6-6.26-3.91-8.83-6.98-1.76 2.11-3.63 3.9-5.59 5.36-7.99 5.95-17.25 6.24-25.89 1.47-3.22-1.77-6.42-4.28-9.56-7.54-7.67 9.66-20.17 13.32-31.57 8.18-4.31-1.95-8.37-5.13-11.81-9.6-9.76 10.28-23.16 15.66-35.7 6.32-1.96-1.46-3.83-3.24-5.59-5.35-11.2 13.37-30.66 12.46-42.22-.38-1.58 1.95-3.33 3.66-5.28 5.12-4.29 3.22-9.38 5.12-15.43 5.45zm-17.95 83.91c-3 .15-5.57-2.16-5.72-5.17a5.448 5.448 0 0 1 5.17-5.72c3.78-.2 6.91-1.34 9.47-3.27 2.69-2.01 4.9-4.97 6.71-8.69 1.31-2.7 4.57-3.85 7.28-2.54a5.47 5.47 0 0 1 2.62 2.71c7.07 14.05 25.39 15.79 32.23.29 1.86-4.23 7.75-4.32 9.83-.33 9.75 17.54 21.89 13.85 32.74-.72 2.5-3.37 7.66-2.73 9.34 1.01 6 13.23 20.22 15.03 29.1 3.42 2.38-3.12 7.22-2.61 9.39.43 8.69 12.2 23.42 11.06 29.64-2.69 1.71-3.72 6.84-4.38 9.35-1 10.82 14.56 23.01 18.25 32.73.72a5.347 5.347 0 0 1 2.64-2.47c2.75-1.21 5.98.04 7.19 2.8 6.8 15.42 25.25 13.93 32.33-.48 1.32-2.7 4.59-3.82 7.28-2.5 2.7 1.31 3.82 4.58 2.5 7.28-4.54 9.24-13.29 15.82-22.9 17.27-9.36 1.42-18.39-2.21-24.41-9.37-1.75 2.11-3.63 3.89-5.58 5.35-7.99 5.95-17.25 6.25-25.9 1.48-3.21-1.77-6.42-4.28-9.56-7.55-1.75 2.22-3.75 4.1-5.9 5.64-7.6 5.42-17.14 6.4-25.66 2.55-3.1-1.4-6.08-3.45-8.78-6.15-9.74 8.76-23.36 10-33.98 1.88-1.86-1.42-3.6-3.12-5.15-5.08-9.75 10.14-23.05 15.3-35.45 6.07-1.96-1.46-3.83-3.25-5.59-5.36-7.91 9.44-20.61 12.16-31.82 7.2-3.84-1.69-7.41-4.24-10.41-7.57-1.58 1.95-3.33 3.66-5.27 5.12-4.29 3.21-9.4 5.11-15.46 5.44zm0-40.93c-3 .15-5.57-2.16-5.72-5.16a5.448 5.448 0 0 1 5.17-5.72c3.78-.21 6.91-1.35 9.47-3.27 2.68-2.01 4.89-4.98 6.71-8.72 2.08-4.26 8.2-3.98 9.96.32 7.14 13.96 25.37 15.59 32.17.17 1.86-4.23 7.75-4.34 9.83-.33 9.73 17.53 21.9 13.84 32.74-.72 2.5-3.37 7.66-2.73 9.34 1.01 6 13.22 20.21 15.02 29.1 3.41 2.37-3.11 7.23-2.61 9.39.44 8.7 12.19 23.42 11.06 29.64-2.69 1.71-3.72 6.84-4.39 9.35-1.01 10.83 14.57 23 18.25 32.73.72 2.09-4 7.98-3.89 9.83.33 6.88 15.59 25.35 13.7 32.33-.5 3.17-6.43 12.96-1.61 9.78 4.82-6.95 14.13-23.84 22.03-38.49 14.85-3.24-1.59-6.24-3.9-8.81-6.97-1.76 2.11-3.63 3.9-5.59 5.35-7.99 5.96-17.25 6.26-25.9 1.48-3.22-1.77-6.42-4.28-9.55-7.55-1.76 2.22-3.75 4.11-5.9 5.64-7.61 5.42-17.15 6.4-25.67 2.55-3.1-1.4-6.07-3.44-8.78-6.15-2.37 2.14-4.92 3.8-7.56 4.99-8.86 4-18.73 2.79-26.42-3.11-1.87-1.42-3.6-3.12-5.15-5.08-3.14 3.26-6.34 5.77-9.55 7.54-8.66 4.78-17.91 4.48-25.91-1.47-1.96-1.46-3.82-3.24-5.58-5.35-11.21 13.35-30.69 12.44-42.23-.38a29.649 29.649 0 0 1-5.27 5.12c-4.29 3.22-9.4 5.12-15.46 5.44zM28.15 402.61h455.69c1.82 0 3.72-.34 5.56-.94 3.08-1.02 5.91-2.74 7.93-4.88 1.71-1.81 2.8-3.9 2.8-5.98 0-.65-.1-1.32-.33-2l-77.07-233.03c-6.58-19.9-11.63-29.85-19.5-34.44-8.06-4.69-20.61-4.81-41.66-4.81h-53.58v21.22h25.34c22.98 0 36.96.09 47.84 6.32 11.08 6.34 17.46 18.11 24.6 41.2l48.84 157.6c.57 1.87.85 3.7.85 5.47 0 5.44-2.43 10.41-6.22 14.38-3.49 3.66-8.23 6.5-13.24 8.06-2.84.87-5.78 1.36-8.64 1.36H84.64c-2.88 0-5.82-.49-8.64-1.37-5.01-1.56-9.74-4.43-13.23-8.08-3.8-3.99-6.23-8.96-6.23-14.39 0-1.77.28-3.6.85-5.45l50.52-162.41c13.49-43.36 30.62-43.17 66.69-42.75l9.12.05v-21.21h-26.43l-10.74-.1c-30.24-.33-44-.48-55.59 34.54L12.19 388.81c-.22.68-.33 1.35-.33 1.99 0 6.89 10.18 11.81 16.29 11.81zm279.84-297.94h53.58c23.03 0 36.81.16 47.59 6.43 10.95 6.38 17.28 18.11 24.83 40.97l77.08 233.03c.63 1.92.93 3.84.93 5.71 0 5.31-2.35 10.17-6.05 14.09-3.4 3.6-7.98 6.43-12.84 8.03-3.01.99-6.17 1.54-9.27 1.54H28.15c-3.09 0-6.26-.55-9.27-1.54-4.86-1.61-9.44-4.45-12.83-8.04C2.35 400.97 0 396.11 0 390.8c0-1.87.3-3.79.93-5.7L79.7 147.26c14.31-43.22 30.77-43.04 66.94-42.65l10.65.06h26.43V43.09c0-11.85 4.85-22.63 12.66-30.44C204.18 4.85 214.96 0 226.82 0c11.83 0 22.6 4.85 30.41 12.65 7.83 7.81 12.68 18.59 12.68 30.44 0 3.27-2.66 5.93-5.93 5.93-3.28 0-5.94-2.66-5.94-5.93 0-8.58-3.51-16.39-9.17-22.05-5.65-5.67-13.46-9.18-22.05-9.18s-16.4 3.52-22.06 9.18-9.18 13.47-9.18 22.05v33.34h100.55V43.09c0-11.85 4.85-22.63 12.65-30.44l.36-.32C316.92 4.72 327.55 0 339.22 0c11.86 0 22.64 4.85 30.44 12.65 7.8 7.81 12.65 18.59 12.65 30.44 0 3.27-2.66 5.93-5.93 5.93-3.27 0-5.93-2.66-5.93-5.93 0-8.58-3.51-16.39-9.18-22.05-5.66-5.66-13.46-9.18-22.05-9.18-8.45 0-16.14 3.4-21.78 8.89l-.27.29c-5.66 5.66-9.18 13.47-9.18 22.05v61.58zM84.64 360.27h342.72c1.72 0 3.48-.28 5.16-.8 3.14-.97 6.05-2.71 8.14-4.9 1.79-1.87 2.93-4.05 2.93-6.23 0-.67-.09-1.35-.29-1.99l-48.83-157.61c-6.18-19.92-11.2-29.82-19.19-34.38-8.16-4.68-20.93-4.75-41.95-4.75h-25.34v38.13c0 3.27-2.66 5.93-5.93 5.93-3.27 0-5.93-2.66-5.93-5.93v-36.75H195.58v36.75a5.93 5.93 0 0 1-5.93 5.93c-3.27 0-5.93-2.66-5.93-5.93V149.6l-9.21-.09c-30.11-.35-44.41-.52-55.29 34.45L68.7 346.37c-.2.64-.29 1.29-.29 1.93 0 2.18 1.14 4.35 2.93 6.23 2.11 2.21 5.03 3.96 8.16 4.93 1.7.53 3.44.81 5.14.81z" /></svg>                                    </span>
                                    <span className="checkbox-label">Pool</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('bathtub')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m1,12V3.833c0-1.562,1.271-2.833,2.833-2.833.782,0,1.534.33,2.066.895l-.912,4.686,1.364,1.86,6.563-4.922-1.258-1.854-4.822-.215c-.724-.91-1.838-1.451-3.003-1.451C1.72,0,0,1.72,0,3.833v8.167h0l.452,3.617c.289,2.31,1.502,4.307,3.239,5.64l-.75,2.743h1.03l.594-2.154c1.254.735,2.709,1.154,4.25,1.154h6.377c1.537,0,2.99-.417,4.242-1.149l.592,2.149h1.03l-.748-2.737c1.741-1.333,2.958-3.333,3.247-5.646l.452-3.617H1ZM6.81,2.45l4.303.192.439.648-4.991,3.744-.509-.692.758-3.893Zm15.755,13.042c-.464,3.71-3.633,6.508-7.371,6.508h-6.377c-3.738,0-6.907-2.798-7.371-6.508l-.312-2.492h21.742l-.312,2.492Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Bath Tub</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('kitchen')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M13.002,11.705L.738,23.969,.031,23.262,12.296,10.997l-1.564-1.568c-.472-.471-.732-1.099-.732-1.767s.26-1.296,.732-1.768L16.639-.012l.707,.707-5.906,5.906c-.283,.283-.439,.66-.439,1.061s.156,.777,.439,1.061l1.563,1.567,6.964-6.964,.707,.707-6.965,6.965,1.558,1.562c.584,.584,1.536,.584,2.121,0l5.906-5.906,.707,.707-5.906,5.906c-.487,.487-1.127,.731-1.768,.731s-1.28-.244-1.768-.731l-1.558-1.562Zm-6.306,2.063l.708-.708C2.716,9.31,1.001,4.015,1.001,2.048v-.367c0-.409,.249-.57,.397-.629,.078-.031,.173-.051,.275-.051,.183,0,.387,.064,.557,.244l5.786,6.252c.016-.425,.096-.835,.225-1.229L2.96,.561C2.456,.027,1.697-.144,1.028,.123,.394,.375,0,.973,0,1.683v.365c0,2.094,1.787,7.722,6.696,11.72Zm9.631,2.229c-.165,0-.324-.03-.486-.047l.886,.957c-1.802-.228-3.397-.677-4.843-1.255l-.782,.782c1.914,.818,4.12,1.388,6.651,1.582l5.495,5.938,.734-.68-6.811-7.359c-.276,.052-.557,.082-.844,.082Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Kitchen</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('ac')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M21.5,0H2.5C1.121,0,0,1.122,0,2.5V11H24V2.5c0-1.378-1.121-2.5-2.5-2.5Zm1.5,10H1V2.5c0-.827,.673-1.5,1.5-1.5H21.5c.827,0,1.5,.673,1.5,1.5v7.5ZM3,6H21v1H3v-1Zm4,7h1v7.5c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5,1.57-3.5,3.5-3.5v1c-1.379,0-2.5,1.122-2.5,2.5s1.121,2.5,2.5,2.5,2.5-1.122,2.5-2.5v-7.5Zm16,7.5c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5v-7.5h1v7.5c0,1.378,1.121,2.5,2.5,2.5s2.5-1.122,2.5-2.5-1.121-2.5-2.5-2.5v-1c1.93,0,3.5,1.57,3.5,3.5Zm-11.5-7.5h1v11h-1V13Z" /></svg>                                    </span>
                                    <span className="checkbox-label">Ac</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('geyser')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 71.49 122.88" xmlSpace="preserve"><g><path d="M71.49,43.02v66.55c0,2.1-0.86,4-2.24,5.39c-1.38,1.38-3.29,2.24-5.39,2.24h-5.65v4.03c0,0.91-0.75,1.66-1.66,1.66h-7.91 c-0.91,0-1.66-0.75-1.66-1.66v-4.03H24.5v4.03c0,0.91-0.75,1.66-1.66,1.66h-7.91c-0.91,0-1.66-0.75-1.66-1.66v-4.03H7.63 c-2.1,0-4.01-0.86-5.39-2.24C0.86,113.57,0,111.67,0,109.57V43.13c0-7.39,8.48-12.3,19.65-14.66v-5.1c0-2.36,0.96-4.5,2.52-6.05 c1.28-1.28,2.96-2.16,4.83-2.43V0h3.55v14.8h9.99V7.13c0-0.98,0.79-1.77,1.77-1.77h25.4v3.55H44.08v5.93 c2.03,0.19,3.86,1.11,5.24,2.48c1.55,1.55,2.52,3.7,2.52,6.05v4.82C63.01,30.38,71.49,35.24,71.49,43.02L71.49,43.02z M35.01,101.63l5.66-3.6c0.11-0.08,0.25-0.07,0.34,0.03l0.55,0.58c0.09,0.1,0.1,0.25,0.01,0.35l-4.3,5 c-0.66,0.71-1.38,0.85-1.96,0.66c-0.29-0.1-0.55-0.27-0.74-0.49c-0.19-0.22-0.33-0.5-0.38-0.79 C34.09,102.77,34.3,102.11,35.01,101.63L35.01,101.63L35.01,101.63L35.01,101.63z M25.62,106.42h20.25 c0.13-0.43,0.23-0.87,0.3-1.31c0.07-0.42,0.11-0.84,0.13-1.28h-1.64c-0.14,0-0.27-0.12-0.27-0.26v-1.26c0-0.14,0.12-0.26,0.27-0.26 h1.55c-0.14-1.08-0.45-2.1-0.9-3.05c-0.46-0.99-1.07-1.89-1.8-2.68l-1.04,1.04c-0.1,0.1-0.27,0.1-0.37,0l-0.89-0.89 c-0.1-0.1-0.1-0.27,0-0.37l0.99-0.99c-0.83-0.65-1.76-1.17-2.76-1.55c-0.97-0.37-2.01-0.59-3.09-0.65v1.42 c0,0.14-0.12,0.27-0.26,0.27h-1.26c-0.14,0-0.27-0.12-0.27-0.27v-1.37c-1.08,0.12-2.1,0.4-3.05,0.82c-0.98,0.43-1.89,1.01-2.68,1.7 l1.04,1.04c0.1,0.1,0.1,0.27,0,0.37l-0.89,0.89c-0.1,0.1-0.27,0.1-0.37,0l-1.02-1.02c-0.68,0.83-1.23,1.75-1.63,2.76 c-0.39,0.98-0.64,2.03-0.73,3.13h1.61c0.14,0,0.26,0.12,0.26,0.26v1.26c0,0.14-0.12,0.26-0.26,0.26h-1.6 c0.03,0.33,0.07,0.65,0.13,0.96C25.44,105.74,25.53,106.08,25.62,106.42L25.62,106.42L25.62,106.42z M47.19,108.14H24.33 c-0.14,0-0.27-0.12-0.27-0.26v-0.01c-0.03-0.64-0.16-1.22-0.3-1.82c-0.17-0.78-0.35-1.59-0.35-2.61c0-1.67,0.33-3.26,0.93-4.71 c0.63-1.51,1.54-2.87,2.68-4c1.13-1.13,2.5-2.05,4-2.68c1.46-0.6,3.05-0.93,4.71-0.93c1.66,0,3.25,0.33,4.7,0.94 c1.51,0.63,2.87,1.55,4,2.69c1.14,1.14,2.06,2.5,2.69,4.01c0.6,1.46,0.94,3.05,0.94,4.7c0,0.94-0.18,1.76-0.35,2.53 c-0.14,0.66-0.28,1.28-0.28,1.91C47.46,108.03,47.34,108.14,47.19,108.14L47.19,108.14L47.19,108.14z M11.47,99.29h4.18 c0.91,0,1.66,0.75,1.66,1.66v1.18c0,0.91-0.75,1.66-1.66,1.66h-4.18c-0.91,0-1.66-0.74-1.66-1.66v-1.18 C9.81,100.03,10.56,99.29,11.47,99.29L11.47,99.29z M55.84,99.29h4.18c0.91,0,1.66,0.75,1.66,1.66v1.18c0,0.91-0.75,1.66-1.66,1.66 h-4.18c-0.91,0-1.66-0.74-1.66-1.66v-1.18C54.19,100.03,54.93,99.29,55.84,99.29L55.84,99.29z M3.55,85.08h64.39V43.02 c0-5.97-7.87-9.82-18.04-11.58c-4.27-0.74-8.91-1.1-13.55-1.09c-4.64,0.01-9.31,0.4-13.64,1.15C12,33.34,3.55,37.3,3.55,43.13 V85.08L3.55,85.08z M67.94,88.62H3.55v20.94c0,1.12,0.46,2.14,1.2,2.88c0.74,0.74,1.76,1.2,2.88,1.2h56.23 c1.12,0,2.14-0.46,2.88-1.2c0.74-0.74,1.2-1.76,1.2-2.88V88.62L67.94,88.62z M35.74,47.6c2.17,0,4.14,0.88,5.56,2.31 c1.42,1.42,2.31,3.39,2.31,5.57c0,2.17-0.88,4.14-2.31,5.56c-1.42,1.42-3.39,2.31-5.56,2.31c-2.17,0-4.14-0.88-5.56-2.31 c-1.42-1.42-2.31-3.39-2.31-5.56c0-2.17,0.88-4.14,2.31-5.57C31.6,48.48,33.57,47.6,35.74,47.6L35.74,47.6z M39.2,52.02 c-0.88-0.88-2.1-1.43-3.45-1.43c-1.35,0-2.57,0.55-3.45,1.43c-0.88,0.88-1.43,2.1-1.43,3.45c0,1.35,0.55,2.57,1.43,3.45 c0.88,0.88,2.1,1.43,3.45,1.43c1.35,0,2.57-0.55,3.45-1.43c0.88-0.88,1.43-2.1,1.43-3.45C40.62,54.12,40.08,52.9,39.2,52.02 L39.2,52.02z M23.2,27.82c4.19-0.66,8.67-1,13.16-1.01c4.07-0.01,8.12,0.25,11.93,0.78v-4.23c0-1.38-0.57-2.63-1.48-3.54 c-0.91-0.91-2.17-1.48-3.54-1.48H28.22c-1.38,0-2.63,0.57-3.55,1.48c-0.91,0.91-1.48,2.17-1.48,3.54V27.82L23.2,27.82z" /></g></svg>                                    </span>
                                    <span className="checkbox-label">Geyser</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('waterfilter')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 415 512.56"><path fillRule="nonzero" d="M41.673 0h336.176c.597 0 1.338.027 2.208.078 9.367.555 18.064 4.625 24.415 10.884 6.438 6.343 10.505 14.952 10.506 24.484H415c0 .514-.025 1.179-.072 1.981l-24.91 418.75c-1.668 28.222-15.349 42.414-33.95 49.571-17.692 6.806-39.285 6.812-58.873 6.812H110.391c-19.682 0-38.589-1.241-53.396-8.807-15.471-7.905-25.983-22.203-27.518-48.028l-.518-8.71H15.835v13.023a6.263 6.263 0 01-12.524 0v-19.285a6.263 6.263 0 016.262-6.262h18.641l-1.403-23.595H6.262A6.263 6.263 0 010 404.634v-19.285a6.263 6.263 0 0112.524 0v13.023h13.542L4.594 37.427a36.363 36.363 0 01-.071-1.984c0-9.522 4.075-18.129 10.526-24.485C21.4 4.701 30.095.634 39.463.078A39.097 39.097 0 0141.673 0zM77.14 261.551a4.443 4.443 0 01-.452-8.872c6.86-.374 12.563-2.464 17.28-6 4.81-3.608 8.714-8.804 11.871-15.292a4.451 4.451 0 018.135.303c4.121 8.206 10.601 14.12 17.885 17.333 4.149 1.831 8.534 2.782 12.859 2.78 4.287-.002 8.553-.94 12.505-2.884l.224-.103c6.077-3.05 11.446-8.56 15.088-16.815a4.448 4.448 0 018.025-.243c3.902 7.046 8.286 12.345 12.976 15.836 4.084 3.04 8.414 4.708 12.86 4.957 4.488.251 9.211-.935 14.037-3.597 6.269-3.46 12.668-9.365 18.952-17.806a4.439 4.439 0 017.614.821c3.684 8.138 9.253 13.922 15.617 17.126 3.698 1.863 7.666 2.861 11.678 2.947 4.026.086 8.134-.744 12.099-2.537 7.184-3.245 13.893-9.667 18.867-19.543a4.44 4.44 0 018.103.384c3.181 8.086 7.136 14.075 11.963 17.691 4.542 3.401 10.053 4.734 16.638 3.761a4.45 4.45 0 015.046 3.758 4.45 4.45 0 01-3.758 5.045c-9.043 1.336-16.749-.599-23.248-5.466-4.381-3.28-8.118-7.866-11.267-13.651-5.331 7.685-11.804 13.017-18.691 16.128-5.169 2.336-10.579 3.416-15.926 3.302-5.361-.114-10.63-1.432-15.506-3.887-6.344-3.195-12.03-8.312-16.386-15.206-5.743 6.718-11.633 11.68-17.517 14.926-6.308 3.481-12.637 5.021-18.804 4.675-6.211-.348-12.158-2.6-17.661-6.696-4.065-3.026-7.882-7.061-11.375-12.073-4.215 6.482-9.562 11.139-15.467 14.101l-.249.133c-5.192 2.554-10.799 3.784-16.437 3.788-5.597.003-11.204-1.199-16.442-3.51-7.004-3.09-13.406-8.172-18.31-15.009-3.021 4.623-6.555 8.531-10.676 11.621-6.124 4.592-13.438 7.298-22.15 7.774zm0-50.506a4.443 4.443 0 01-.452-8.872c6.86-.374 12.563-2.464 17.28-6.001 4.81-3.606 8.714-8.802 11.871-15.291a4.453 4.453 0 015.95-2.054 4.429 4.429 0 012.185 2.357c4.122 8.207 10.603 14.121 17.885 17.334 4.148 1.83 8.533 2.782 12.859 2.779 4.297-.001 8.569-.94 12.522-2.883 6.162-3.029 11.612-8.571 15.295-16.919a4.448 4.448 0 018.025-.244c3.903 7.048 8.286 12.346 12.977 15.838 4.084 3.04 8.413 4.708 12.859 4.956 4.488.252 9.21-.934 14.037-3.596 6.268-3.459 12.668-9.365 18.952-17.807a4.44 4.44 0 017.614.82c3.684 8.138 9.253 13.923 15.617 17.128 3.698 1.863 7.666 2.86 11.677 2.946 4.026.086 8.134-.743 12.099-2.536 7.184-3.245 13.894-9.667 18.868-19.544a4.442 4.442 0 018.103.384c3.181 8.086 7.136 14.076 11.963 17.69 4.541 3.403 10.053 4.736 16.638 3.763a4.45 4.45 0 015.046 3.758 4.45 4.45 0 01-3.758 5.045c-9.043 1.336-16.75-.599-23.248-5.467-4.38-3.28-8.118-7.866-11.267-13.651-5.331 7.686-11.805 13.017-18.692 16.128-5.17 2.337-10.579 3.417-15.927 3.302-5.359-.115-10.628-1.431-15.504-3.886-6.344-3.196-12.029-8.312-16.386-15.206-5.743 6.718-11.634 11.68-17.517 14.926-6.309 3.481-12.636 5.02-18.804 4.675-6.21-.348-12.157-2.6-17.659-6.696-4.066-3.026-7.884-7.061-11.377-12.074-4.279 6.58-9.722 11.278-15.735 14.235-5.193 2.552-10.792 3.784-16.418 3.787-5.597.004-11.204-1.199-16.442-3.509-7.004-3.09-13.406-8.172-18.31-15.01-3.021 4.624-6.555 8.532-10.676 11.621-6.124 4.591-13.438 7.298-22.15 7.774zm154.435 190.08v14.547a4.175 4.175 0 01-4.175 4.175h-19.983a4.175 4.175 0 01-4.175-4.175v-14.547h-59.449c-19.703 0-38.441-1.254-53.149-8.826-15.348-7.9-25.841-22.174-27.765-47.921L43.553 85.901a32.914 32.914 0 01-.088-2.286c0-9.358 4.04-17.809 10.413-24.078 6.262-6.158 14.814-10.208 23.979-10.893a38.26 38.26 0 012.785-.11h258.24c.87 0 1.799.038 2.776.11 9.17.685 17.724 4.748 23.986 10.912 6.375 6.274 10.415 14.73 10.415 24.07 0 .742-.032 1.551-.097 2.422l-19.354 258.847c-1.71 28.121-15.372 42.275-33.94 49.419-17.691 6.806-39.285 6.811-58.873 6.811h-32.22zm-19.983 0v10.372h11.633v-10.372h-11.633zm.075-61.314v-6.358l-26.876-8.507a5.563 5.563 0 113.35-10.609l30.553 9.67a5.57 5.57 0 014.106 5.373v10.431h4.033c2.848 0 5.449 1.172 7.34 3.06l.008-.008a10.373 10.373 0 013.052 7.348v39.78h26.562c18.676 0 39.264-.005 54.916-6.026 14.652-5.638 25.444-16.997 26.814-39.78l19.347-258.963c.035-.474.053-1.009.053-1.596 0-6.219-2.74-11.898-7.065-16.155-4.439-4.37-10.512-7.251-17.028-7.738a26.79 26.79 0 00-1.95-.066H80.642c-.714 0-1.37.023-1.958.066-6.515.487-12.587 3.357-17.022 7.718-4.323 4.252-7.064 9.932-7.064 16.164 0 .561.016 1.069.047 1.521l19.324 258.415c1.583 21.189 9.795 32.717 21.762 38.877 12.605 6.488 29.801 7.563 48.062 7.563h53.529v-39.734c0-2.858 1.173-5.465 3.065-7.364l.025-.025c1.898-1.887 4.501-3.057 7.355-3.057h3.9zm15.166 8.35h-19.066c-.583 0-1.107.231-1.477.602l-.017.017c-.371.37-.601.894-.601 1.477v39.734h23.211v-39.78c0-.56-.233-1.072-.605-1.445v-.017a2.04 2.04 0 00-1.445-.588zM377.849 11.133H41.673c-.662 0-1.181.012-1.558.034-6.627.394-12.784 3.274-17.282 7.706-4.398 4.332-7.177 10.162-7.177 16.57 0 .583.009 1.026.027 1.332l24.883 418.298c1.259 21.164 9.451 32.665 21.474 38.809 12.685 6.482 30.07 7.544 48.351 7.544h186.804c18.675 0 39.264-.005 54.915-6.027 14.69-5.652 25.501-17.053 26.826-39.951l24.903-418.673c.018-.306.027-.747.027-1.329h.022c0-6.39-2.788-12.222-7.2-16.569-4.499-4.433-10.657-7.318-17.283-7.71a28.08 28.08 0 00-1.556-.034z" /></svg>                                    </span>
                                    <span className="checkbox-label">Ro</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('lawn')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 120.06" style={{ enableBackground: 'new 0 0 122.88 120.06' }} xmlSpace="preserve"><style type="text/css" dangerouslySetInnerHTML={{ __html: ".st0{fill-rule:evenodd;clip-rule:evenodd;}" }} /><g><path className="st0" d="M11.72,110.28l7.39-0.31c-3.31-6.56-3.04-10.1-2.57-16.07c0.12-1.6,0.26-3.39,0.34-5.32 c0.2-4.98,0.13-10.05-0.19-15.12c-0.24-3.89-0.63-7.77-1.15-11.62c-3.4,5.98-5.18,12.82-5.79,20.29 C9.04,90.81,9.92,100.31,11.72,110.28L11.72,110.28z M8.88,112.03c-5.17,1.47-8.1,4.16-8.88,8.02h122.88 c-3.11-5.52-8.77-9.01-19.08-8.76h-0.2c1.57-8.66,2.35-16.93,1.73-24.5c-0.64-7.94-2.81-15.13-7.18-21.22 c-0.23-0.34-0.6-0.59-1.04-0.66c-0.85-0.13-1.64,0.44-1.77,1.29c-1.3,8.18-1.46,16.5-1.62,24.66l-0.03,1.57 c-0.04,2.14,0,3.91,0.04,5.47c0.11,4.21,0.17,6.86-1.83,11.34c-1.68-10.62-2.77-21.29-3.23-32.07c-0.49-11.53-0.27-23.22,0.7-35.15 c0.07-0.85-0.57-1.6-1.43-1.67c-0.78-0.06-1.47,0.46-1.64,1.21c-2.05,7.31-3.74,14.85-5.01,22.63c-1.28,7.8-2.14,15.84-2.55,24.15 c0,0.06,0,0.12,0,0.18l0.22,6.18c-3.19-10.69-5.91-21.49-7.07-32.21c-1.55-14.31-0.33-28.5,6.22-42.16 c0.37-0.77,0.04-1.7-0.73-2.06c-0.66-0.31-1.42-0.12-1.87,0.42l0,0c-6.71,8.21-11.08,19.29-13.08,33.29 c-1.98,13.85-1.65,30.58,1.03,50.22c0,0.03,0.01,0.06,0.02,0.1l0,0l1.8,9.02H53.89l2.19-10.97l0,0c0.01-0.03,0.01-0.06,0.02-0.1 c3.19-23.46,3.59-43.45,1.23-59.99c-2.39-16.69-7.59-29.9-15.58-39.68l0,0c-0.44-0.54-1.21-0.73-1.87-0.42 c-0.77,0.37-1.1,1.29-0.73,2.06c7.87,16.4,9.33,33.43,7.47,50.6c-1.47,13.6-5.03,27.3-9.15,40.84l0.35-9.75c0-0.06,0-0.12,0-0.18 c-0.49-9.93-1.52-19.54-3.04-28.86c-1.52-9.3-3.54-18.31-5.99-27.05c-0.17-0.74-0.86-1.27-1.64-1.2c-0.85,0.07-1.49,0.81-1.43,1.67 c1.17,14.27,1.44,28.27,0.84,42.08c-0.57,13.27-1.93,26.4-4.04,39.48c-3.61-6.66-3.36-9.92-2.91-15.71 c0.12-1.55,0.25-3.27,0.34-5.43c0.21-5.11,0.13-10.28-0.19-15.44c-0.33-5.34-0.94-10.69-1.78-15.99c-0.13-0.85-0.93-1.42-1.77-1.29 c-0.44,0.07-0.81,0.32-1.04,0.66c-5.19,7.23-7.77,15.78-8.53,25.23C5.89,91.19,6.9,101.37,8.88,112.03L8.88,112.03z M94.94,110.04 l5.69,0.24c1.47-8.23,2.19-16.08,1.61-23.25c-0.48-5.9-1.84-11.34-4.41-16.13c-0.75,6.63-0.88,13.38-1.01,20.02l-0.03,1.57 c-0.04,2.07,0,3.8,0.04,5.34C96.94,102.36,97.01,105.25,94.94,110.04L94.94,110.04z M68.25,110.18h12.89h0.02h7.75 c-1.74-10.88-2.86-21.82-3.34-32.89c-0.26-6.08-0.33-12.18-0.19-18.33c-0.37,1.9-0.71,3.81-1.02,5.73 c-1.26,7.67-2.11,15.58-2.51,23.75l0.64,17.73c0.03,0.85-0.64,1.57-1.49,1.6c-0.71,0.02-1.33-0.43-1.53-1.08 c-4.63-14.43-9.05-29.18-10.65-43.88c-1.02-9.44-0.88-18.84,1.13-28.11c-2.01,5.22-3.49,11.12-4.43,17.7 c-1.94,13.55-1.61,29.96,1.01,49.27l0,0L68.25,110.18L68.25,110.18z M35.29,110.15h15.67l2.09-10.43l0,0 c3.14-23.13,3.54-42.8,1.22-59.04c-1.35-9.43-3.61-17.7-6.79-24.8c3.23,12.26,3.6,24.73,2.24,37.26 c-1.9,17.56-7.2,35.19-12.72,52.43c-0.21,0.65-0.82,1.1-1.53,1.08c-0.85-0.03-1.52-0.75-1.49-1.6l0.77-21.22 c-0.48-9.78-1.5-19.26-3-28.45c-0.57-3.49-1.21-6.94-1.92-10.36c0.28,8.56,0.23,17.04-0.13,25.47 c-0.57,13.35-1.94,26.54-4.04,39.66h9.63H35.29L35.29,110.15z" /></g></svg>
                                    </span>
                                    <span className="checkbox-label">Lawn</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('bbq')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m16.001,3.5V.5c0-.276.224-.5.5-.5s.5.224.5.5v3c0,.276-.224.5-.5.5s-.5-.224-.5-.5Zm-4,.5c.276,0,.5-.224.5-.5V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0,.276.224.5.5.5Zm11.932,5.192c-.702,3.063-3.717,6.483-6.407,8.268l2.437,5.848c.105.255-.015.548-.27.654-.062.026-.128.039-.192.039-.195,0-.382-.116-.462-.308l-.705-1.692h-7.832c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h7.415l-1.261-3.026c-.05.016-.102.026-.156.026H7.334l-.562,1.348c.735.436,1.229,1.237,1.229,2.152,0,1.378-1.121,2.5-2.5,2.5s-2.5-1.122-2.5-2.5,1.121-2.5,2.5-2.5c.11,0,.217.008.323.022l.546-1.312C3.499,15.938.777,12.286.067,9.192c-.18-.783.004-1.591.503-2.217.493-.619,1.23-.975,2.022-.975h18.814c.792,0,1.529.355,2.022.975.499.626.683,1.434.503,2.217ZM5.501,20c-.827,0-1.5.673-1.5,1.5s.673,1.5,1.5,1.5,1.5-.673,1.5-1.5-.673-1.5-1.5-1.5ZM22.647,7.598c-.303-.38-.755-.598-1.24-.598H2.593c-.485,0-.938.218-1.24.598-.309.386-.422.886-.311,1.37.677,2.95,3.337,6.451,6.09,8.032h9.237c2.649-1.517,5.889-4.978,6.589-8.032.111-.484-.002-.984-.311-1.37Zm-15.146-3.598c.276,0,.5-.224.5-.5V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0,.276.224.5.5.5Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Bbq</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('speakers')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={512} height={512}><path d="m21.5,0h-9c-1.379,0-2.5,1.122-2.5,2.5v21.5h14V2.5c0-1.378-1.121-2.5-2.5-2.5Zm1.5,23h-12V2.5c0-.827.673-1.5,1.5-1.5h9c.827,0,1.5.673,1.5,1.5v20.5Zm-6-11c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,7c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Zm0-9.5c1.379,0,2.5-1.122,2.5-2.5s-1.121-2.5-2.5-2.5-2.5,1.122-2.5,2.5,1.121,2.5,2.5,2.5Zm0-4c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5ZM7,15c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm11,1c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm-11-4c.347,0,.678.058,1,.142v1.042c-.314-.112-.648-.184-1-.184-1.654,0-3,1.346-3,3s1.346,3,3,3c.352,0,.686-.072,1-.184v1.042c-.322.084-.653.142-1,.142-2.206,0-4-1.794-4-4s1.794-4,4-4ZM2.5,0h6.262c-.206.307-.359.647-.485,1H2.5c-.827,0-1.5.673-1.5,1.5v20.5h7v1H0V2.5C0,1.121,1.121,0,2.5,0Zm4.5,4.5c.356,0,.693.077,1,.212v1.178c-.266-.24-.614-.39-1-.39-.827,0-1.5.673-1.5,1.5s.673,1.5,1.5,1.5c.386,0,.734-.15,1-.39v1.178c-.307.135-.644.212-1,.212-1.379,0-2.5-1.122-2.5-2.5s1.121-2.5,2.5-2.5Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Music</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('inverter')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" width={512} height={512} viewBox="0 0 24 24"><path d="M3,11h7v1H3v-1Zm15-3h-1v3h-3v1h3v3h1v-3h3v-1h-3v-3Zm6-.5v14.5H0V7.5c0-1.379,1.122-2.5,2.5-2.5h.5V2h7v3h4V2h7v3h.5c1.378,0,2.5,1.121,2.5,2.5Zm-1,0c0-.827-.673-1.5-1.5-1.5h-1.5V3h-5v3h-6V3H4v3h-1.5c-.827,0-1.5,.673-1.5,1.5v13.5H23V7.5Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Inverter</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('bonfire')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m22,19.05v-1.55c0-1.93-1.57-3.5-3.5-3.5h-1c-.276,0-.5.224-.5.5s.224.5.5.5h1c1.379,0,2.5,1.121,2.5,2.5v1.5H3v-1.5c0-1.379,1.121-2.5,2.5-2.5h1c.276,0,.5-.224.5-.5s-.224-.5-.5-.5h-1c-1.93,0-3.5,1.57-3.5,3.5v1.55c-1.14.232-2,1.242-2,2.45,0,1.379,1.121,2.5,2.5,2.5h19c1.379,0,2.5-1.121,2.5-2.5,0-1.208-.86-2.218-2-2.45Zm-.5,3.95H2.5c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5h4.5v1.5c0,.276.224.5.5.5s.5-.224.5-.5v-1.5h2v1.5c0,.276.224.5.5.5s.5-.224.5-.5v-1.5h2v1.5c0,.276.224.5.5.5s.5-.224.5-.5v-1.5h2v1.5c0,.276.224.5.5.5s.5-.224.5-.5v-1.5h4.5c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5Zm-9.5-9c3.309,0,6-2.691,6-6,0-2.785-2.576-5.081-4.457-6.758-.444-.396-.855-.762-1.189-1.096-.099-.098-.239-.154-.371-.146-.139.005-.27.067-.36.173-.871,1.006-1.142,2.262-1.358,3.271-.256,1.187-.395,1.557-.764,1.557-.228,0-.484-.84-.5-1.635-.004-.201-.129-.382-.317-.455-.188-.074-.4-.028-.542.117-.977,1.008-2.141,2.688-2.141,4.973,0,3.309,2.691,6,6,6Zm1.414-1.586c-.778.779-2.049.779-2.829,0-.779-.78-.779-2.05,0-2.829l1.415-1.415,1.414,1.415c.378.378.586.881.586,1.415s-.208,1.036-.586,1.414Zm-5.258-7.854c.176.697.55,1.439,1.344,1.439,1.236,0,1.493-1.193,1.741-2.347.17-.786.357-1.66.822-2.399.25.232.525.478.814.735,1.836,1.637,4.122,3.674,4.122,6.011,0,1.734-.888,3.265-2.233,4.162.153-.363.233-.756.233-1.162,0-.802-.313-1.556-.879-2.122l-1.768-1.769c-.094-.094-.221-.146-.354-.146s-.26.053-.354.146l-1.769,1.769c-.886.886-1.1,2.195-.642,3.286-1.347-.897-2.236-2.429-2.236-4.164,0-1.421.537-2.577,1.156-3.439Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Bonfire</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('mtview')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m20,8c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-7c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm-2.5,11.008c-.827,0-1.557.467-1.903,1.221l-4.552,10.016-.045.756h13v-.549l-4.598-10.225c-.346-.752-1.075-1.219-1.902-1.219Zm-5.246,10.992l4.252-9.355c.184-.398.556-.637.994-.637s.811.238.993.635l4.253,9.357h-10.492Zm-1.258-16.358c-.186-.403-.558-.642-.996-.642s-.811.238-.994.637L1.267,23h7.733v1H0l.048-.763L8.1,6.214c.344-.747,1.073-1.214,1.9-1.214s1.557.467,1.902,1.219l2.475,5.238c-.236.281-.44.596-.601.944l-.028.061-2.753-5.821Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Mt.View</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('gazebo')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={512} height={512}><path d="M21.122,13A2.881,2.881,0,0,0,24,10.122a5.13,5.13,0,0,0-2.106-4.137L15.009.979a5.1,5.1,0,0,0-6.018,0L2.106,5.985A5.13,5.13,0,0,0,0,10.122,2.881,2.881,0,0,0,2.878,13H11V23a1,1,0,0,0,2,0V13ZM15.5,8.075A2.986,2.986,0,0,1,16,9.734V11H13V4.313ZM20.718,7.6A3.124,3.124,0,0,1,22,10.122a.879.879,0,0,1-.878.878H18V9.734a4.983,4.983,0,0,0-.835-2.766l-2.5-3.77ZM2,10.122A3.124,3.124,0,0,1,3.282,7.6L9.339,3.2l-2.5,3.77A4.983,4.983,0,0,0,6,9.734V11H2.878A.879.879,0,0,1,2,10.122ZM8,11V9.734a2.986,2.986,0,0,1,.5-1.659L11,4.313V11Z" /><path d="M4,19H2V16a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0V21H4a1,1,0,0,1,1,1v1a1,1,0,0,0,2,0V22A3,3,0,0,0,4,19Z" /><path d="M23,15a1,1,0,0,0-1,1v3H20a3,3,0,0,0-3,3v1a1,1,0,0,0,2,0V22a1,1,0,0,1,1-1h2v2a1,1,0,0,0,2,0V16A1,1,0,0,0,23,15Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Gazebo</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('games')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#5b5a5a" id="Layer_1" height={512} viewBox="0 0 24 24" width={512} data-name="Layer 1"><path d="m21.261 2.739a9.836 9.836 0 0 0 -12.961-.625 4.489 4.489 0 1 0 -4.167 6.849 9.762 9.762 0 0 0 .843 5.816.486.486 0 0 1 -.081.578l-3.613 2.8a3.363 3.363 0 0 0 -1.282 2.409 2.824 2.824 0 0 0 .853 2.151l.445.422a2.836 2.836 0 0 0 2.126.861 2.959 2.959 0 0 0 2.232-1.08l2.958-3.779a.5.5 0 0 1 .6-.119 10.194 10.194 0 0 0 11.659-2.147 10.5 10.5 0 0 0 3.127-7.117 9.412 9.412 0 0 0 -2.739-7.019zm-19.261 1.761a2.5 2.5 0 1 1 2.5 2.5 2.5 2.5 0 0 1 -2.5-2.5zm8.1 12.726a2.5 2.5 0 0 0 -3.037.657l-2.963 3.78a.945.945 0 0 1 -1.407.044l-.444-.422a.82.82 0 0 1 -.249-.63 1.372 1.372 0 0 1 .535-.944l3.612-2.8a2.49 2.49 0 0 0 .624-3.011 7.736 7.736 0 0 1 -.691-4.4l8.42 8.413a7.69 7.69 0 0 1 -4.4-.687zm9.364-1.765a8.732 8.732 0 0 1 -2.776 1.854l.022-.022-9.35-9.348a4.473 4.473 0 0 0 1.64-3.445c0-.119-.026-.231-.035-.347a8.01 8.01 0 0 1 10.882 0 7.423 7.423 0 0 1 2.153 5.547 8.5 8.5 0 0 1 -2.539 5.761z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Games</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('fridge')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m19.5,0H4.5c-1.379,0-2.5,1.122-2.5,2.5v21.5h20V2.5c0-1.378-1.121-2.5-2.5-2.5ZM4.5,1h15c.827,0,1.5.673,1.5,1.5v6.5h-4v-4h-1v4H3V2.5c0-.827.673-1.5,1.5-1.5Zm-1.5,22v-13h13v8h1v-8h4v13H3Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Fridge</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('terrace')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 92.58"><title>terrace</title><path d="M60.48,34.21V83.9H77L81.9,71.69H79.28a3.26,3.26,0,0,1,0-6.51H92l-2.43-5.39h-8a2,2,0,1,1,0-4.07H102l2-12.54a3.24,3.24,0,0,1,6.4,1l-4,24.74a3.24,3.24,0,0,1-3.2,2.74H99.38l5.5,12.21h17.78v8.68H0V83.9H11.06l5.5-12.21H12.7a3.24,3.24,0,0,1-3.2-2.74l-4-24.74a3.25,3.25,0,0,1,6.41-1l2,12.54H34.39a2,2,0,1,1,0,4.07h-8L24,65.18H36.66a3.26,3.26,0,0,1,0,6.51H34L39,83.9h16.6V34.21H26.7a1.78,1.78,0,0,1-1.78-1.78,1.09,1.09,0,0,1,0-.18A32,32,0,0,1,34.67,9.53,33.34,33.34,0,0,1,57.49.09a1.73,1.73,0,0,1,1.1,0,33.34,33.34,0,0,1,22.7,9.44A32.12,32.12,0,0,1,91,32.43a1.75,1.75,0,0,1-1.77,1.77H60.48Zm43.75-22.28a.79.79,0,0,1,.29-1.08.78.78,0,0,1,1.08.3l1,1.75a.79.79,0,1,1-1.37.8l-1-1.77Zm6.31,2.61a7.07,7.07,0,1,1-5,2.07,7.11,7.11,0,0,1,5-2.07Zm-.62-4.46a.8.8,0,1,1,1.59,0v2a.8.8,0,0,1-1.59,0v-2Zm5.86,1.23a.79.79,0,0,1,1.08-.29.82.82,0,0,1,.29,1.09l-1,1.75a.8.8,0,0,1-1.08.3.79.79,0,0,1-.28-1.08l1-1.77Zm4.44,4a.79.79,0,1,1,.79,1.37l-1.75,1a.78.78,0,0,1-1.08-.29.79.79,0,0,1,.29-1.08l1.75-1ZM122.08,21a.8.8,0,1,1,0,1.59h-2a.8.8,0,0,1-.8-.8.79.79,0,0,1,.8-.79Zm-1.23,5.86a.79.79,0,1,1-.79,1.37l-1.76-1a.79.79,0,0,1-.28-1.08.78.78,0,0,1,1.08-.28l1.75,1Zm-4,4.44a.8.8,0,0,1-1.38.79l-1-1.76a.8.8,0,0,1,1.38-.79l1,1.76Zm-5.69,1.86a.8.8,0,1,1-1.59,0v-2a.8.8,0,1,1,1.59,0v2Zm-5.86-1.23a.79.79,0,0,1-1.37-.8l1-1.76a.8.8,0,0,1,1.08-.29.79.79,0,0,1,.28,1.08l-1,1.77Zm-4.44-4a.8.8,0,0,1-.8-1.38l1.75-1a.8.8,0,0,1,1.09.3.79.79,0,0,1-.3,1.08l-1.74,1ZM99,22.24a.8.8,0,0,1,0-1.6h2a.8.8,0,0,1,0,1.6Zm1.23-5.85a.8.8,0,0,1-.29-1.08A.79.79,0,0,1,101,15l1.75,1a.79.79,0,0,1,.29,1.08.79.79,0,0,1-1.08.28l-1.75-1ZM15.5,83.9H34.59l-5-12.21H21L15.5,83.9Zm6.42-24.11H14.59l.87,5.39h4l2.43-5.39ZM100.43,83.9l-5.5-12.21H86.31l-5,12.21Zm-4-18.72h4l.87-5.39H94l2.42,5.39ZM78.82,12.07a29.76,29.76,0,0,0-8.39-5.74,27.6,27.6,0,0,1,3.06,5.93,54.73,54.73,0,0,1,3,18.39h11a28.54,28.54,0,0,0-8.58-18.58Zm-15.64-8a33.37,33.37,0,0,0-3.37-.4v27H72.9a50.71,50.71,0,0,0-2.74-17.13c-1.57-4.21-3.88-7.47-7-9.44Zm-6.93-.41c-1.11.07-2.23.19-3.31.36-3.14,2-5.46,5.28-7,9.53a51.46,51.46,0,0,0-2.72,17.07H56.27v-27ZM45.72,6.25a29.52,29.52,0,0,0-8.57,5.84,28.56,28.56,0,0,0-8.6,18.56H39.63a55.21,55.21,0,0,1,2.94-18.32,26.22,26.22,0,0,1,3.15-6.08Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Terrace</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('barcounter')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m5.546,2.001s0,0,0,0c-.008,0-.004,0,0,0Zm17.454,10.499v6.5h-4v2.5c0,1.379-1.122,2.5-2.5,2.5H3.5c-1.378,0-2.5-1.121-2.5-2.5V6h1v-.5c0-1.93,1.436-3.499,3.545-3.499.007,0,.004,0,0,0,.711-1.226,2.03-2.001,3.454-2.001,1.551,0,2.932.892,3.589,2.27.457-.179.93-.27,1.411-.27,2.206,0,4,1.794,4,4h1v4h1.5c1.378,0,2.5,1.121,2.5,2.5ZM3,6h4v7.5c0,.827.673,1.5,1.5,1.5s1.5-.673,1.5-1.5v-7.5h7c0-1.654-1.346-3-3-3-.491,0-.975.13-1.438.385l-.534.295-.184-.581c-.398-1.255-1.541-2.099-2.844-2.099-1.158,0-2.223.685-2.715,1.744l-.151.324s-.579-.068-.634-.068c-1.378,0-2.5,1.121-2.5,2.5v.5Zm15,1h-7v6.5c0,1.379-1.122,2.5-2.5,2.5s-2.5-1.121-2.5-2.5v-6.5H2v14.5c0,.827.673,1.5,1.5,1.5h13c.827,0,1.5-.673,1.5-1.5V7Zm4,5.5c0-.827-.673-1.5-1.5-1.5h-1.5v7h3v-5.5Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Bar</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('matress')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m4.5,16h15.5c2.206,0,4-1.794,4-4V4c0-2.206-1.794-4-4-4H5.5C2.467,0,0,2.468,0,5.5v14c0,2.481,2.019,4.5,4.5,4.5h17c1.378,0,2.5-1.121,2.5-2.5s-1.122-2.5-2.5-2.5H4.5c-.276,0-.5.224-.5.5s.224.5.5.5h17c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5H4.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5Zm-3.5.675V5.5C1,3.019,3.019,1,5.5,1h14.5c1.654,0,3,1.346,3,3v8c0,1.654-1.346,3-3,3H4.5c-1.412,0-2.674.653-3.5,1.675Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Matress</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('projector')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={512} height={512}><path d="M24,12.5c0-1.379-1.121-2.5-2.5-2.5h-1.708c-.655-2.306-2.78-4-5.292-4s-4.637,1.694-5.292,4H2.5c-1.378,0-2.5,1.121-2.5,2.5v9.5H3v2h1v-2H20v2h1v-2h3V12.5ZM14.5,7c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5-4.5-2.019-4.5-4.5,2.019-4.5,4.5-4.5Zm8.5,14H1V12.5c0-.827,.673-1.5,1.5-1.5h6.523c-.015,.165-.023,.331-.023,.5,0,3.032,2.467,5.5,5.5,5.5s5.5-2.468,5.5-5.5c0-.169-.008-.335-.023-.5h1.523c.827,0,1.5,.673,1.5,1.5v8.5ZM5,14c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1ZM15,4h-1V0h1V4Zm3.933,1.322l-.865-.5,2-3.465,.865,.5-2,3.465Zm-8.866,0l-2-3.465,.866-.5,2,3.465-.866,.5Z" /></svg>
                                    </span>
                                    <span className="checkbox-label">Projector</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('oven')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m24,4.5c0-1.378-1.122-2.5-2.5-2.5H2.5c-1.378,0-2.5,1.122-2.5,2.5v16.5h3v2h1v-2h16v2h1v-2h3V4.5Zm-1,15.5H1V4.5c0-.827.673-1.5,1.5-1.5h19c.827,0,1.5.673,1.5,1.5v15.5Zm-20-2h15V5H3v13Zm1-12h13v11H4V6Zm16-1h1v13h-1V5Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Oven</span>
                                </span>
                            </label>
                            <label className="checkbox-wrapper">
                                <input {...register('pets')} type="checkbox" className="checkbox-input" />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#555555" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                            <path d="m22.118,5c-.51,0-.978-.3-1.19-.764-.345-.751-1.157-1.236-2.07-1.236h-.858V.941c0-.3-.144-.588-.386-.77-.236-.177-.531-.232-.81-.153-1.046.302-1.805,1.346-1.805,2.481v1.756l-.994,2.754c-.214.593-.781.991-1.411.991l-5.101.003c-1.707,0-3.234.784-4.243,2.008-.393-.233-2.255-1.498-2.255-4.512,0-.276-.224-.5-.5-.5S-.003,5.224-.003,5.5C-.003,8.91,2.041,10.44,2.688,10.839c-.439.79-.69,1.699-.69,2.665l.002,8.002c0,1.377,1.122,2.498,2.499,2.498s2.499-1.121,2.499-2.499v-3.506l7.003-.003v3.505c0,1.378,1.121,2.499,2.505,2.499s2.499-1.121,2.499-2.499l-.008-3.411,1.23-6.681c.044-.237.25-.409.492-.409,1.81,0,3.283-1.473,3.283-3.283v-.717c0-1.467-1.125-2-1.882-2Zm.882,2.717c0,1.259-1.024,2.283-2.283,2.283-.724,0-1.344.517-1.475,1.229l-1.239,6.771v3.501c0,.826-.672,1.499-1.505,1.499-.826,0-1.499-.672-1.499-1.499v-4.006c0-.133-.053-.26-.146-.354s-.221-.146-.354-.146h0l-8.003.004c-.276,0-.5.224-.5.5v4.006c0,.826-.672,1.499-1.499,1.499s-1.498-.672-1.499-1.498l-.002-8.002c0-2.48,2.017-4.5,4.498-4.501l5.101-.003c1.049,0,1.994-.664,2.351-1.651l1.023-2.836c.02-.055.03-.112.03-.17v-1.843c0-.689.465-1.342,1-1.559v2.559c0,.276.224.5.5.5h1.358c.515,0,.981.262,1.161.652.375.819,1.199,1.348,2.099,1.348.147,0,.882.048.882,1v.717Z" />
                                        </svg>
                                    </span>
                                    <span className="checkbox-label">Pets</span>
                                </span>
                            </label>
                        </div>

                        {/* IMAGE UPLOAD FORM  */}

                        <div className="input-field">
                            <label>Upload Images</label>
                            <label className="custum-file-upload" htmlFor="file">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                                </div>
                                <div className="text">
                                    <span>Upload image</span>
                                </div>
                                <input encType="multipart/form-data" name='images' type="file" id='file' className='imgUpload' multiple onChange={handleImgChange} />
                            </label>
                        </div>

                        {/* Display selected image previews */}

                        <div className="image-preview-container">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="img-preview">
                                    <label className="img-label">
                                        <img src={preview} alt={`Preview ${index}`} />
                                        <input className='img-input' type="checkbox" value="checked" checked={index === checkedIndex}
                                            onChange={() => handleCheckboxChange(index)} />
                                        <svg className='star-svg' height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z" /></g></g></svg>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* EXISTING IMAGES DISPLAY  */}
                    <div className="input-field">
                        <label>Existing Images </label>
                    </div>
                    <div className="image-preview-container">
                        {selectedVilla?.images?.map((image, index) => (
                            <div key={index} className="img-preview">
                                <label className="img-label">
                                    <img src={`${baseURL}${image}`} alt={`Preview ${index}`} />
                                    {index !== 0 ? <svg onClick={() => handleSetMainImage(index)} className='setMain-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={512} height={512}><g id="_01_align_center" data-name="01 align center"><path d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453ZM12,15.346l3.658,2.689-1.4-4.344L17.937,11H13.39L12,6.669,10.61,11H6.062l3.683,2.691-1.4,4.344Z" /></g></svg>
                                        : <svg onClick={() => handleSetMainImage(index)} className='setMain-svg' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={512} height={512}><path d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z" /></svg>
                                    }
                                    <svg onClick={() => handleDeleteImage(index)} className='delete-svg' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width={512} height={512}><path d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z" /><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" /></svg>
                                </label>
                            </div>
                        ))}
                    </div>

                    <button type='submit' className="nextBtn">
                        <span className="btnText">Update</span>
                        <i className="uil uil-navigator" />
                    </button>
                </form>
            </div>
        </>)
}

export default EditVilla