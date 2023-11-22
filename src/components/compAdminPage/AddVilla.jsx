import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice';
import { useForm } from "react-hook-form";
import axios from 'axios';


function AddVilla() {

    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo); 4

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    // const [input, setinput] = useState(villaData);
    // const [img, setimg] = useState(villaData);


    // function handleChange(e) {
    //     setinput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    // }
    async function OnSubmit(values) {
        if (values == '') {
            alert("Enter Information")
        }
        else {
            await dispatch(addNewVilla(values));
            await dispatch(fetchAsync());
        }

    }

    async function uploadImages(e) {
        e.preventDefault();
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }
        axios.post('http://localhost:3000/villas/uploadimages', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            console.log(response)
            // onChange(prev => {
            //     return [...prev, ...filenames];
            // });
        })
        // const files = e.target.files;
        // const data = new FormData();
        // data.set('images', files);

    }

    return (
        <div className="add-villa-container">
            <h1>Add Villa</h1>
            <form className="add-villa-form" onSubmit={handleSubmit(OnSubmit)}>
                <input {...register('name', { required: "Please Enter  Name" })} type="text" placeholder="Villa Name" />
                {errors.name && <p className='field-errors'>{errors.name.message}</p>}
                <input {...register('bhk', { required: "Please Enter Your Name" })} type="text" placeholder="Bhk?" />
                <input {...register('capacity', { required: "Please Enter Your Name" })} type="text" placeholder="Capacity" />
                <input {...register('price', { required: "Please Enter Your Name" })} type="text" placeholder="Price" />
                <input {...register('driveLink', { required: "Please Enter Your Name" })} type="text" placeholder="Drive Link" />
                <label>
                    <input name='images' type="file" multiple onChange={uploadImages} />
                </label>
                <button type="submit">Add Villa</button>
            </form>
        </div>
    )
}

export default AddVilla