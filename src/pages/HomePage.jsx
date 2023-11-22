import React from 'react'
import Card from '../components/compMainPage/Card'
import '../css/mainPage.css'
import NavBar from '../components/NavBar'
import Faqs from '../components/Faqs'
import Footer from '../components/Footer'
import { useState } from 'react'
import BottomNav from '../components/BottomNav'

function HomePage() {


  const [navbar, setNavbar] = useState();

  function changebackground(e) {
    e.preventDefault();
    if (window.scrollY >= 480) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', changebackground)

  return (
    <div className="bodymainn">
      <NavBar navbar={navbar}  ></NavBar>
      <div className="topimage-main">
        {/* <div className="loader" id="loader-main">
          <a href="index.html">
            <div className="logo-preload">
              <div className="logo-img-preload">
                <img src="../Images/Logo/logoloc.png" alt="logo" />
              </div>
              <div className="logo-text-preload">
                <p> Villas Rental </p>
              </div>
            </div>
          </a>
        </div> */}
        <div className="topimage">
          <div className="text-on-image">
            <p className="primary-text">Looking for your next escape ?</p>
            <p className="sec-text">Luxury vacation home rentals curated by Villas Rental.</p>
          </div>
        </div>
      </div>
      <div>
        {/* ........................... VILLAS SEARCH BOX..............  */}
        <div className="villa-search-main">
          <div className="search-box">
            <div className="src-text">
              <p>Let's find some place beautiful, to get lost.</p>
            </div>
            <div className="people">
              <input type="number" placeholder="No. of people" />
            </div>
            <div className="rooms">
              <label htmlFor="btn">No. of rooms</label>
              <input type="checkbox" id="btn" />
              <ul>
                <li><a href="2bhk.html">2 Bhk</a></li>
                <li><a href="3bhk.html">3 Bhk</a></li>
                <li><a href="4bhk.html">4 Bhk</a></li>
                <li><a href="5bhk.html">5 Bhk</a></li>
              </ul>
            </div>
            <div className="src-btn">
              <a href="#ourvillas" style={{ color: 'white' }} >
                <p>Search</p>
              </a>
            </div>
          </div>
        </div>
        {/* .......................about .......................  */}
        <div className="about-main" id="about">
          <div className="linear">
            <div className="about-discription">
              <h2>Villas Rental</h2>
              <p>The best of Villas Rental-Offering you the budget friendly villas with home like stay and
                best
                services</p>
              <a href="#ourvillas"><button><span>Explore Villas</span></button></a>
            </div>
          </div>
        </div>
      </div>
      <div className="ourvillasheading" id="ourvillas">
        {/* <!-- <img src="../Images/Icons/arrow.png" style="width: 280px; margin-left: 72px;" alt=""> --> */}
        <p>-Explore Our collection-</p>

      </div>
      <div className="cardholder">
        <Card></Card>
      </div>
      <div>
        {/* .......................................why book with us.....................  */}
        <img src="../Images/thumbnails/strip.png" alt="" style={{ width: '100%', marginBottom: '-8px' }} />
        <div className="book-main" style={{ position: 'relative' }}>
          <div className="book-head">
            <h1>- Why Book With Us -</h1>
          </div>
          <div className="icons-book-main">
            <div className="book-icons">
              <div className="circle"><i className="fa-solid fa-money-bill-wave" /></div>
              <p>Budget Friendly</p>
            </div>
            <div className="book-icons">
              <div className="circle"><i className="fa-brands fa-google-pay" /></div>
              <p> Secure Payments</p>
            </div>
            <div className="book-icons">
              <div className="circle"><i className="fa-solid fa-face-smile" /></div>
              <p>User Friendly Policy</p>
            </div>
            <div className="book-icons">
              <div className="circle"><i className="fa-solid fa-clipboard-check" /></div>
              <p> Quick Confirmation</p>
            </div>
            <div className="book-icons">
              <div className="circle"><i className="fa-solid fa-thumbs-up" /></div>
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </div>
        <img src="../Images/thumbnails/strip.png" alt="" style={{ width: '100%', transform: 'rotate(180deg)', marginTop: '-32px', position: 'absolute' }} />
      </div>
      <Faqs></Faqs>
      <Footer></Footer>
      <BottomNav></BottomNav>
    </div>

  )
}

export default HomePage