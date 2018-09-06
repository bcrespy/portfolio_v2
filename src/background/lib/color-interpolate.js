class Color {
  /**
   * Creates a color given the 3 components, which values are included [0;255]
   * @param {number} red red component
   * @param {number} green green component
   * @param {number} blue blue component
   */
  constructor( red, green, blue ) {
    this.r = red;
    this.g = green;
    this.b = blue;

    // is used to fasten operations
    this.colors = [ red, green, blue ];
  }

  /**
   * Convert a 6 digits string of an hexadecimal color to color
   * @returns {Color}
   * @param {string} hex 6 digits string to convert, with or without #
   */
  static hexToRgb( hex ) {
    let matches = hex.replace(/#/,'').match(/.{1,2}/g);
    return new Color( parseInt(matches[0],16), parseInt(matches[1],16), parseInt(matches[2],16) );
  }

  /**
   * @returns {Color} the color object which components are those in the array
   * @param {Array} colorsArray 3 components color array
   */
  static fromArray( colorsArray ) {
    return new Color( colorsArray[0], colorsArray[1], colorsArray[2] );
  }

  /**
   * @returns {Color} the resulting color of the interpolation between this and endColor
   * @param {Color} endColor the color to interpolate with
   * @param {number} t [0;1] interpolate factor
   */
  interpolateWith( endColor, t ) {
    let newColor = [0,0,0];
    for( let i = 0; i < 3; i++ ) {
      newColor[i] = Math.round( this.colors[i] + (endColor.colors[i] - this.colors[i]) * t );
    }
    return Color.fromArray( newColor );
  }

  /**
   * @template T
   * @param {T} Class a class with a 3 params constructor
   * @param {function(number)?} func a function which will be applied to all params
   * @returns {T} 
   */
  convert( Class, func = x => x ) {
    return new Class( func(this.r), func(this.g), func(this.b) );
  }
}


export default Color;