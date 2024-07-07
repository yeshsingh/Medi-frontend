import React, { useState } from 'react';
import '../../App.css';
import patientAvatar from '../../assets/images/patient-avatar.png';
import { HiStar } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Muhibur Rahman',
    text: 'I have taken medical services from them. They treat so well and they are providing the best medical services.',
  },
  {
    name: 'Yesh Singh',
    text: 'I have taken medical services from them. They treat so well and they are providing the best medical services.',
  }
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial">
        <div className="testimonial-content">
          <div className="testimonial-header">
            <img src={patientAvatar} alt="Patient Avatar" />
            <div>
              <h4>{testimonials[activeIndex].name}</h4>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="star" />
                ))}
              </div>
            </div>
          </div>
          <p className="testimonial-text">
            {testimonials[activeIndex].text}
          </p>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
