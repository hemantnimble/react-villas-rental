import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice';

function AddVilla() {

    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo)


    const [input, setinput] = useState(villaData);
    const [img, setimg] = useState(villaData);

    function handleImgChange(e) {
        setimg(e.target.files[0]);
    }

    function handleChange(e) {
        setinput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (input === '') {
            alert("Enter Information")
        }
        else {
            // const formdata = new FormData();
            // formdata.append('images', img);
            // console.log(img)
            await dispatch(addNewVilla(input));
            setinput('');
            await dispatch(fetchAsync());
        }

    }
    // async function handleImgsubmit(e) {
    //     e.preventDefault();
    //     const formdata = new FormData();
    //     formdata.append('images', img);
    //     await axios.post('http://localhost:3000/upload', formdata)
    //         // .then(res => console.log(res))
    //         // .catch(err => console.log(err))
    // }

    return (
        <div className="add-villa-container">
            <h1>Add Villa</h1>
            <form className="add-villa-form" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" placeholder="Villa Name" name="name" />
                <input onChange={handleChange} type="text" placeholder="Bhk?" name="bhk" />
                <input onChange={handleChange} type="text" placeholder="Capacity" name="capacity" />
                <input onChange={handleChange} type="text" placeholder="Price" name="price" />
                <input onChange={handleChange} type="text" placeholder="Drive Link" name="driveLink" />
                <input name='images' type="file" accept="image/*" multiple onChange={handleImgChange} />
                <button type="submit">Add Villa</button>
            </form>
            {/* <form className="add-villa-form" onSubmit={handleImgsubmit} encType="multipart/form-data">
                <input name='images' type="file" accept="image/*"  onChange={handleImgChange} />

                <button type="submit">Add Villa</button>
            </form> */}
        </div>
    )
}

export default AddVilla