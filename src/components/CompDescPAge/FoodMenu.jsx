import React from 'react'

function FoodMenu() {
    return (
        <div className="food-menu-display-main" id="meals">
            <div className="meals-head">
                <p>Meals</p>
            </div>
            <div className="meals-icon">
                <div className="veg" />
                <p className="veg-text">VEG</p>
                <div className="non-veg" />
                <p className="non-veg-text">NON-VEG</p>
            </div>
            <div className="food-image">
                <img src="../Images/foodSection/food2 (1).jpg" alt="" />
            </div>
            <div className="menu-discription">
                <div className="menu-discrip-icons"><i className="fa fa-check" />All rates are on a per
                    person,
                    per
                    day
                    basis.
                </div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Please inform us of your
                    meal
                    preference
                    in
                    advance and allow us a minimum.</div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Food Package is not
                    included
                    in
                    rent price.</div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Barbeque grill is
                    available
                    in
                    villa.
                </div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Food will be delivered to
                    you
                    on
                    villa.</div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Guests have access to the
                    kitchen
                    to
                    prepare their own meals.</div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Only utensils and gas
                    stove
                    will
                    be there in kitchen.</div>
                <div className="menu-discrip-icons"><i className="fa fa-check" />Guests need to bring
                    their
                    own
                    cooking material on their own.
                </div>
            </div>
            <div className="meals-btn">
                <a href="../Images/foodSection/SR FOOD PACKAGE.pdf"><button>See Food
                    Packages</button></a>
                <a href="../Images/foodSection/menucard.pdf"><button>Custom Dishes</button></a>
            </div>
        </div>)
}

export default FoodMenu