import React from 'react'

function Footer() {
    return (
        <footer>
            <div className="content">
                <div className="for-line-foot" />
                <div className="top">
                    <div className="logo-details">
                        <span className="logo_name">VillasRrental.</span>
                    </div>
                    <div className="media-icons">
                        <a href="https://www.facebook.com/villasrental.in"><i className="fab fa-facebook-f" /></a>
                        <a href="https://wa.me/918999130727?text=Hi...Want to enquire about your villas"><i className="fab fa-whatsapp" /></a>
                        <a href="https://instagram.com/villasrental.in?igshid=ZDdkNTZiNTM="><i className="fab fa-instagram" /></a>
                        <a href="tel: +91 8999 130 727"><i className="fa-solid fa-phone-volume" /></a>
                    </div>
                </div>
                <div className="link-boxes">
                    <ul className="box">
                        <li className="link_name">Site Map</li>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="tel: +91 8999 130 727">Contact us</a></li>
                        <li><a href="#about">About us</a></li>
                        <li><a href="#faqs">Faqs</a></li>
                    </ul>
                    <ul className="box">
                        <li className="link_name">Services</li>
                        <li><a href="../Images/foodSection/SR FOOD PACKAGE.pdf">Food Packages</a></li>
                        <li><a href="../Images/foodSection/menucard.pdf">Custom Dishes</a></li>
                        <li><a href="tel: +91 8999 130 727">Cook</a></li>
                        <li><a href="tel: +91 8999 130 727">Contact</a></li>
                    </ul>
                    <ul className="box">
                        <li className="link_name">Best Rated</li>
                        <li><a href="anjum.html">Anjum_Villa</a></li>
                        <li><a href="mountainmist.html">Mountain_Mist</a></li>
                        <li><a href="jannat.html">Jannnat_Villa</a></li>
                        <li><a href="taj.html">Taj_Villa</a></li>
                    </ul>
                    <ul className="box">
                        <li className="link_name">Contact Us</li>
                        <li><a href="https://wa.me/918999130727?text=Hi...Want to enquire about your villas">WhatsApp</a>
                        </li>
                        <li><a href="tel: +91 8999 130 727">Call</a></li>
                        <li><a href="mailto:hemantnimble@villasrental.in">Email</a></li>
                    </ul>
                </div>
            </div>
            <div className="bottom-details">
                <div className="bottom_text">
                    <span className="copyright_text">Copyright © 2023 VillasRental.in All rights
                        reserved</span> <br />
                    <a href="https://wa.me/918484915989?"> Designed by Hemant Nimble.</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer