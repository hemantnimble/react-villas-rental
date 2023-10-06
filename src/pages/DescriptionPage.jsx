import React from 'react'
import NavBar from '../components/NavBar'
import DescTop from '../components/CompDescPAge/DescTop'
import '../css/description.css'
import PriceBox from '../components/CompDescPAge/PriceBox'
import Footer from '../components/Footer'
import FoodMenu from '../components/CompDescPAge/FoodMenu'
import RulesPolicies from '../components/RulesPolicies'
import NearByPlaces from '../components/CompDescPAge/NearByPalces'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function DescriptionPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }
    ), []

    const villaData = useSelector(state => state.villaInfo.villaInfo)

    const { villaId } = useParams();
    const villa = villaData.find((villa) => villa.id === villaId);
    const { name, bhk, baths, hall, capacity, about, location } = villa

    return (
        <>
            <NavBar></NavBar>
            <div className="for-footer-l" style={{ background: "white" }} >
                <div className="body-main">
                    <DescTop></DescTop>
                    <div className="villas-information-main-container">
                        <div className="left-side-box">
                            <div className="villa-name">
                                <p>{name}</p>

                            </div>
                            <div className="location-name">
                                <p> Malavli, Lonavala </p>
                            </div>
                            <div className="timing">
                                <div className="timing-icons"><i className="fa-solid fa-clock"></i>
                                    <p> Check IN Time : 1 PM.</p>
                                </div>
                                <div className="timing-icons"><i className="fa-solid fa-clock"></i>
                                    <p>Check OUT Time : 11 AM.</p>
                                </div>
                                <div className="extend-time">
                                    <p>
                                        (Extend Given Time Will Charge Extra)
                                    </p>
                                </div>
                            </div>
                            {/* mid line  */}
                            <div className="mid-line">
                                <ol>
                                    <li>Entire Villa</li>
                                    <li>{bhk}</li>
                                    <li>{hall}</li>
                                    <li>{baths}</li>
                                    <li>Pvt Pool</li>
                                </ol>
                            </div>
                            <div className="right-side-box-phone">
                                <div className="main-left">
                                    <PriceBox />
                                </div>
                            </div>

                            <div className="info-icons">
                                <div className="icons-main">
                                    <div className="info-icons-sec"><i className="fa-solid fa-users" id="first-icon"></i>
                                        <p>{capacity}</p>
                                    </div>
                                    <div className="info-icons-sec"> <i className="fa-sharp fa-solid fa-house" id="second-icon"></i>
                                        <p>{bhk}</p>
                                    </div>
                                    <div className="info-icons-sec"><i className="fa-sharp fa-solid fa-person-swimming"
                                        id="third-icon"></i>
                                        <p>Private Pool</p>
                                    </div>
                                    <div className="info-icons-sec"> <i className="fa-solid fa-wifi" id="forth-icon"></i>
                                        <p> Wifi</p>
                                    </div>
                                </div>
                            </div>
                            <div className="secnav">
                                <div className="sec-header">
                                    <nav className="sec-nav">
                                        <ol>
                                            <li><a href="#about">About</a>
                                            </li><li>
                                            </li><li><a href="#aminities">Aminities</a>
                                            </li><li>
                                            </li><li><a href="#meals">Meals</a>
                                            </li><li>
                                            </li><li><a href="#location">Location</a>
                                            </li><li>
                                            </li><li><a href="#homerules">Homes Rules</a>
                                            </li><li>
                                            </li><li><a href="#policy">Policy</a>
                                            </li><li>
                                            </li>
                                        </ol>
                                    </nav>
                                    {/* ....................about villa section............  */}
                                    <div className="abot-main" id="about">
                                        <p className="about-heading">About</p>
                                        <p className="about-text">{about}</p>
                                    </div>
                                    {/* ............................... AMINITIES........................  */}
                                    <div className="aminities">
                                        <div className="aminities-heading" id="aminities">
                                            <p>Aminities</p>
                                        </div>
                                        <div className="aminities-icons-texts">
                                            <div className="aminities-icons-sec"><i> <img src="../Images/Icons/grass.png" alt="grass" /> </i>
                                                <p>Lawn / Garden</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i className="fa-solid fa-kitchen-set" />
                                                <p> Fully Equiped Kitchen</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i className="fa-solid fa-snowflake" />
                                                <p>AC in all Bedrooms</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i> <img src="../Images/Icons/grill.png" alt="" />
                                            </i>
                                                <p>Bbq Grill</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i className="fa-solid fa-square-parking" />
                                                <p>Parking Space</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i className="fa-solid fa-droplet" />
                                                <p>Geysers for Hot Water</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i className="fa-solid fa-tv" />
                                                <p>LED Tv</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i className="fa-solid fa-glass-water" />
                                                <p>Water Purifier</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i> <img src="../Images/Icons/battery.png" alt="" />
                                            </i>
                                                <p>Inverter Backup</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i> <img src="../Images/Icons/speaker.png" alt="" />
                                            </i>
                                                <p>Music System</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i> <img src="../Images/Icons/bonfire.png" alt="" />
                                            </i>
                                                <p>Bonfire Pit</p>
                                            </div>
                                            <div className="aminities-icons-sec"><i> <img src="../Images/Icons/mountains.png" alt="" />
                                            </i>
                                                <p>Mountain View</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ...................................GOOGLE MAP LOCATION SECTION..................  */}
                                    <div className="google-map">
                                        <div className="location-heading" id="location">
                                            <p> Location</p>
                                        </div>
                                        <iframe className="loc-window" src={location} width={600} height={200} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                    </div>
                                    <FoodMenu></FoodMenu>
                                    <RulesPolicies></RulesPolicies>
                                </div>
                            </div>
                        </div>
                        <div className="right-side-box">
                            <div className="main-left">
                                <PriceBox></PriceBox>
                            </div>
                        </div>
                    </div>
                    <NearByPlaces></NearByPlaces>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default DescriptionPage