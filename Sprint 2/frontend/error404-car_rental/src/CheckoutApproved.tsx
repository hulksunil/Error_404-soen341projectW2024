import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import './components/Navbar/navbar.css'

const CheckoutApproved = () => {
  const history = useNavigate()

  const handleLeaveReview = () => {
    history('/feedback')
  }

  const handleExit = () => {
    history('/')
  }

  return (
    <div>
      <Navbar />
      <div className='background_confirm'>
        <h1>Checkout Approved</h1>
        <p>
          Your payment has been successfully processed. Thank you for your reservation! Please feel free to leave a review.
        </p>
        <button onClick={handleLeaveReview}>Leave a Review</button>
        <button onClick={handleExit}>Exit</button>
      </div>
    </div>
  )
}

export default CheckoutApproved
