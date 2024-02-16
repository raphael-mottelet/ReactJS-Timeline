import React, { useEffect, useRef, useState } from 'react';
import './timeline.css';
import './animation.css'; // Import the animation CSS file

const Timeline = ({ events }) => {
  const [animatedItems, setAnimatedItems] = useState([]);
  const itemRefs = useRef([]);

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

    // Initialize itemRefs with references to each item
    itemRefs.current = Array(events.length)
      .fill()
      .map((_, i) => itemRefs.current[i] || React.createRef());

    animateItems();

    // Cleanup function
    return () => {
      setAnimatedItems([]);
    };
  }, [events]);

  useEffect(() => {
    // Intersection Observer callback
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex((ref) => ref.current === entry.target);
          if (!animatedItems.includes(index)) {
            setAnimatedItems((prev) => [...prev, index]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-250px', // Adjust the buffer here (e.g., '-50px')
      threshold: 1, // Trigger when any part of the item is visible
    });

    // Observe each item
    itemRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [animatedItems]);

  return (
    <div className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-items">
        {events.map((event, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${animatedItems.includes(index) ? 'animated' : ''}`}
            ref={itemRefs.current[index]}
          ><div className="timeline-dot"></div>
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
