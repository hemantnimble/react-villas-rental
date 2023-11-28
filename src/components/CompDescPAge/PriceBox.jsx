import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PriceBox() {
    const villaData = useSelector(state => state.villaInfo.villaInfo)

    const { villaId } = useParams();
    const villa = villaData.find((villa) => villa._id === villaId)
    const { price, price_capacity, weekday_price, del_price, looking } = villa
   
    return (

        <div className="main-left">
            <div className="heading-one">
                <p className="del-price">₹{del_price}</p>
                <p className="main-price">₹{price}<span className="after-price">/per-night
                    (Week-END/Holiday)</span>
                </p>
                <p className="main-price-wkday">₹{weekday_price}<span className="after-price">/-per-night
                    (Week-DAY)</span>
                </p>
                <p className="above-price-main">Price given above is for upto <span className="above-guests"> {price_capacity} Guests</span></p>
                <p>Above {price_capacity} Guests : </p>
                <div className="extra-guests-charge">
                    <p className="extra-guest-prc">₹1,000 <span className="after-price">per-person(weekend/holiday)</span> </p>
                    <p className="extra-guest-prc">₹500 <span className="after-price">per-person(weekdays)</span>
                    </p>
                </div>
            </div>
            <div className="looking">
                <div className="look-image"><img src="../Images/Icons/binocular-nobg.png" alt="" /></div>
                <div>
                    <p className="look-text">{looking} others are looking at this property.</p>
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