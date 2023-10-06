import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVilla } from '../../features/villaInfo/villaInfoSlice'
import { Link, useParams } from 'react-router-dom';

function EditVilla() {

    const { villaId } = useParams();

    const dispatch = useDispatch();
    const [updatedVilla, setUpdatedVilla] = useState({});
    const villaData = useSelector(state => state.villaInfo.villaInfo);


    useEffect(() => {
        if (villaId) {
            const singleVilla = villaData.find((data) => data.id === villaId);
            setUpdatedVilla(singleVilla);
        }
    }, []);


    function handleChange(e) {
        setUpdatedVilla({
            ...updatedVilla,
            [e.target.name]: e.target.value
        })
    }
    function handleUpdate(e) {
        e.preventDefault();
        dispatch(updateVilla(updatedVilla))
        // setinput('')
    }

    return (
        <div className="add-villa-container">
            <h1>Edit Villa</h1>
            <form className="add-villa-form" onSubmit={handleUpdate}>
                <input onChange={handleChange} value={updatedVilla.name || ''} type="text" placeholder="Villa Name" name="name" />
                <input onChange={handleChange} value={updatedVilla.bhk || ''} type="text" placeholder="Bhk?" name="bhk" />
                <input onChange={handleChange} value={updatedVilla.capacity || ''} type="text" placeholder="Capacity" name="capacity" />
                <input onChange={handleChange} value={updatedVilla.id || ''} type="text" placeholder="ID" name="id" />
                <input onChange={handleChange} value={updatedVilla.price || ''} type="text" placeholder="Price" name="price" />
                <button type="submit">Edit Villa</button>
            </form>
            <Link to="/admin">
                <button style={{marginTop:"20px"}}>Admin Page</button>
            </Link>
        </div>

    )
}

export default EditVilla