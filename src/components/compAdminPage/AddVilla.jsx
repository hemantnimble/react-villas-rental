import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewVilla } from '../../features/villaInfo/villaInfoSlice'

function AddVilla() {

    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo)

    // let initialState = {
    //     name: '',
    //     thumbnail: 'Images/thumbnails/heramb.jpg',
    //     mainImg2: 'Images/villas/Heramb villa/IMG-20220708-WA0061.jpg',
    //     mainImg3: 'Images/villas/Heramb villa/IMG-20220708-WA0072.jpg',
    //     driveLink: '',
    //     bestbadge: 'Images/Icons/best_rated_tag.svg',
    //     about: 'Mountain Mist is a luxurious private villa to relax and rendezvous with lush green surroundings in Pawna/Lonavala. It is a 4BHK luxurious villa with a lawn, swimming pool & many more amenities.',
    //     del_price: '17,000',
    //     price: '',
    //     weekday_price: '8,000',
    //     bhk: '',
    //     baths: '3',
    //     hall: '1 Hall',
    //     looking: '18',
    //     location: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3778.1008679000097!2d73.47344!3d18.749031000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDQ0JzU2LjUiTiA3M8KwMjgnMjQuNCJF!5e0!3m2!1sen!2sin!4v1677838168553!5m2!1sen!2sin',
    //     capacity: '',
    //     price_capacity: '10',
    //     description: 'Heramb is a 2 BHK villa with Private Pool. Best suited for small group. Also has an Bath Tub to relax and enjoy.',
    //     images: [
    //         "Images/villas/Heramb villa/IMG-20220708-WA0070.jpg",
    //         "Images/villas/Heramb villa/IMG-20220708-WA0071.jpg",
    //         "Images/villas/Heramb villa/IMG-20220708-WA0072.jpg",
    //         "Images/villas/Heramb villa/IMG-20220708-WA0060.jpg",
    //     ],
    // }

    const [input, setinput] = useState(villaData)

    function handleChange(e) {
        setinput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (input === '') {
            alert("Enter Information")
        }
        else {
            dispatch(addNewVilla(input));
            setinput('');
        }
    }

    return (
        <div className="add-villa-container">
            <h1>Add Villa</h1>
            <form className="add-villa-form" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="Villa Name" name="name" />
                <input onChange={handleChange} type="text" placeholder="Bhk?" name="bhk" />
                <input onChange={handleChange} type="text" placeholder="Capacity" name="capacity" />
                {/* <input onChange={handleChange} type="text" placeholder="ID" name="id" /> */}
                <input onChange={handleChange} type="text" placeholder="Price" name="price" />
                <input onChange={handleChange} type="text" placeholder="Drive Link" name="driveLink" />
                {/* <input
                    type="file"
                    accept="image/*"
                    multiple
                /> */}
                <button type="submit">Add Villa</button>
            </form>
        </div>
    )
}

export default AddVilla