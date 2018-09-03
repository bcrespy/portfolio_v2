import { Grid } from './grid';
import { GridDrawer } from './grid-drawer';




var instance = null;


/**
 * Le background manager est un singleton qui fait la passerelle entre le background,
 * géré par la classe Grid, plus orientée logique, et le reste de l'application 
 */
class BackgroundManager {

  constructor() {
    if( instance ) {
      return instance;
    }
    instance = this;

    this.grid = new Grid();
    this.gridDrawer = new GridDrawer(this.grid);

    this.startTimer = null,
    this.lastTimer = null;

    this.draw = this.draw.bind(this);
  }

  /**
   * @return {BackgroundManager} l'unique instance du background manager
   */
  static getInstance() {
    if( instance ) {
      return instance;
    }

    return new BackgroundManager();
  }

  init() {
    return new Promise( resolve => {
      this.grid.init().then( () => {
        this.gridDrawer.init().then( () => {
          this.startTimer = new Date();
          this.lastTimer = this.startTimer;
          this.draw();
          resolve();
        });
      });
    });
  }

  draw() {
    window.requestAnimationFrame( this.draw );

    let now = new Date(),
        deltaTime = now - this.lastTimer;

    this.grid.update();
    this.gridDrawer.draw( deltaTime );

    this.lastTimer = now;
  }

  load() {
    this.grid.load();
  }

  loaded() {
    this.grid.loaded();
  }

  playgroundLink( to = true ) {
    this.grid.playgroundLink(to);
  }

  playSequence( sequence ) {
    this.grid.playSequence( sequence );
  }

  stopSequence( sequence ) {
    this.grid.stopSequence( sequence );
  }
}


export default BackgroundManager;