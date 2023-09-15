import React from 'react'

function NearByPalces() {
    return (
        <div className="nearby-places-mainbox">
            <div className="home-rules-heading">
                <p>Nearby Places To Visit</p>
            </div>
            <div className="nearby-places">
                <div className="nearby-images swiper-slide">
                    <img src="../Images/nearbyplaces/pawnadam.jpg" alt="" />
                    <p>Pawna Dam</p>
                    <p className="type">Water Bodies</p>
                </div>
                <div className="nearby-images swiper-slide">
                    <img src="../Images/nearbyplaces/lohagad.jpg" alt="" />
                    <p>Lohagad Fort</p>
                    <p className="type">Historic Sites</p>
                </div>
                <div className="nearby-images swiper-slide">
                    <img src="../Images/nearbyplaces/Lions_Point.jpg" alt="" />
                    <p>Lions Point</p>
                    <p className="type">Sights &amp; Landmark</p>
                </div>
                <div className="nearby-images swiper-slide">
                    <img src="../Images/nearbyplaces/Karla_Caves.jpg" alt="" />
                    <p>Karla Caves</p>
                    <p className="type">Nature &amp; Parks</p>
                </div>
                <div className="nearby-images swiper-slide">
                    <img src="../Images/nearbyplaces/Bhaja_Caves.jpg" alt="" />
                    <p>Bhaja Caves</p>
                    <p className="type">Nature &amp; Parks</p>
                </div>
            </div>
        </div>)
}

export default NearByPalces