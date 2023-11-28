import React from 'react'
import { Link } from 'react-router-dom'
import { fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'



function Card() {
  const dispatch = useDispatch();
  const baseURL = 'http://localhost:3000/';

  //const villaData = useSelector(state => state=>state.reducerNameInSTORE.actionNameInCreateSlice)
  const villaData = useSelector(state => state.villaInfo.villaInfo)
  useEffect(() => {
    if (!villaData.length) {
      dispatch(fetchAsync());
    }
  }, [dispatch, villaData]);


  // console.log(villaData)
  return (
    <>
      {
        villaData.map((data) => {
          const firstImage = data.images?.length > 0 ? data.images[0] : null;

          return <Link key={data._id} to={`/${data._id}`}>
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
                <img src={`${baseURL}${firstImage}`?`${baseURL}${firstImage}`:data.thumbnail} alt="img" />
              </div>
              <div className="mar">
                <div className="villa-name-main">
                  <p className="villa-name"> {data.name}</p>
                  <p className="villa-location">Lonavala,Maharashtra</p>
                </div>
                <div className="discription">
                  <p>{data.bhk} Bedrooms | {data.baths} Baths | {data.capacity} Guests</p>
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