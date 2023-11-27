import React, { useState } from 'react'

function Faqs() {

    const data = [
        {
            id: 1,
            question: '1. What is the process for booking a villa ?',
            answer: <>
                <ol>
                    <li>To Book a Villa <a href="tel:+91 8999 130 727"> Call</a> Or <a href="https://wa.me/918999130727?text=Hi...Want to enquire about your villas">WhatsApp</a>
                        Us
                        To Confirm Your Booking.</li>
                    <li> If The Villa selected by you is available on dates selected, you need to make
                        50%
                        of
                        total amount as advance for booking confirmation.</li>
                    <li>An Booking confirmation Message will be sent to you.</li>
                    <li>And your booking is CONFIRMED </li>
                </ol>
            </>
        },
        {
            id: 2,
            question: '2. How to make payment ?',
            answer: <>  You can pay through any upi payment app (eg.Gpay, PhonePe, Paytm, etc.) For Any
                assitance
                please
                call on <a href="tel:+91 8999 130 727"> +91 8999 130 727</a></>
        },
        {
            id: 3,
            question: '3. Does the price includes food ?',
            answer: <>  No, The Prices given are RENT price for villa. Food is not served in the Package, FOOD
                PACKAGES
                are to be buyied seperately if needed, you can also cook your own food in villa,
                utensils
                and
                gas stove will be there in villa, material required for making process should be
                arranged by
                guests on their own. <br /> Follow the links given to know about Food Packages:
                <a href="../Images/foodSection/SR FOOD PACKAGE.pdf">S &amp;R FOOD SERVICES</a></>
        },
        {
            id: 4,
            question: '4. What is the price range of villas ?',
            answer: <>  Our villas in Lonavala approximately range between Rs.7,000 per night to Rs.50,000+ per
                night,
                varying on multiple factors, including amenities offered, number of rooms and the
                location
                of
                the villa</>
        },
        {
            id: 5,
            question: ' 5. Which are the best recomended vilas ?',
            answer: <>Our villas in Lonavala are a perfect weekend getaway to calm your mind from all the city
                stress.
                From amazing views, private pools &amp; gourmet meals, here are some of the best villas in
                Lonavala
                <a href="Heramb villa.html">Heramb, </a> <a href="taj.html">Taj, </a> <a href="jannat.html">Jannat, </a> <a href="anjum.html">Anjum, </a> <a href="mountainmist.html">Mountain Mist</a></>
        },
    ]

    const [body, setBody] = useState(false);

    function handleClick(id) {

        if (body === id) {
            return setBody(null)
        }

        setBody(id)
    }

    return (
        <>
            <div className="faqs" id="faqs">
                <h1>FAQs</h1>
                {data.map((faq, id) => {
                    return <div key={faq.id} className="accordion">
                        <div className="accordion-item">
                            <div className="accordion-item-header" onClick={() => handleClick(faq.id)}>
                                {faq.question}
                            </div>
                            <div className="accordion-item-body">
                                <div className="accordion-item-body-content">
                                    {body === faq.id ? (faq.answer) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>

        </>
    )
}

export default Faqs