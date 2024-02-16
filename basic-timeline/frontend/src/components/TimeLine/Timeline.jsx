import React from 'react';
import './testcss.css';

const Timeline = ({ events }) => {
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
