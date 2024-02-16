import React from 'react';
import './timeline.css';

const Timeline = ({ events }) => {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-item-content">
            <span className="timeline-item-date">{event.date}</span>
            <h3 className="timeline-item-title">{event.title}</h3>
            <p className="timeline-item-description">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
