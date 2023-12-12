import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function NavBar({ navbar, }) {
    const location = useLocation();
    let navbarClass = '';
    let link = '';
    let logoText = '';
    let logo = '';

    if (location.pathname === '/') {
        navbarClass += 'nav';
        link += 'nav-links';
        logoText += 'logo-text';
        logo += 'logo-image';
    }
    else if (location.pathname.startsWith("/about")) {
        navbarClass += 'nav-aboutPage';
        link += 'aaa';
        logoText += 'logo-text-description';
        logo += 'logo-image-description';

    }
    else if (location.pathname.startsWith("")) {
        navbarClass += 'nav-descriptionPage';
        link += 'aaa';
        logoText += 'logo-text-description';
        logo += 'logo-image-description';
    }

    const admin = useSelector(state => state.users.admin)


    return (
        <>
            <nav id="navbar" className={`${navbar ? 'scrolled' : ''} ${navbarClass}`}>
                <div className="wrapper">
                    <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars" /></label>
                    <Link to='/'>
                        <div className="logo">
                            <div className="logo-img">
                                <img className={logo} src="../Images/Logo/logoloc.png" alt="logo" />
                            </div>
                            <div >
                                <p className={logoText}> Villas Rental </p>
                            </div>
                        </div>
                    </Link>
                    <div className="call-btn-top only-phone"><a href="tel:+91 8999 130 727"><svg id='mainNavSvg' width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                        <span>Call Us</span></a>
                    </div>
                    <input type="radio" name="slider" id="menu-btn" />
                    <input type="radio" name="slider" id="close-btn" />
                    <ul className="nav-links">
                        <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times" /></label>
                        <li><a className={link} href="index.html">Home</a></li>
                        <li><Link className={link} to="/about">About</Link></li>
                        <li>
                            <a href="#" className={`desktop-item ${link}`}>BHK</a>
                            <input type="checkbox" id="showDrop" />
                            <label htmlFor="showDrop" className="mobile-item">BHK</label>
                            <ul className="drop-menu">
                                <li><a href="#2bhk">2 Bhk villa</a></li>
                                <li><a href="#3bhk">3 Bhk villa</a></li>
                                <li><a href="#4bhk">4 Bhk villa</a></li>
                                <li><a href="#5bhk">5 Bhk villa</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className={`desktop-item ${link}`}>Food Services</a>
                            <input type="checkbox" id="showMega" />
                            <label htmlFor="showMega" className="mobile-item">Food Services</label>
                            <div className="mega-box">
                                <div className="content">
                                    <div className="row">
                                        <header>Food Packages</header>
                                        <ul className="mega-links">
                                            <li><a href="../Images/foodSection/600.png">600/- Per Person</a></li>
                                            <li><a href="../Images/foodSection/800.png">800/- Per Person</a></li>
                                            <li><a href="../Images/foodSection/1000.png">1,000/- Per Person</a></li>
                                            <li><a href="../Images/foodSection/menucard.pdf">Custom Package</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="call-btn-top"><a className={link} href="tel:+91 8999 130 727"><svg id='mainNavSvg' width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>8999130727</a></li>
                        {admin === null ? <Link to="/login"><li>login</li></Link> : <Link to="/admin"><li>Admin</li></Link>}
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default NavBar