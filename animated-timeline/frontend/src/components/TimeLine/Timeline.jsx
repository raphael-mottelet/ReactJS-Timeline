import React, { useEffect, useState } from 'react';
import './timeline.css';
import './animation.css'; // Import the animation CSS file

const Timeline = ({ events }) => {
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    // Function to animate items sequentially
    const animateItems = () => {
      const animationDelay = 900; // Adjust animation delay as needed
      events.forEach((event, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, index * animationDelay);
      });
    };

    animateItems();

    // Cleanup function
    return () => {
      setAnimatedItems([]);
    };
  }, [events]);

  return (
    <div className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-items">
        {events.map((event, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${animatedItems.includes(index) ? 'animated' : ''}`}
          >
            <div className="timeline-item-content">
              <span className="timeline-item-date">{event.date}</span>
              <h3 className="timeline-item-title">{event.title}</h3>
              <p className="timeline-item-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
