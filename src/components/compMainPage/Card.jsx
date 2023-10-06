import React from 'react'
import { Link } from 'react-router-dom'
import { fetchAsync } from '../../features/villaInfo/villaInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


function Card() {
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(fetchAsync());
  //   console.log('Card component re-rendered');    
  // }, [dispatch]);

  useEffect(() => {
    // Check if data is already loaded in the Redux state
    // const villaData = useSelector(state => state.villaInfo.villaInfo);

    if (!villaData.length) {
      // Fetch data only if it's not already in the Redux state
      dispatch(fetchAsync());
    }
  }, [dispatch]);

  const villaData = useSelector(state => state.villaInfo.villaInfo)

  // console.log(villaData)
  return (
    <>
      {/* <button onClick={()=> dispatch(fetchAsync())}>fffffffffff</button> */}
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
      <Link to="/admin">Admin PAge</Link>
    </>
  )
}

export default Card