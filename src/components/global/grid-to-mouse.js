/**
 * Ce fichier gère les grilles qui se penchent par rapport à la position de 
 * la souris. Pas géré par react pour éviter les rafraichissements 
 * inutiles 
 */


export default function gridsFromPos( x, y ) {

  // calcul de l'angle des grilles 
  let angleX = -25 * (x - window.innerWidth/2) / (window.innerWidth/2),
      angleY = 25* (y - window.innerHeight/2) / (window.innerHeight/2);

  let grids = document.querySelectorAll('.visual-grid');
  
  grids.forEach( grid => {
    grid.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg)`;
  });

}