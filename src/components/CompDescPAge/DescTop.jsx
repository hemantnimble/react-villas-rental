import React, { useState } from 'react'
// import villaData from '../../../data';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



function DescTop() {
    const villaData = useSelector(state => state.villaInfo.villaInfo)
   
    const { villaId } = useParams();
    const villa = villaData.find((villa) => villa._id === villaId);
    const { images, thumbnail, mainImg2, mainImg3, driveLink, luxuryBadge } = villa
    const baseURL = 'http://localhost:3000/';

    const [modal, setModal] = useState(false);

    function handlePopUp() {
        setModal(true)
        document.body.classList.add('no-scroll');
    }

    function handleClose() {
        setModal(false)
        document.body.classList.remove('no-scroll');
    }

    const Modal = () => {
        return (
            <div className="popup-box">
                <div className="popup-content">
                    <div className="popup-header">
                        <span onClick={handleClose} className="popup-close-icon">x</span>
                    </div>
                    <div className="popup-body">
                        <div className="read-more-cont">
                            {
                                images.map((img, id) => {
                                    return <img key={id} src={`${baseURL}${img}`} alt="img" />
                                })
                            }
                            <div>
                                <a href={driveLink}>View
                                    More</a>
                            </div>
                        </div>
                    </div>
                    <div className="popup-footer">
                        <button onClick={handleClose} className="btn popup-close-btn">Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="images-main">
                <div className="image-1"><img src={`${baseURL}${images[0]}`} alt="img" />
                </div>
                <div className="image-2">{luxuryBadge &&
                    <div className="luxury-badge">
                        <img src={luxuryBadge} alt="" id="luxury-badge" />
                    </div>
                }
                    <img src={`${baseURL}${images[2]}`} alt="img" />
                    <button onClick={handlePopUp} className="btn" type="button">View Photos</button>
                </div>
                <div className="image-3"><img src={`${baseURL}${images[1]}`} alt="img" />
                </div>
            </div>
            {modal && <Modal />}

        </>

    )
}

export default DescTop