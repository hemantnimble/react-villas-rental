import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import RulesPolicies from '../components/RulesPolicies'
import Footer from '../components/Footer'

function AboutPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }), []

    return (
        <>
            <NavBar></NavBar>
            <div className="abt-mainn" style={{background:'white', marginBottom:'450px'}}>
                <img src="Images/thumbnails/about2.png" style={{ width: '100%', marginTop: '60px' }} alt="" />
                <div className="body-main">
                    <RulesPolicies></RulesPolicies>
                </div>
            </div>
            <Footer></Footer>
        </>

    )
}

export default AboutPage