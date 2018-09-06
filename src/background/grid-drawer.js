import * as THREE from 'three';
import EffectComposer, { RenderPass, ShaderPass } from 'three-effectcomposer-es6';
import config from './config';
import { Grid } from "./grid";

import RGBShiftShader from './lib/shaders/RGBShiftShader';
import CopyShader from './lib/shaders/CopyShader';
import FilmShader from './lib/shaders/FilmShader';
import BadTVShader from './lib/BadTVShader';
import StaticShader from './lib/StaticShader';


/**
 * Cette classe dessine la grille qui est calculée par grid.js
 * La grille est transférée comme un texture à la carte graphique qui
 * l'affichera avec certaines modifications 
 */
class GridDrawer 
{
  /**
   * 
   * @param {Grid} grid la grille qui sera dessinée 
   */
  constructor( grid )
  {
    //this.canvas = new Canvas("main-canvas", true);
    this.grid = grid;

    // si le mode sérieux est actif ou non 
    this.seriousMode = false;

    this.elapsedTime = 0;
  }


  /**
   * @return {Promise} 
   */
  init()
  {
    return new Promise( resolve => {

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      this.camera.position.z = 5;

      let new_array = new Uint8Array(this.grid.cols*this.grid.rows);
      new_array = new_array.map( (v,i) => {
        return this.grid.data[i]*255;
      });


      let new_texture = new THREE.DataTexture( new_array, this.grid.cols, this.grid.rows, THREE.LuminanceFormat, THREE.UnsignedByteType );
      new_texture.magFilter = THREE.NearestFilter; // also check out THREE.LinearFilter just to see the results
      new_texture.needsUpdate = true;

      this.quad = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          vertexShader: `varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }`,
          fragmentShader: `varying vec2 vUv;

          uniform sampler2D texture_test;
          uniform vec3 background_color;
          uniform vec3 front_color;
          uniform float time;

          float rand(vec2 co){
              return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
          }

          void main() {
            vec2 pos = vec2(vUv.x, vUv.y*-1.0 + 1.0);
            vec4 val = texture2D(texture_test, pos);

            vec3 color;

            if( val.r == 0.0 )
            {
              color = background_color;
              float rd = 0.35*rand(pos+time);
              color = vec3(clamp(color.r+rd, 0.0,1.0), clamp(color.g+rd,0.0,1.0), clamp(color.b+rd,0.0,1.0));
            }
            else 
            {
              color = front_color;
            }

            gl_FragColor = vec4(color.r, color.g, color.b, 1.0);
          }`,
          uniforms: {
            "texture_test": { value: new_texture, type: "t" },
            "background_color": { value: new THREE.Vector3(0,0,1), type: "3f"},
            "front_color": { value: new THREE.Vector3(1,1,1), type: "3f" },
            "time": { value: 0.0, type: "f" }
          },
          depthWrite: false,
          depthTest: false
        })
      );
      this.scene.add(this.quad);

      this.currentGreen = 0;

  
      // When you've made your scene, create your composer and first RenderPass
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));

      this.filmPass = new ShaderPass( FilmShader );
      this.badTVPass = new ShaderPass( BadTVShader );
      this.rgbPass = new ShaderPass( RGBShiftShader );
      this.staticPass = new ShaderPass( StaticShader );

      this.filmPass.material.uniforms['grayscale'].value = 0;

      this.composer.addPass( this.staticPass );
      this.composer.addPass( this.badTVPass );
      this.composer.addPass( this.rgbPass );
  
      // And draw to the screen
      const copyPass = new ShaderPass(CopyShader);
      copyPass.renderToScreen = true;
      this.composer.addPass(copyPass);

      this.onWindowResizeHandler()
      window.addEventListener( 'resize', () => this.onWindowResizeHandler(), false );

      this.renderer.domElement.classList.add( "background-canvas" );

      document.body.insertBefore( this.renderer.domElement, document.body.firstChild );

      /*document.addEventListener( "click", () => {
        this.quad.material.uniforms['front_color'].value = this.currentGreen ? new THREE.Vector3(1,1,1) : new THREE.Vector3(0,1,0);
        this.currentGreen = !this.currentGreen;
      });*/
      
      resolve();
    });
  }


  /**
   * Gère le redimensionnement des différents éléments en fonction des 
   * dimensions de la fenêtre 
   */
  onWindowResizeHandler()
  {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }


  /**
   * Permet d'activer le mode sérieux (blanc/noir)
   * @param {boolean} active si le mode doit être actif
   */
  setSeriousMode( active ) 
  {
    if( active && !this.seriousMode )
    {
      this.quad.material.uniforms["front_color"].value = config.seriousColors.front;
      this.quad.material.uniforms["background_color"].value = config.seriousColors.back;
      this.seriousMode = true;
    }
    else if( !active && this.seriousMode )
    {
      this.quad.material.uniforms["front_color"].value = config.defaultColors.front;
      this.quad.material.uniforms["background_color"].value = config.defaultColors.back;
      this.seriousMode = false;
    }
  }


  draw( deltaTime )
  {
    this.elapsedTime+= deltaTime;

    // update des passes
    //this.badTVPass.material.uniforms[ 'time' ].value = 0.1*Math.cos(this.elapsedTime/1000);
    this.badTVPass.material.uniforms[ 'distortion' ].value = Math.cos(this.elapsedTime/1000);
    this.badTVPass.material.uniforms[ 'distortion2' ].value = 0;

    this.rgbPass.material.uniforms[ 'amount' ].value = Math.random()*0.004*Math.cos(this.elapsedTime/2000);
    this.rgbPass.material.uniforms[ 'angle' ].value = Math.PI*2*Math.cos(this.elapsedTime/1000);

    this.staticPass.material.uniforms[ 'time' ].value+= 0.05;
    this.staticPass.material.uniforms[ 'amount' ].value = 0.01*Math.cos((this.elapsedTime+500)/1000);
    this.staticPass.material.uniforms[ 'size' ].value = 2+3*Math.abs(Math.cos(this.elapsedTime/1000));



    let le_array = new Uint8Array(this.grid.cols*this.grid.rows);
        le_array = le_array.map( (v,i) => {
          return this.grid.data[i]*255;
        });

    let le_texture = new THREE.DataTexture( le_array, this.grid.cols, this.grid.rows, THREE.LuminanceFormat, THREE.UnsignedByteType );
    le_texture.magFilter = THREE.NearestFilter; // also check out THREE.LinearFilter just to see the results
    le_texture.needsUpdate = true;

    
    this.quad.material.uniforms['texture_test'].value = le_texture;
    this.quad.material.uniforms['time'].value = this.elapsedTime/7000;
    this.quad.material.uniforms.texture_test.needsUpdate = true;

    this.composer.render();

    /*
    this.canvas.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

    for( let x = 0; x < this.grid.cols; x++ )
    {
      for( let y = 0; y < this.grid.rows; y++ )
      {
        let index = x + y*this.grid.cols;

        this.canvas.context.fillStyle = this.grid.data[index] === 0 ? "black" : "white";
        this.canvas.context.fillRect( x * config.cellsize, y * config.cellsize, config.cellsize, config.cellsize );
      }
    }*/
  }
}


export { GridDrawer };