import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

function AddedVillas() {
    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo);
    const status = useSelector(state => state.villaInfo.status);

    // Ensure villas is an array
    const villas = Array.isArray(villaData) ? villaData : [];
    const baseURL = 'http://localhost:3000/';

    const { id } = useParams()


    useEffect(() => {
        if (!villas.length) {
            dispatch(fetchAsync());
        }
    }, [dispatch]);

    const [edit, setEdit] = useState(null)


    async function handleDelete(id) {
        await dispatch(deleteVilla(id));
        await dispatch(fetchAsync());

    }

    function handleEdit(id) {
        setEdit(villas.find(data => data._id === id));
    }

    useEffect(() => {
        if (status === 'deletesuccess') {
            toast.success('Villa deleted successfully');
        } else if (status === 'deleterejected') {
            toast.error('Error deleting villa');
        }
    }, [status]);;
    return (
        <>
            <p>Existing Villa Count: {villas.length}</p>
            <div className="admin-cardholder">
                {
                    villas.map((data) => {
                        const firstImage = data.images?.length > 0 ? data.images[0] : null;

                        return <div key={data._id} className="admin-card">
                            <div className="admin-card-image">
                                <img src={`${baseURL}${firstImage}`} alt="Image" />
                            </div>
                            <div className="admin-card-details">
                                <h2>{data.name}</h2>
                                <p>{data.bhk} BHK</p>
                                <div className="admin-card-buttons">
                                    <Link to={`/edit/${data._id}`}>
                                        <button onClick={() => handleEdit(data._id)}>Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(data._id)}>Delete</button>                            </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default AddedVillas