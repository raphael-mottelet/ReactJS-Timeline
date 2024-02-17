import React, { useEffect, useRef, useState } from 'react';
import './timeline.css';
import './animation.css'; // Importer le fichier CSS d'animation
import './Line-Animation.css'; // Importer le fichier CSS d'animation de ligne
import './responsive.css'; // Importer le fichier CSS d'animation de ligne

const Timeline = ({ events }) => {
  const [animatedItems, setAnimatedItems] = useState([]); // État pour suivre les éléments animés
  const itemRefs = useRef([]); // Références aux éléments de la timeline
  const lineRef = useRef(null); // Référence à la ligne de la timeline

  // Effet pour animer les éléments séquentiellement
  useEffect(() => {
    const animateItems = () => {
      const animationDelay = 99999; // Délai d'animation en millisecondes
      events.forEach((event, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, index * animationDelay);
      });
    };

    // Initialiser les références aux éléments de la timeline
    itemRefs.current = Array(events.length)
      .fill()
      .map((_, i) => itemRefs.current[i] || React.createRef());

    // Lancer l'animation des éléments
    animateItems();

    // Nettoyer la fonction lors du démontage du composant
    return () => {
      setAnimatedItems([]); // Réinitialiser les éléments animés
    };
  }, [events]);

  // Effet pour observer l'intersection des éléments avec la fenêtre
  useEffect(() => {
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

    // Observer l'intersection des éléments avec la fenêtre
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-350px', // Marge par rapport à la fenêtre pour déclencher l'intersection
      threshold: 0, // Déclencher lorsque n'importe quelle partie de l'élément est visible
    });

    // Observer chaque élément de la timeline
    itemRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Nettoyer la fonction lors du démontage du composant
    return () => {
      observer.disconnect(); // Arrêter l'observation de l'intersection
    };
  }, [animatedItems]);

  // Effet pour ajuster la hauteur de la ligne de la timeline
  useEffect(() => {
    // Calculer la hauteur de la ligne de la timeline
    const lastAnimatedItemIndex = animatedItems.length > 0 ? Math.max(...animatedItems) : -1;
    const lineHeight = lastAnimatedItemIndex >= 0 ? itemRefs.current[lastAnimatedItemIndex].current.offsetTop + itemRefs.current[lastAnimatedItemIndex].current.offsetHeight / 2 : 0;

    // Appliquer la hauteur calculée à la ligne de la timeline
    if (lineRef.current) {
      lineRef.current.style.height = `${lineHeight}px`;
    }
  }, [animatedItems]);

  return (
    
    <div className="timeline">
      <div className="timeline-line" ref={lineRef}></div> {/* Ligne de la timeline */}
      <div className="timeline-items">
        {/* Mapper les événements pour afficher les éléments de la timeline */}
        {events.map((event, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${animatedItems.includes(index) ? 'animated' : ''}`}
            ref={itemRefs.current[index]}
          >
            <div className="timeline-dot"></div> {/* Point de la timeline */}
            <div className="timeline-item-content">
              <span className="timeline-item-date">{event.date}</span> {/* Date de l'événement */}
              <h3 className="timeline-item-title">{event.title}</h3> {/* Titre de l'événement */}
              <img src={event.image} alt={`Image for event ${index}`} /> {/* Image de l'événement */}
              <p className="timeline-item-description">{event.description}</p> {/* Description de l'événement */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
