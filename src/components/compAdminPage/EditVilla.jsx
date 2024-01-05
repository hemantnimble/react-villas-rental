import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function EditVilla() {

    const { villaId } = useParams();

    const dispatch = useDispatch();
    const [updatedVilla, setUpdatedVilla] = useState({});
    const villaData = useSelector(state => state.villaInfo.villaInfo);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (villaId) {
            const singleVilla = villaData.find((data) => data._id === villaId);
            setUpdatedVilla(singleVilla);
            console.log(singleVilla)
        }
    }, [villaId, villaData]);


    function handleChange(e) {
        setUpdatedVilla({
            ...updatedVilla,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateVilla({ id: villaId, updatedVilla }));
        await dispatch(fetchAsync())
        navigate('/');
        setUpdatedVilla('');
    }

    // console.log(updatedVilla)

    return (
        <div className="add-villa-container">
            <h1>Edit Villa</h1>
            <form className="add-villa-form" onSubmit={handleUpdate}>
                <input onChange={handleChange} value={updatedVilla.name || ''} type="text" placeholder="Villa Name" name="name" />
                <input onChange={handleChange} value={updatedVilla.bhk || ''} type="text" placeholder="Bhk?" name="bhk" />
                <input onChange={handleChange} value={updatedVilla.capacity || ''} type="text" placeholder="Capacity" name="capacity" />
                <input onChange={handleChange} value={updatedVilla.weekendprice || ''} type="text" placeholder=" Weekend Price" name="price" />
                <input onChange={handleChange} value={updatedVilla.drivelink || ''} type="text" placeholder="drivelink" name="drivelink" />
                <button type="submit">Edit Villa</button>
            </form>
            <Link to="/admin">
                <button style={{ marginTop: "20px" }}>Admin Page</button>
            </Link>
            <Link to="/">
                <button style={{ marginTop: "20px" }}>Home Page</button>
            </Link>
        </div>

    )
}

export default EditVilla