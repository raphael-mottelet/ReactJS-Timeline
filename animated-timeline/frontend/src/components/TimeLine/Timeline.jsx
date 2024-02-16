import React, { useEffect } from 'react';
import './timeline.css';
import './animationscroll.css'

const Timeline = ({ events }) => {
  useEffect(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const handleScroll = () => {
      timelineItems.forEach(item => {
        if (isElementInViewport(item)) {
          item.classList.add('animated');
        } else {
          item.classList.remove('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially on component mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <div className="timeline">
      <div className="timeline-line"></div>

      <div className="timeline-items">
        {events.map((event, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-item-content">
              <div className="timeline-dot"></div>
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
