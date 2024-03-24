import React from 'react';
import Navbar from './components/Navbar/navbar';

const AboutUs: React.FC = () => {
    return (
        <>
            <Navbar />
            <h1>About Us</h1>
            <p>Welcome to Cars R Us! We are a leading car rental company committed to providing exceptional service and a wide range of vehicles to meet your transportation needs.</p>
            <p>At Cars R Us, we pride ourselves on offering competitive prices, convenient locations, and a fleet of well-maintained vehicles. Whether you need a compact car for a quick trip or a spacious SUV for a family vacation, we have the perfect vehicle for you.</p>
            <p>Our team of dedicated professionals is here to assist you every step of the way, from making a reservation to ensuring a smooth rental experience. We strive to exceed your expectations and make your car rental experience hassle-free.</p>
            <p>Thank you for choosing Cars R Us. We look forward to serving you and providing you with a reliable and comfortable vehicle for your next adventure.</p>
        </>
    );
};

export default AboutUs;