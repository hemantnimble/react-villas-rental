import React, { useEffect } from 'react';
import AddVilla from './AddVilla';
import { Link } from 'react-router-dom';

function ControlPanel() {    

    return (
        <>
            <div>
                <h1>ControlPanel</h1>
                <AddVilla></AddVilla>
                <Link to="/">
                    <button>Home Page</button>
                </Link>
            </div>


        </>
    );
}

export default ControlPanel;
