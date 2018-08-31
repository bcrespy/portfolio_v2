/**
 * Cette classe gère la grille qui sera dessinée par la suite
 * Lorsque la souris entre dans une cease, cette dernière s'active,
 * et entraine donc un calcule des voisins lors de l'update
 */


import config from './config';



class Grid 
{
  constructor()
  {
    this.cols = 0;
    this.rows = 0;
    this.data = new Uint8Array(0);

    this.mouseIndex = 0;

    this.setSize();

    this.frames = 0;

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
  }


  init() 
  {
    return new Promise( resolve => {
      window.addEventListener( "resize", () => {
        this.setSize();
      });

      document.addEventListener("mousemove", this.mouseMoveHandler)

      document.addEventListener("click", this.mouseClickHandler);

      resolve();
    });
  }


  mouseMoveHandler( event )
  {
    let x = Math.floor( event.clientX / config.cellsize ),
        y = Math.floor( event.clientY / config.cellsize ),
        index = x + y*this.cols;

    // si la souris est dans un autre carré que celui en cours 
    if( this.mouseIndex !== index ) 
    {
      if( this.data[index] === 1 )
        this.data[index] = 0;
      else 
      {
        this.data[index] = 1;
        if( x != this.rows-1 ) this.data[index+1] = 1;
        if( x != 0 ) this.data[index-1] = 1;
        if( y != this.cols-1 ) this.data[index+this.cols] = 1;
        
        this.data[index-this.cols] = 1;
      }

      this.mouseIndex = index;
    }
  }


  mouseClickHandler( event )
  {
    let x = Math.floor( event.clientX / config.cellsize ),
        y = Math.floor( event.clientY / config.cellsize ),
        index = x + y*this.cols,
        l = this.cols;

    this.data[index-2] = 1;
    this.data[index-3] = 1;
    this.data[index-2-l] = 1;
    this.data[index-1] = 1;
    
    this.data[index+2] = 1;
    this.data[index+3] = 1;
    this.data[index+2+l] = 1;
    this.data[index+1] = 1;
  }


  /**
   * @return {number} index dans le tableau de la position sur l'écran 
   * @param {number} x abcisse en px
   * @param {number} y ordonnée en px
   */
  posToIndex( x, y )
  {
    return Math.floor( x / config.cellsize ) + this.cols * Math.floor( y / config.cellsize );
  }


  setSize()
  {
    let winsize = {
      x: window.innerWidth,
      y: window.innerHeight
    };

    this.cols = Math.ceil( winsize.x / config.cellsize );
    this.rows = Math.ceil( winsize.y / config.cellsize );

    this.data = new Uint8Array( this.cols * this.rows ).fill(0);
  }

  
  update()
  {
    for( let x = 0; x < this.cols; x++ )
    {
      for( let y = 0; y < this.rows; y++ )
      {
        let index = x + y * this.cols;

        // on parcourt les voisins 
        let alive = 0;

        let xStart = x == 0 ? 0 : -1,
            yStart = y == 0 ? 0 : -1,
            xEnd = x == this.cols-1 ? 1 : 2,
            yEnd = y == this.rows-1 ? 1 : 2;

        for( let a = xStart; a < xEnd; a++ )
        {
          for( let b = yStart; b < yEnd; b++ )
          {
            if( a == 0 && b == 0 ) {}
            else 
            {
              let idx = index+a + this.cols*b;
              alive+= this.data[idx];
            }
          }
        }

        if( this.data[index] == 1 )
        {
          if( alive < 3 )
            this.data[index] = 0;
          else if( alive > 4 )
            this.data[index] = 0;
          else 
            this.data[index] = 1;
        }
        else 
        {
          if( alive === 3 )
            this.data[index] = 1;
          else 
            this.data[index] = 0;
        }
      }
    }

    this.frames++;
  }
}


export { Grid };