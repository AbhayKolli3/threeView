import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MouseEvent } from "react";
//@ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//@ts-ignore
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

export default function Scene() {

    const scene= setupScene()
    const renderer=setupRenderer()
    const camera=setupCamera()
    const loader=setUpLoader()

    let idx=0
    const urls = ['https://raw.githubusercontent.com/mrdoob/three.js/4b18dbe78bec6067cd98e66539efe1b157f5635f/examples/models/pcd/ascii/simple.pcd','https://segmentsai-dev.s3.eu-west-2.amazonaws.com/assets/tobias-admin/c92c069f-94b5-4b72-859b-08a7a7a141a4.pcd','https://raw.githubusercontent.com/mrdoob/three.js/4b18dbe78bec6067cd98e66539efe1b157f5635f/examples/models/pcd/binary/Zaghetto.pcd'];
    function setupScene(){
        const scene= new THREE.Scene()
        return scene
    }
    
    function setupRenderer(){
        const renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        return renderer
    }
    function setupCamera(){
        const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.01, 40 );
        camera.position.set( 0, 0, 1 );
        scene.add( camera );
        return camera
    }

    function setUpLoader(){
        const loader = new PCDLoader();
        return loader
    }
    
    
    function changePCD(e:MouseEvent<HTMLElement>){
        scene.clear()
        if (idx>=0){
            idx=idx%urls.length
        }
        else{
            idx=urls.length-1
        }
  
            
            
        
        loadPCD()
        
    }

    function render(){
        renderer.render(scene,camera)
    }
    function setupControls(){
        const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render ); // use if there is no animation loop
            controls.minDistance = 0.5;
            controls.maxDistance = 10;
            return controls

    }

    function loadPCD(){
        
      
        
        

        loader.load( urls[idx], function ( points: THREE.Points) {

            console.log(points)

            points.geometry.center();
            points.geometry.rotateX( Math.PI );
            points.name = 'icecake.pcd';
            scene.add( points );
            render();

        } );


    } 


    setupControls()
    loadPCD()

  return (
  <div id="controls">
    <button  onClick={(e)=>{idx=idx+1 ; changePCD(e)}}  >Prev</button>
    <button  onClick={(e)=>{idx=idx-1;changePCD(e)}}>Next</button>

  </div>
  );
}
