import React from 'react'
import { fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import '../../css/adminPage.css'
import { deleteVilla } from '../../features/villaInfo/villaInfoSlice'
import { Link, useParams } from 'react-router-dom'

function SideBar() {
    const dispatch = useDispatch();
    const villaData = useSelector(state => state.villaInfo.villaInfo);

    const { id } = useParams()


    useEffect(() => {
        if (!villaData.length) {
            dispatch(fetchAsync());
        }
    }, [dispatch]);

    const [edit, setEdit] = useState(null)


    function handleDelete(id) {
        dispatch(deleteVilla(id));
    }

    function handleEdit(id) {
        setEdit(villaData.find(data => data._id === id));
    }

    return (
        <aside className="sidebar">
            <h1>SideBar</h1>
            <p>Existing Villa Count: {villaData.length}</p>
            {villaData.map((data, _id) => (
                <div key={data._id} className="villa-item">
                    <h3>{data.name}</h3>
                    <Link to={`/edit/${data._id}`}>
                        <button style={{ marginRight: "25px" }} onClick={() => handleEdit(data._id)} >Edit Villa</button></Link>
                    <button onClick={() => handleDelete(data._id)}>Delete Villa</button>
                </div>
            ))}
        </aside>
    )
}

export default SideBar