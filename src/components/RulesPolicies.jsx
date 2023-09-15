import React, { useState } from 'react'

function RulesPolicies() {
    const [readMore, setreadMore] = useState(true);

    const [readMore2, setReadMore2] = useState(true);

    const openStyles = {
        display: 'inline'
    }




    return (
        <>
            {/* ...................................HOME RULES SECTION.....................  */}
            <div className="home-rules-main" id="homerules">
                <div className="home-rules-heading">
                    <p>HOME RULES</p>
                </div>
                <div className="rules-container">
                    <div className="rules">
                        <ol>
                            <li>This is not a pet-friendly property (extra security deposit will be
                                taken
                                for pets).</li>
                            <li>The caretaker stays on the premises of the same property.</li>
                            <li>Children should be supervised while they are in or around the pool.</li>
                            <li>Smoking and alcohol consuption is allowed in the villa.</li>
                            <li>Please do not carry food/drinks in
                                and
                                around
                                the
                                pool.</li>
                            <li>Please be mindful and keep noise to a minimum after 10 PM.</li>
                            <span className="read-more-text" style={readMore ? null : openStyles}>
                                <li>All mobile networks work fairly well here.</li>
                                <li>Guests are earnestly requested to treat the home with care.</li>
                                <li>We urge you to wear swimming attire in the pool and kindly shower
                                    before
                                    entering.
                                </li>
                                <li>Footwears not allowed inside villa</li>
                            </span>
                        </ol>
                        <span onClick={() => setreadMore(!readMore)} className="read-more-btn">{readMore ? 'Read More' : 'Read Less'}</span>
                    </div>
                    {/* ................................policy............  */}
                    <div className="home-rules-heading" id="policy">
                        <p>POLICY</p>
                    </div>
                    <div className="rules">
                        <ol>
                            <li>The advance payment must be made for your booking to be confirmed.</li>
                            <li>The number of guests must not exceed the count mentioned at the time of
                                booking or will be charge extra.</li>
                            <li>Only the guests who have been accounted for are allowed at the villa.
                            </li>
                            <li>All guests must be able to share valid ID proofs when asked upon
                                arrival.
                            </li>
                            <li>Any damage to the property caused by the guest will be charged as per
                                the
                                actual cost of repair or replacement.</li>
                            <span className="read-more-text" style={readMore2 ? null : openStyles}>
                                <li>Any illegal activity - including but not limited to prostitution and
                                    the
                                    use
                                    of narcotics - is strictly not permitted.</li>
                                <li>This security deposit amount is refunded at check-out time.</li>
                                <li>A refundable deposit may be collected before check-in.</li>
                            </span>
                        </ol>
                        <span onClick={() => setReadMore2(!readMore2)} className="read-more-btn">{readMore2 ? 'Read More' : 'Read Less'}</span>
                    </div>
                    {/* ........................payment policy...........  */}
                    <div className="payment-policy">
                        <div className="home-rules-heading">
                            <p>Payment &amp; Cancellation Policy</p>
                        </div>
                        <div className="rules">
                            <ol>
                                <li>Advance amount is necessary for booking confirmation.</li>
                                <li>For booking confirmation minimum 50% of total amount should be paid.</li>
                                {/* <li></li> */}
                                <li>Rest amount should be paid at time of check-in.</li>
                                <li>Security deposit is strictly needed.</li>
                                <li>Security deposit will be refunded at time of check-out.</li>
                                <li>No Security deposited returned against any damage to property.</li>
                                <li>No amount will be refunded against any cancelation.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RulesPolicies