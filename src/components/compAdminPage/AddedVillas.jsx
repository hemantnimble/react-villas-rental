import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { Link, useParams } from 'react-router-dom'

function AddedVillas() {
    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo);

    const { id } = useParams()


    useEffect(() => {
        if (!villaData.length) {
            dispatch(fetchAsync());
        }
    }, [dispatch]);

    const [edit, setEdit] = useState(null)


    async function handleDelete(id) {
        await dispatch(deleteVilla(id));
        await dispatch(fetchAsync());

    }

    function handleEdit(id) {
        setEdit(villaData.find(data => data._id === id));
    }
    return (
        <>
            <p>Existing Villa Count: {villaData.length}</p>
            {villaData.map((data, _id) => (
                <div key={data._id} className="villa-item">
                    <h3>{data.name}</h3>
                    {/* <img src={data.thumbnail} alt="" /> */}
                    <Link to={`/edit/${data._id}`}>
                        <button style={{ marginRight: "25px" }} onClick={() => handleEdit(data._id)} >Edit Villa</button></Link>
                    <button onClick={() => handleDelete(data._id)}>Delete Villa</button>
                </div>
            ))}
        </>
    )
}

export default AddedVillas