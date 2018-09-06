import { Vector3 } from 'three';
import { mobilecheck } from '../helpers/helpers';


const isMobile = mobilecheck();

export default {

  // taille d'une des cases 
  cellsize: isMobile ? 15 : 6,
  loaderSize: 30,
  loaderSequenceLength: 25,

  defaultColors: {
    front: new Vector3(1,1,1),
    back: new Vector3(0,0,1)
  },

  seriousColors: {
    front: new Vector3(0,0,0),
    back: new Vector3(1,1,1)
  }

}