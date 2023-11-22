import React from 'react'

function BottomNav() {
    return (
        <div className="bottom-contact">
            <div className="for-flex">
                <div className="whatsapp-bottom">
                    <a href="https://wa.me/918999130727?text=Hi...Came across your website.Want to enquire about Villas." target="_blank"><i className="fa-brands fa-whatsapp" />
                        <p>Whatsapp</p>
                    </a>
                </div>
                <div className="call-bottom">
                    <a href="tel:+91 8999 130 727"> <i className="bx bx-phone-call" />
                        <p>Call Now</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BottomNav;