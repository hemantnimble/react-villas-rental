import React from 'react'
import villaData from '../../../data'
import { Link } from 'react-router-dom'


function Card() {
  return (
    <>
      {
        villaData.map((data) => {
          return <Link key={data.id} to={`/${data.id}`}>
            <div className="card">
              <div className="card-image">
                <div className="best-rated">
                  {data.bestbadge &&
                    <img src={data.bestbadge} alt="" />}
                </div>
                {data.luxuryBadge &&
                  <div className="luxury-badge">
                    <img src={data.luxuryBadge} alt="" />
                  </div>
                }
                <img src={data.thumbnail} alt="" />
              </div>
              <div className="mar">
                <div className="villa-name-main">
                  <p className="villa-name"> {data.name}</p>
                  <p className="villa-location">Lonavala,Maharashtra</p>
                </div>
                <div className="discription">
                  <p>{data.bhk} | {data.baths} | {data.capacity}</p>
                </div>
                <div className="villa-price-main">
                  <p className="price">₹{data.price}</p>
                  <p className="deleted-price">₹{data.del_price}/-per night</p>
                </div>
                <div className="taxes">
                  <p>(Tap to see WeekDay Prices)</p>
                </div>
              </div>
            </div>
          </Link>
        })

      }
    </>
  )
}

export default Card