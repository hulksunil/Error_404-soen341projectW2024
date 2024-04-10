import React, { useState, useEffect } from 'react'
import './cardbrowse.css'
import { Link } from 'react-router-dom'
import Modal from '../Modal/modal'
import { getCookie } from '../../utils/CookieManager.ts'

function CardBrowse (props) {
  const { carId, model, type, numberOfSeats, url } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    // Get userId from cookie when component mounts
    const userIdFromCookie = getCookie('userid')
    setUserId(userIdFromCookie)
  }, []) // Empty dependency array means this effect runs only once when component mounts

  const handleCardClick = () => {
    console.log('Card clicked')
    setIsModalOpen(true)
    console.log('Modal open:', isModalOpen)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='card-container' onClick={handleCardClick}>
        <div className='image-container'>
          <img src={url} alt='' />
        </div>

        <div className='card-content' onClick={handleCardClick}>
          <div className='card-title'><h2>{model}</h2></div>
          <div className='card-body'>
            <div>Type: {type}</div>
            <br />
            <div>No. of Seats: {numberOfSeats}</div>
            <br />
          </div>
          {userId && (
            <div className='rentBtn'>
              <Link to={`/reservation?carId=${carId}`}>Rent</Link>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} car={props} />
    </>
  )
}

export default CardBrowse
