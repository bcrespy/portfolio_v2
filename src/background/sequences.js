/**
 * Ce fichier regroupe les séquences utilisées pour dessiner certains des
 * effets présents sur le site
 */


/**
 * Flèche vers la gauche
 */
let arrowLeftSequence = {
  id: 'arrow-left',
  current: 0,
  direction: 1,
  seq: [
    [ [1,-4], [2,-4] ],
    [ [0,-3], [1,-3] ],
    [ [-1,-2], [0,-2] ],
    [ [-2,-1], [-1,-1] ],
    [ [-3,0], [-2,0] ],
    [ [-2,1], [-1,1] ],
    [ [-1,2], [0,2] ],
    [ [0,3], [1,3] ],
    [ [1,4], [2,4] ]
  ],
  position: 0 // sera remplacé programmatiquement
};


/**
 * Ligne qui vient souligner un lien 
 */
let underlinePlaygroundSequence = {
  id: 'playground-underline',
  current: 0,
  direction: 1,
  seq: [
    [ [-6,0], [-5,0], [-4,0] ],
    [ [-5,0], [-4,0], [-3,0] ],
    [ [-4,0], [-3,0], [-2,0] ],
    [ [-3,0], [-2,0], [-1,0] ],
    [ [-2,0], [-1,0], [0,0] ],
    [ [-1,0], [0,0], [1,0] ],
    [ [0,0], [1,0], [2,0] ],
    [ [1,0], [2,0], [3,0] ],
    [ [2,0], [3,0], [4,0] ],
    [ [3,0], [4,0], [5,0] ],
    [ [4,0], [5,0], [6,0] ]
  ],
  position: 0 // same
};


let line = {
  id: 'line',
  current: 0,
  direction: 1,
  seq: [
    [ [-6,0], [-4,0], [-2,0], [0,0], [2,0], [4,0], [6,0] ],
    [ [-6,0], [-4,0], [-2,0], [0,0], [2,0], [4,0], [6,0] ],
  ],
  position: 8000
}


export { arrowLeftSequence, underlinePlaygroundSequence, line };