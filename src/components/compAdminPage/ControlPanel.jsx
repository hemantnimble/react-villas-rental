import React from 'react'
import AddVilla from './AddVilla'
import { Link } from 'react-router-dom'

function ControlPanel() {
    return (
        <>
            <div style={{ margin: "auto", marginLeft: "17rem", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <h1>ControlPanel</h1>
                <AddVilla></AddVilla>
                <Link to="/">
                    <button>Home Page</button>
                </Link>
            </div>
        </>
    )
}

export default ControlPanel