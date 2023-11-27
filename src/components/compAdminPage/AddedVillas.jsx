import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteVilla, fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { Link, useParams } from 'react-router-dom'

function AddedVillas() {
    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo);
    const baseURL = 'http://localhost:3000/';

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
            {/* <div className="cardholder">
                {
                    villaData.map((data) => {
                        const firstImage = data.images?.length > 0 ? data.images[0] : null;

                        return <div key={data._id} className="card">
                            <Link to={`/${data._id}`}>
                                <div className="card-image">
                                    <div className="best-rated">
                                        {data.bestbadge &&
                                            <img src={data.bestbadge} alt="" />}
                                    </div>
                                    {data.luxuryBadge &&
                                        <div className="luxury-badge">
                                            <img src={data.luxuryBadge} alt="" />
                                        </div>
                                    }
                                    <img src={`${baseURL}${firstImage}`} alt="" />
                                </div>
                                <div className="mar">
                                    <div className="villa-name-main">
                                        <p className="villa-name"> {data.name}</p>
                                    </div>
                                    <div className="discription">
                                        <p>{data.bhk}</p>
                                    </div>
                                    <div className="villa-price-main">
                                        <p className="price">Weekends : ₹{data.price}</p>
                                        <p className="weekday-price">Weekdays : ₹{data.price}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="admin-card-buttons" style={{ margin: "0px 25px" }}>
                                <button style={{ marginRight: "25px" }} onClick={() => handleEdit(data._id)} >
                                    <Link to={`/edit/${data._id}`}>Edit Villa </Link>
                                </button>
                                <button onClick={() => handleDelete(data._id)}>Delete Villa</button>
                            </div>
                        </div>
                    })
                }
            </div> */}
            <div className="admin-cardholder">
                {
                    villaData.map((data) => {
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


            {/* <div className="cardholder">
                <div className="admin-card">
                    <div className="admin-card-image">
                        <img src='Images/thumbnails/heramb.jpg' alt="Image" />
                    </div>
                    <div className="admin-card-details">
                        <h2>Heramb Villa</h2>
                        <p>2 BHK</p>
                        <div className="admin-card-buttons">
                            <button >Edit</button>
                            <button >Delete</button>
                        </div>
                    </div>
                </div>

            </div> */}
        </>
    )
}

export default AddedVillas