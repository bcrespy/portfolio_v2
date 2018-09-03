/**
 * Cette classe gère la grille qui sera dessinée par la suite
 * Lorsque la souris entre dans une cease, cette dernière s'active,
 * et entraine donc un calcule des voisins lors de l'update
 */


import config from './config';



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

class Grid 
{
  constructor()
  {
    this.cols = 0;
    this.rows = 0;
    this.data = new Uint8Array(0);

    this.mouseIndex = 0;

    this.frames = 0;

    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseClickHandler = this.mouseClickHandler.bind(this);

    this.sequencePos = 0;
    this.loading = false;

    this.load = this.load.bind(this);

    this.playground = false;
    this.playgroundLinkPos = { x: 0, y: 0 };
    this.underlinePos = 0;
    this.underlineDirection = 1;
    this.underlineSize = 12;

    // utilisées pour stocker les séquences qui seront jouées
    this.playingSequences = [];

    this.setSize();
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


  load() {
    this.loading = true;
  }

  loaded() {
    this.loading = false;
  }


  /**
   * Ajoute une séquence à la liste des séquence jouées
   * @param {string} sequence l'identifiant str de la séquence 
   */
  playSequence( sequence ) {
    switch( sequence ) {
      case 'arrow-left':
        this.playingSequences.push( arrowLeftSequence );
        break;
      
      case 'playground-underline': 
        this.playingSequences.push( underlinePlaygroundSequence );
        break;
    }
  }


  /**
   * Permet de stopper une séquence en cours de lecture
   * @param {str} sequence L'identifiant str de la séquence à stopper
   */
  stopSequence( sequence ) {
    for( let i = 0; i < this.playingSequences.length; i++ ) {
      if( this.playingSequences[i].id === sequence ) {
        this.playingSequences.splice(i,1);
        return;
      }
    }
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


  /**
   * Lors
   * @param {boolean} to si le mode playground doit être actif
   */
  playgroundLink( to = false )
  {
    this.playground = to;
  }


  /**
   * Remet la grille à 0 et adapte la taille de cette dernière par 
   * rapport à la fenêtre 
   * Met aussi les autres positions relatives à la fenêtre à jour
   */
  setSize()
  {
    let winsize = {
      x: window.innerWidth,
      y: window.innerHeight
    };

    this.cols = Math.ceil( winsize.x / config.cellsize );
    this.rows = Math.ceil( winsize.y / config.cellsize );

    this.data = new Uint8Array( this.cols * this.rows ).fill(0);

    // la position du soulignement sur la page playground 
    let undx = Math.floor( (winsize.x * 0.225) / config.cellsize ),
        undy = Math.floor( (winsize.y / 2) / config.cellsize + 4 );
    underlinePlaygroundSequence.position = undx + undy*this.cols;

    // la position de la flèche précedent en bas à gauche
    let arx = Math.floor(50/config.cellsize),
        ary = Math.floor((winsize.y-60)/config.cellsize);
    arrowLeftSequence.position = arx + ary*this.cols;
  }

  
  update()
  {
    // si on charge 
    if( this.loading )
    {
      let angle = this.sequencePos/config.loaderSequenceLength * Math.PI*2,
          position = {
            clientX: window.innerWidth/2 - config.loaderSize*Math.cos(angle),
            clientY: window.innerHeight/2 - config.loaderSize * Math.sin(angle)
          };
      this.mouseMoveHandler(position);
      this.sequencePos++;
    }

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

    // ici on joue les séquences à jouer 
    this.playingSequences.forEach( sequence => {
      // on parcourt les cases de cette frame, qu'on active
      sequence.seq[sequence.current].forEach( tile => {
        this.data[ sequence.position + tile[0] + tile[1]*this.cols ] = 1;
      });
      // avancement dans la séquence 
      if( this.frames%2 == 0 ) {
        sequence.current+= sequence.direction;
        if( sequence.current === 0 ) sequence.direction = 1;
        else if( sequence.current === sequence.seq.length-1 ) sequence.direction = -1;
      }
    });

    this.frames++;
  }
}


export { Grid };