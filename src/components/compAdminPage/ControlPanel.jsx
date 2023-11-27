import React, { useEffect } from 'react';
import AddedVillas from './AddedVillas';
import { Link } from 'react-router-dom';
import '../../css/adminPage.css'

function ControlPanel() {

    return (
        <>
            <h1><i className="fa-solid fa-sliders"></i> Control Panel</h1>
            <AddedVillas></AddedVillas>
        </>
    );
}

export default ControlPanel;
