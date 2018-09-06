import Color from './lib/color-interpolate';
import { mobilecheck } from '../helpers/helpers';


const isMobile = mobilecheck();

export default {

  // taille d'une des cases 
  cellsize: isMobile ? 15 : 6,
  loaderSize: 30,
  loaderSequenceLength: 25,

  defaultColors: {
    front: new Color(255,255,255),
    back: new Color(0,0,255)
  },

  seriousColors: {
    front: new Color(0,0,0),
    back: new Color(255,255,255)
  }

}