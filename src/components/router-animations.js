import { spring } from 'react-router-transition';


/**
 * Ce fichier regroupe les fonctions qui permettent les
 * animations lors du changement des routes
 */


function mapStyles( styles ) {
  return {
    opacity: styles.opacity,
    left: `${styles.left}%`,
  };
}


function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}


const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    left: 100,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    left: bounce(-100),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    left: bounce(0),
  },
};


export default {
  mapStyles, bounce, bounceTransition
}