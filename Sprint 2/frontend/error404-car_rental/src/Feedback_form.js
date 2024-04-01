import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/feedback.css';
import Navbar from "./components/Navbar/navbar.jsx";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [comments, setComments] = useState('');
  const history = useNavigate()

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(-1);
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const handlereset = () => {
    setRating(0);
    setComments('');
  };
  const handleSubmit = () => {
    
    history("/"); 
  };

  return (
    <>
    <Navbar />
    <div className="feedback-container">
      <h1>Rate your experience</h1>
      <p>We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</p>
      <div className="rating">
        <label className="rating-label">Rate:</label>
        <div className="stars-container">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`fa fa-star ${index < rating || index <= hoveredIndex ? 'checked' : ''}`}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
              onClick={() => handleStarClick(index)}
            ></span>
          ))}
        </div>
        <p id="stars_filled">{rating > 0 ? `${rating}/5` : ''}</p>
      </div>
      <br />
      <div>
        <label>Comments:</label><br />
        <textarea
          rows="8"
          cols="45"
          value={comments}
          onChange={handleCommentChange}
          className='comment'
        ></textarea>
      </div>
      <br />
      <div>
        <input
          type="submit"
          value="Submit Feedback"
          className='submit'
          onClick={handleSubmit}
        />
        <input
          type="reset"
          value="reset"
          className='reset'
          onClick={handlereset}
        />

      </div>
    </div>
    </>
  );
};

export default FeedbackForm;
