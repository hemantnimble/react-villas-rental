import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchVillaById, singleVillaById } from '../../features/villaInfo/villaInfoSlice';




function PriceBox() {

    const dispatch = useDispatch();
    const { villaId } = useParams();
    
    useEffect(() => {
        if (villaData === null) {
            dispatch(fetchVillaById(villaId));
        }
    }
    ), [dispatch, villaId]
    
    const villaData = useSelector(singleVillaById)

    const {  aboveguests, weekdayprice, weekendprice, } = villaData

    return (

        <div className="main-left">
            <div className="heading-one">
                <p className="del-price">₹del price</p>
                <p className="main-price">₹{weekendprice}<span className="after-price">/per-night
                    (Week-END/Holiday)</span>
                </p>
                <p className="main-price-wkday">₹{weekdayprice}<span className="after-price">/-per-night
                    (Week-DAY)</span>
                </p>
                <p className="above-price-main">Price given above is for upto <span className="above-guests"> {aboveguests} Guests</span></p>
                <p>Above {aboveguests} Guests : </p>
                <div className="extra-guests-charge">
                    <p className="extra-guest-prc">₹1,000 <span className="after-price">per-person(weekend/holiday)</span> </p>
                    <p className="extra-guest-prc">₹500 <span className="after-price">per-person(weekdays)</span>
                    </p>
                </div>
            </div>
            <div className="looking">
                <div className="look-image"><img src="../Images/Icons/binocular-nobg.png" alt="" /></div>
                <div>
                    <p className="look-text">12 others are looking at this property.</p>
                </div>
            </div>
            <div className="book-now">
                <p className="confirm-text">Confirm Your Booking Before Someone Else Does</p>
                <a href="tel:+918999 130 727"> <button><i className="fa-solid fa-phone" />Call
                    Now</button></a>
                <a href="https://wa.me/918999130727?text=Hello !                                                              I want to know more about Mountain Mist Villa.">
                    <button><i className="fa-brands fa-whatsapp" />Chat With Us</button></a>
            </div>
            <div className="discount-main">
                <div className="sec-dis">
                    <div className="dis-head">
                        <p>NEED DISCOUNT ? </p>
                    </div>
                    <div className="dis-img">
                        <img src="../Images/Icons/10dis.png" alt="" />
                    </div>
                </div>
                <div className="disc-text">
                    {/* <p class="ten-percent"> Get 10 % OFF</p> */}
                    <p className="avail-dis"> Book Early To Avail Discount</p>
                </div>
            </div>
        </div>
    )
}

export default PriceBox