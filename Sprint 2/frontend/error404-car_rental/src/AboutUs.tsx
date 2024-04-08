import React, { useState, useEffect } from 'react';
import './styles/about.css';
import Navbar from './components/Navbar/navbar';

const AboutUs: React.FC = () => {
    const [reviews, setReviews] = useState([]);
    const fetchReviews = () => {
        fetch('/feedback')
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    };
    const clearReviews = () => {
        fetch('/deleteFeedback', { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    console.log('All reviews cleared successfully');
                    setReviews([]);
                } else {
                    console.error('Error clearing reviews');
                }
            })
            .catch(error => console.error('Error clearing reviews:', error));
    };

    useEffect(() => {
        fetchReviews();
    }, []);

  

    

    const [rating, setRating] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    return (
        <>
            <Navbar />
            <h1>About Us</h1>
            <p>Welcome to Cars R Us! We are a leading car rental company committed to providing exceptional service and a wide range of vehicles to meet your transportation needs.</p>
            <p>At Cars R Us, we pride ourselves on offering competitive prices, convenient locations, and a fleet of well-maintained vehicles. Whether you need a compact car for a quick trip or a spacious SUV for a family vacation, we have the perfect vehicle for you.</p>
            <p>Our team of dedicated professionals is here to assist you every step of the way, from making a reservation to ensuring a smooth rental experience. We strive to exceed your expectations and make your car rental experience hassle-free.</p>
            <p>Thank you for choosing Cars R Us. We look forward to serving you and providing you with a reliable and comfortable vehicle for your next adventure.</p>

            <div>
                <h2>Reviews</h2>
                {reviews.map((review: any, index: number) => (
                    <div key={index} className="review">
                        <div className="rating-column">
                            <label className="rating-label">Rating:</label>
                            <div className="stars-container">
                                {[...Array(5)].map((_, starIndex) => (
                                    <span
                                        key={starIndex}
                                        className={`fa fa-star ${starIndex < review.rating || starIndex < hoveredIndex ? 'checked' : ''}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                        <div className="comment-column">
                            <label className="comment-label">Comment:</label>
                            <p>{review.comments}</p>
                        </div>
                    </div>
                ))}
                <button onClick={clearReviews}>Clear All Reviews</button>
            </div>
        </>
    );
};

export default AboutUs;
